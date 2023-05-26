import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class AccountLogin {
    @PrimaryColumn({
        type: 'char',
        length: 10,
    })
    accountPhone: string;

    @Column({type: "timestamp"})
    date: Date;
}