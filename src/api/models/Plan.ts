import { BaseModel } from "./BaseModel";
import { Column, Entity, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity()
export class Plan extends BaseModel {
  @Column()
  reference: string;
  @Column()
  name: string;
  @Column()
  charge: string;
  @Column()
  period: string;
  @Column({ type: "double" })
  amountPerPayment: number;
  @Column()
  dayOfMonth: number;
  @Column()
  initialDate: Date;
  @Column()
  finalDate: Date;
  @Column()
  code: string;
  @Column({ default: 1 })
  active: number;
}
