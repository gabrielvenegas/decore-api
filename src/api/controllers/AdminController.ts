import { JsonController, Post, Body, Param } from "routing-controllers";
import { Repository, getRepository } from "typeorm";
import { FamilyPerson } from "../models/FamilyPerson";
import { Family } from "../models/Family";
import { Plan } from "../models/Plan";
import { PaymentService } from "../../lib/payment.service";

@JsonController("/admin")
export class AuthController {
  private familyPerson: Repository<FamilyPerson>;
  private family: Repository<Family>;
  private plan: Repository<Plan>;
  constructor(private paymentService: PaymentService) {
    this.familyPerson = getRepository(FamilyPerson);
    this.family = getRepository(Family);
    this.plan = getRepository(Plan);
  }

  @Post("/new-person/:id")
  async newPerson(@Body() person: FamilyPerson, @Param("id") id: number) {
    person.family = await this.family.findOne(id);
    return this.familyPerson.save(person);
  }

  @Post("/new-family")
  async newFamily(@Body() family: Family) {
    return this.family.save(family);
  }

}
