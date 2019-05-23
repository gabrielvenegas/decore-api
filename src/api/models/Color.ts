import { ManyToMany, JoinTable, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { Product } from './Product';

@Entity()
export class Color {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Product, product => product.colors)
    products: Product[];
}

