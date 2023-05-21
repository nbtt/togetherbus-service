import { Column, Entity, PrimaryColumn } from "typeorm";

export enum BusDirection {
    GO = 'go',
    RETURN = 'return',
}

@Entity()
export class BusTrip {
    @PrimaryColumn({
        type: 'char',
        length: 6,
    })
    routeNo: string;

    @PrimaryColumn({
        type: 'enum',
        enum: BusDirection,
    })
    direction: BusDirection;

    @Column({
        type: 'char',
        length: 5,
    })
    startTime: string; // starting time of trip, e.g. "04:50"

    @Column({
        type: 'char',
        length: 5,
    })
    endTime: string; // end time of trip, e.g. "06:10"
}