import { BaseModel } from "./BaseModel";
import { Column, Entity, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Category } from './Category';
import { Color } from './Color';
import { Photo } from './Photo';

@Entity()
export class Product extends BaseModel {
    @Column()
    name: string;
    @Column()
    type: number;
    @Column()
    cover: number;
    @Column()
    amount: number;
    @Column({ type: "double" })
    price: number;
    @Column({ type: "double", nullable: true })
    discountPrice: number;
    @Column({ type: "double", nullable: true })
    weight: number;
    @Column({ type: "double", nullable: true })
    length: number;
    @Column({ type: "double", nullable: true })
    height: number;
    @Column({ type: "double", nullable: true })
    diameter: number;
    @Column({ type: "double", nullable: true })
    width: number;
    @Column({ default: 1 })
    active: number;
    @Column({ default: 0 })
    spotlight: number;
    @Column()
    description: string;

    @ManyToOne(type => Category, category => category.products)
    @JoinColumn({ name: 'idCategory' })
    category: Category;

    @ManyToMany(type => Color, color => color.products)
    @JoinTable({ name: 'product_color' })
    colors: Color[];

    @OneToMany(type => Photo, photo => photo.product)
    @JoinColumn({ name: 'idProduct' })
    photos: Photo[];

}
