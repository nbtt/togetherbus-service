import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Account {
    @PrimaryColumn({
        type: 'char',
        length: 10,
    })
    phone: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}