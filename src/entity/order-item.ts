import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";
import { BusRoute } from "./bus-route.entity";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    discount: number;

    // final amount
    @Column()
    amount: number;

    @ManyToOne(
        type => BusRoute,
        { createForeignKeyConstraints: false, }
    )
    route: BusRoute;

    @Index()
    @ManyToOne(
        type => Order,
        { createForeignKeyConstraints: false, }
    )
    order: Order;

    // get amount before subtracting discount
    getOriginalAmount = () => {
        return this.amount + this.discount;
    }
}