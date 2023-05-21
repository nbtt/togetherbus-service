import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: "timestamp"})
    created_time: Date;

    @Column()
    discount: number;

    // final amount
    @Column()
    amount: number;

    @OneToMany(
        type => OrderItem,
        item => item.order,
    )
    items: OrderItem[];

    // get amount before subtracting discount
    getOriginalAmount = () => {
        return this.amount + this.discount;
    }
}