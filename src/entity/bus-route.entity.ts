import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { BusStop } from "./bus-stop.entity";

@Entity()
export class BusRoute {
    @PrimaryColumn({
        type: 'char',
        length: 6,
    })
    busNo: string; // bus number, e.g. "08", "60-1"

    @Column({
        type: 'char',
        length: 14,
    })
    operatingTime: string; // operating time, e.g. "04:40 - 20:30"

    @Column()
    price: number; // standard ticket price, unit: thousand dong

    @Column()
    priceStudent: number; // ticket price for student, unit: thousand dong

    @Column()
    priceGroup: number; // price for group of 30 tickets, unit: thousand dong

    @Column()
    numTrips: number; // number of trips in a day
    
    @Column({
        type: 'char',
        length: 10,
    })
    tripTime: string; // time of a trip, unit: minutes, e.g. "80 - 90"

    @Column()
    name: string; // bus name, e.g. "Bến xe buýt Quận 8 - Đại học Quốc Gia"

    @Column()
    type: string; // type of route, e.g. "Phổ thông - Có trợ giá"

    @ManyToMany(
        type => BusStop,
        stop => stop.routes,
        {
            onDelete: 'NO ACTION', onUpdate: 'NO ACTION',
        }
    )
    @JoinTable({
        name: 'route_stop',
        joinColumn: {
            name: 'routeNo',
            referencedColumnName: 'busNo',
        },
        inverseJoinColumn: {
            name: 'stopId',
            referencedColumnName: 'id',
        },
    })
    stops?: BusStop[];
}