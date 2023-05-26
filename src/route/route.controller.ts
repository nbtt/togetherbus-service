import { Controller, Get, Param } from '@nestjs/common';
import { RouteService } from './route.service';

@Controller('routes')
export class RouteController {
    constructor(
        private routeService: RouteService,
    ) {}

    @Get('/')
    async getAll() {
        const routes = await this.routeService.getAll({
            busNo: true,
            name: true,
            operatingTime: true,
            price: true,
        });

        return {
            routes,
            total: routes.length,
        }
    }
    @Get(':busNo')
    async getRouteByNo(@Param('busNo') busNo: string){
        return await this.routeService.getRouteByNo(busNo);
    }
    @Get(':busNo/stops')
    async getStopsByBusNo(@Param('busNo') busNo: string){
        const stops = this.routeService.getStopsByBusNo(busNo);
        const makeReturn = (stop)=>{
            var routeStop = stop['stop'];
            routeStop['order'] = routeStop['order']; 
            var address = [routeStop.addressNo, routeStop.street, routeStop.ward, routeStop.zone]
                        .filter((item) => item != "").join(", ");
            return { 
                'code': routeStop['code'],
                'order': stop['order'],
                'lat': routeStop['lat'],
                'lng': routeStop['lng'],
                'name': routeStop['name'],
                'address': address}
        };
        // return null;
        const gostop = (await stops[0]).map(makeReturn);
        const returnstop = (await stops[1]).map(makeReturn);
        
        return {'goStops':[...gostop],'returnStops':[...returnstop]};
    }
    @Get(':busNo/timetables')
    async getTimetablesByBusNo(@Param('busNo') busNo: string){
        const timetables = this.routeService.getTimetablesByBusNo(busNo);
        timetables.map((direct) => direct.then((timetable)=>{
            timetable.map((item)=>{
                delete item.direction;
                delete item.routeNo;
            })
        }));
        return {"goTimetables": await timetables[0], "returnTimeTables": await timetables[1]};
    }
}
