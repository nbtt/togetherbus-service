import { Column, Entity, Index, PrimaryColumn } from "typeorm";

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
    @Index({ unique: true })
    email: string;

    @Column()
    password: string;
}