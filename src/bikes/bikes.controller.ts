import { Controller, Get, Inject } from '@nestjs/common';
import { BikesService } from './bikes.service';

@Controller()
export class BikesController {
  constructor(@Inject(BikesService) private readonly bikesService: BikesService) {}

  @Get('bikes')
  getBikes() {
    return this.bikesService.getBikes();
  }

  @Get('stations')
  getStations() {
    return this.bikesService.getStations();
  }
}
