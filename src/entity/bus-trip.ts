import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BusTimetable } from "./bus-timetable";

export enum BusDirection {
    GO = 'go',
    RETURN = 'return',
}

@Entity()
export class BusTrip {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order: number; // order of trip in the timetable

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

    @ManyToOne(
        type => BusTimetable,
        { 
            onDelete: 'NO ACTION', onUpdate: 'NO ACTION',
            createForeignKeyConstraints: false,
        }
    )
    timetable?: BusTimetable;
}