import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusRoute } from 'src/entity/bus-route.entity';
import { FindOptionsSelect, FindOptionsSelectByString, Repository } from 'typeorm';
import { RouteStop } from 'src/entity/route-stop';
import { BusDirection } from 'src/entity/bus-trip';
@Injectable()
export class RouteService {
    constructor(
        @InjectRepository(BusRoute)
        private readonly busRouteRepository: Repository<BusRoute>,
        @InjectRepository(RouteStop)
        private readonly routeStopRepository: Repository<RouteStop>,
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
    getStopsByBusNo(busNo: string) {
        // let query = this.busRouteRepository.createQueryBuilder("bus_route").
        var directions = [BusDirection.GO,BusDirection.RETURN];
        const ret = directions.map((direction) =>this.routeStopRepository.find({
            where: {
                "routeNo":busNo,
                "direction": direction,
            },
            relations:{
                stop: true,
            },
        }));
        return ret;
    }
}
