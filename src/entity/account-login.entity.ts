import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class AccountLogin {
    @PrimaryColumn()
    accountId: number;

    @Column({type: "timestamp"})
    date: Date;
}