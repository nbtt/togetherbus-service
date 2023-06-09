import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item";
import { Account } from "./account.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Index()
    @Column({type: "timestamp"})
    created_time: Date;

    @Column({
        type: 'bigint',
    })
    discount: string;

    // final amount
    @Column({
        type: 'bigint',
    })
    amount: string;

    @OneToMany(
        type => OrderItem,
        item => item.order,
    )
    items: OrderItem[];

    @Index()
    @Column({
        type: 'char',
        length: 10,
    })
    accountPhone: string;

    // get amount before subtracting discount
    getOriginalAmount = () => {
        return this.amount + this.discount;
    }
}