import { BaseModel } from "./BaseModel";
import { Entity, Column, OneToOne, JoinColumn, RelationId } from "typeorm";
import { Family } from "./Family";

@Entity()
export class FamilyPerson extends BaseModel {
  @Column()
  name: string;

  @Column()
  type: "Pai" | "Mãe" | "Filho" | "Outro";

  @Column()
  photoUrl: string;

  @OneToOne(() => Family, f => f.family)
  @JoinColumn({ referencedColumnName: "id" })
  family: Family;
}
