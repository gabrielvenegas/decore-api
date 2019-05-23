import {
  JsonController,
  Post,
  Param,
  Params,
  Body,
  BodyParam
} from "routing-controllers";
import { PaymentService } from "../../lib/payment.service";
import { Checkout } from '../models/Checkout';
@JsonController("/order")
export class AuthController {
  constructor(private paymentService: PaymentService) { }

  // @Post("/init-session")
  // async initSession() {
  //   this.paymentHelper.parser.parseString(
  //     await this.paymentHelper.initSession(),
  //     (err: any, result: any) => {
  //       if (err) throw err;
  //       return result.session.id[0];
  //     }
  //   );
  // }

  @Post("/subscribe")
  subscribeToPlan(@Params() token: string) {
    let data = {
      plan: "8177EFD28B8B24499408BF90938F6E7B",
      reference: "PL-02",
      sender: {
        name: "Gabriel Enrique Dangelo Venegas",
        email: "c55434676959545572589@sandbox.pagseguro.com.br",
        ip: "191.35.44.10",
        phone: {
          areaCode: "27",
          number: "998479940"
        },
        address: {
          street: "Rua Itapemirim",
          number: "68",
          complement: "Casa",
          district: "Praia do Morro",
          city: "Guarapari",
          state: "ES",
          country: "BRA",
          postalCode: "29216290"
        },
        documents: [
          {
            type: "CPF",
            value: "34431948856"
          }
        ]
      },
      paymentMethod: {
        type: "CREDITCARD",
        creditCard: {
          token: "99bff942829d4e2bba05dc25b145c150",
          holder: {
            name: "Gabriel Enrique Dangelo Venegas",
            birthDate: "17/05/1996",
            documents: [
              {
                type: "CPF",
                value: "34431948856"
              }
            ],
            phone: {
              areaCode: "27",
              number: "998479940"
            }
          }
        }
      }
    };
    return this.paymentService.subscribeToPlan(data);
  }

  @Post("/checkout")
  async checkout(@Body() checkout: Checkout) {
    const a = await this.paymentService.checkout(checkout);
    console.log(a);
    return Promise.resolve(a);
  }
}
