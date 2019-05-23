import { IsEmail, IsDate, Length, IsNumberString } from "class-validator";
import { Column, Entity, BeforeInsert, BeforeUpdate } from "typeorm";
import * as bcrypt from "bcryptjs";
import { Logger } from "../../lib/logger";
import { BaseModel } from "./BaseModel";
import moment from "moment";

const log = new Logger(__filename);

@Entity()
export class User extends BaseModel {
  @IsNumberString()
  @Column({ unique: true, nullable: false })
  phone: string;

  @Column()
  password: string;

  @Column()
  @Length(3, 250)
  name: string;

  @Column()
  @IsDate()
  birthDate: Date;

  @Column()
  postalCode: string;

  @Column()
  number: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  street: string;

  @Column()
  @IsEmail()
  mail: string;

  @Column()
  active: boolean;

  @Column()
  role: string;
  comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  @BeforeInsert()
  async hashOnSave() {
    await this.hashPassword();
  }

  @BeforeUpdate()
  async hashOnUpdate() {
    if (this.password) await this.hashPassword();
  }

  async hashPassword(): Promise<void> {
    if (this.password.length < 4) throw new Error("password too short");
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password.trim(), salt);
      return;
    } catch (e) {
      log.error(e);
    }
  }

  get age(): number {
    return moment().diff(this.birthDate, "years", false);
  }
}
