import { JsonController, Get, Post, Body, Authorized } from "routing-controllers";
import { getRepository, Repository } from "typeorm";
import { Plan } from "../models/Plan";
import { PaymentService } from '../../lib/payment.service';
@JsonController("/plan")
export class PlanController {
  private plan: Repository<Plan>;
  constructor(
    private paymentService: PaymentService
  ) {
    this.plan = getRepository<Plan>(Plan);
  }

  @Get()
  getPlans() {
    // TODO - Implement active check (must add prop to table)
    return this.plan.findAndCount();
  }

  @Post("/create-plan")
  async createPlan(@Body() plan: any) {
    const planObj = plan;
    // create db plan
    let newPlan = new Plan();
    newPlan = planObj.preApproval;
    newPlan.reference = planObj.reference;
    // create a recurring plan inside pasgseguro
    const res = await this.paymentService.createPlan(plan);
    if (res.status) {
      newPlan.code = res.data.code;
      newPlan.createdAt = new Date();
      newPlan.updatedAt = new Date();
      newPlan.reference = planObj.reference;
      return this.plan.save(newPlan);
    } else {
      return res.e;
    }
  }
}
