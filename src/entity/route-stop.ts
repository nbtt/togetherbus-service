import { Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { BusDirection } from "./bus-trip";
import { BusRoute } from "./bus-route.entity";
import { BusStop } from "./bus-stop.entity";

@Entity()
@Index(['routeNo', 'direction', 'stopId', 'order'], { unique: true })
export class RouteStop {
    @PrimaryColumn()
    routeNo: string;

    @PrimaryColumn({
        type: 'enum',
        enum: BusDirection,
    })
    direction: BusDirection; // direction of stop in the route
    
    @PrimaryColumn()
    stopId: number;

    @PrimaryColumn()
    order: number; // order of stop in the route

    @ManyToOne(
        type => BusRoute,
        route => route.stops,
        { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
    )
    @JoinColumn({
        name: 'routeNo',
        referencedColumnName: 'busNo',
    })
    route?: BusRoute;

    @ManyToOne(
        type => BusStop,
        stop => stop.routes,
        { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
    )
    @JoinColumn({
        name: 'stopId',
        referencedColumnName: 'id',
    })
    stop?: BusStop;
}