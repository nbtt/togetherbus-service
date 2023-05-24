import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusRoute } from 'src/entity/bus-route.entity';
import { Logger } from '@nestjs/common';
import { FindOptionsSelect, FindOptionsSelectByString, Repository } from 'typeorm';

@Injectable()
export class RouteService {
    constructor(
        @InjectRepository(BusRoute)
        private readonly busRouteRepository: Repository<BusRoute>,
    ) {}

    getAll(select: FindOptionsSelect<BusRoute> = {}) {
        return this.busRouteRepository.find({
            relations: {
                stops: false,
            },
            select,
        })
    }
    getRouteByNo(busNo: string) {
        return this.busRouteRepository.findOne({
            where: {
                "busNo":busNo,
            }
        })
    }
    // getStopsByBusNo(busNo: string) {
    //     const stops = this.busRouteRepository.findOne({
    //         where: {
    //             "busNo":busNo,
    //         },
    //         relations: {
    //             stops: true,
    //         },
    //     }).then(route => route.stops);

    //     const length = stops.then(stops => stops.length);
    //     for(var i in stops){
    //         Logger.log(i);
    //     }
    //     // const makeAddress = (addressArray: Array<string>) => {
    //     //     const addressArrayFiltered = addressArray.filter((item) => item != "-1");
    //     //     const address = addressArrayFiltered.join(", ");
    //     //     return address
    //     // }
    //     // for(let i = 0; i < length; i++) {
    //     //     stops[i]['address'] = stops[i]['addressNo'] + stops[i]['street'];
    //     // }
    //     return stops;
    // }
}
