import { BaseModel } from "./BaseModel";
import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { FamilyPerson } from "./FamilyPerson";

@Entity()
export class Family extends BaseModel {
  @Column()
  description: string;

  @OneToOne(() => FamilyPerson, f => f.family)
  family: Family;
}
