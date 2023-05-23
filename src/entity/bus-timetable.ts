import { Column, Entity, Index, OneToMany, PrimaryColumn } from "typeorm";
import { BusDirection, BusTrip } from "./bus-trip";

@Entity()
@Index(['routeNo', 'direction'], { unique: true })
export class BusTimetable {
    @PrimaryColumn()
    id: number;

    @Column({
        type: 'char',
        length: 6,
    })
    routeNo: string; // bus route number

    @Column({
        type: 'enum',
        enum: BusDirection,
    })
    direction: BusDirection; // direction of bus route

    @OneToMany(
        type => BusTrip,
        trip => trip.timetable,
        { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
    )
    trips?: BusTrip[];
}