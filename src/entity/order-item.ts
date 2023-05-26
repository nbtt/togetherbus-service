import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";
import { BusRoute } from "./bus-route.entity";
import { ItemDto } from "src/order/dto/item.dto";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column({
        type: 'bigint',
    })
    discount: string;

    // final amount
    @Column({
        type: 'bigint',
    })
    amount: string;

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