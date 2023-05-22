import { Controller, Get } from '@nestjs/common';
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
}
