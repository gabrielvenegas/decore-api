import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, JoinColumn, JoinTable } from 'typeorm';
import { Product } from './Product';

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

    @ManyToOne(type => Product, product => product.photos)
    @JoinColumn({ name: 'idProduct' })
    product: Product;
}