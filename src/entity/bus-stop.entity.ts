import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { BusRoute } from "./bus-route.entity";

@Entity()
export class BusStop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'char',
        length: '10',
    })
    code: string; // bus stop code, e.g. "BX 20"

    @Column({
        type: 'decimal',
        precision: 8,
        scale: 6,
    })
    lat: number; // lattitude of bus stop

    @Column({
        type: 'decimal',
        precision: 9,
        scale: 6,
    })
    lng: number; // longitude of bus stop

    @Column()
    name: string; // name of bus stop, e.g. "Bến xe buýt Quận 8"

    @Column()
    type: string; // bus stop type, e.g. "Trụ dừng"
    
    @Column({nullable: true})
    addressNo: string; // address number of bus stop, e.g. "Khu dân cư Opal Tower", "278"

    @Column({nullable: true})
    street: string; // street address of bus stop, e.g. "Phạm Văn Đồng"

    @Column({nullable: true})
    ward: string; // ward address of bus stop, e.g. "Phường Hiệp Bình Chánh"

    @Column({nullable: true})
    zone: string; // zone address of bus stop, e.g. "Quận Thủ Đức"

    @ManyToMany(
        type => BusRoute,
        route => route.stops,
        {
            onDelete: 'NO ACTION', onUpdate: 'NO ACTION',
        }
    )
    routes?: BusRoute[];
}