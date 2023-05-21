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
        type: 'float',
    })
    lat: number; // lattitude of bus stop

    @Column({
        type: 'float'
    })
    lng: number; // longitude of bus stop

    @Column()
    name: string; // name of bus stop, e.g. "Bến xe buýt Quận 8"

    @Column()
    type: string; // bus stop type, e.g. "Trụ dừng"
    
    @Column()
    addressNo: string; // address number of bus stop, e.g. "Khu dân cư Opal Tower", "278"

    @Column()
    street: string; // street address of bus stop, e.g. "Phạm Văn Đồng"

    @Column()
    ward: string; // ward address of bus stop, e.g. "Phường Hiệp Bình Chánh"

    @Column()
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