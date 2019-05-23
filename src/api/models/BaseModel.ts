import {
  Column,
  BeforeUpdate,
  BeforeInsert,
  PrimaryGeneratedColumn
} from "typeorm";

export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @BeforeInsert()
  writeCreatedAt() {
    this.createdAt = new Date();
    this.writeUpdatedAt();
  }

  @BeforeUpdate()
  writeUpdatedAt() {
    this.updatedAt = new Date();
  }
}
