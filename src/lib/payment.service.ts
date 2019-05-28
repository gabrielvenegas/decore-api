import Axios, { AxiosPromise, AxiosResponse } from "axios";
import { Service } from "typedi";
import { Checkout } from '../api/models/Checkout';
import * as querystring from "querystring";
@Service()
export class PaymentService {
  baseUrl: "https://ws.sandbox.pagseguro.uol.com.br";
  constructor() { }

  async initSession() { }

  async checkout(details: string): Promise<any> {
    return Axios.post("https://ws.pagseguro.uol.com.br/v2/checkout?email=decoremoveis.contato@gmail.com&token=4d2f5d08-72f7-4fd5-bf59-c7edcdb0712da95c380a428f86e8b07077a60757fc952485-ee1d-4dcf-b706-1b1b73aa2e8e",
      details,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/xml; charset=ISO-8859-1"
        }
      });
  }

  reversal() { }

  retry() { }

  async createPlan(config?: any): Promise<any> {
    delete config.preApproval.reference;
    try {
      const { data } = await Axios.post(`https://ws.sandbox.pagseguro.uol.com.br/pre-approvals/request?email=ged.venegas@gmail.com&token=5EB8EF10AA6B4B07B957A06081F02603`,
        { reference: config.reference, preApproval: config.preApproval }, {
          headers: {
            Accept: "application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1",
            "Content-Type": "application/json;charset=ISO-8859-1"
          }
        });

      return { status: true, data };
    } catch (e) {
      return { status: false, data: e };
    }
  }

  async subscribeToPlan(details: any) {
    Axios.post(
      `https://ws.sandbox.pagseguro.uol.com.br/pre-approvals?email=ged.venegas@gmail.com&token=5EB8EF10AA6B4B07B957A06081F02603`,
      details,
      {
        headers: {
          Accept: "application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1",
          "Content-Type": "application/json;charset=ISO-8859-1"
        }
      }
    ).catch(err => {
      throw err.response.data.errors;
    });
  }
}
