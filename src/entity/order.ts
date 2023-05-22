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

    @Index()
    @ManyToOne(
        type => Account,
        { createForeignKeyConstraints: false, }
    )
    account: Account;

    // get amount before subtracting discount
    getOriginalAmount = () => {
        return this.amount + this.discount;
    }
}