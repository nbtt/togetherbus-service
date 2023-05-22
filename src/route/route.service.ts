import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusRoute } from 'src/entity/bus-route.entity';
import { FindOptionsSelect, FindOptionsSelectByString, Repository } from 'typeorm';

@Injectable()
export class RouteService {
    constructor(
        @InjectRepository(BusRoute)
        private busRouteRepository: Repository<BusRoute>,
    ) {}

    getAll(select: FindOptionsSelect<BusRoute> = {}) {
        return this.busRouteRepository.find({
            relations: {
                stops: false,
            },
            select,
        })
    }
}
