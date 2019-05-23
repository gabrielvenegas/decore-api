import { BaseModel } from "./BaseModel";
import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { Product } from './Product';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @OneToMany(type => Product, product => product.category)
    products: Product[];
}
