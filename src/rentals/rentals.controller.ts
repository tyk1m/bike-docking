import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { SafeUser } from '../auth/auth.types';
import { RentalsService } from './rentals.service';

@Controller('rentals')
@UseGuards(AuthGuard)
export class RentalsController {
  constructor(@Inject(RentalsService) private readonly rentalsService: RentalsService) {}

  @Get()
  getMyRentals(@Req() request: { user: SafeUser }) {
    return this.rentalsService.getForUser(request.user.id);
  }

  @Post()
  startRental(@Req() request: { user: SafeUser }, @Body() body: { bikeId?: unknown }) {
    return this.rentalsService.start(request.user.id, body.bikeId);
  }

  @Post('return')
  returnRental(@Req() request: { user: SafeUser }, @Body() body: { rentalId?: unknown }) {
    return this.rentalsService.return(request.user.id, body.rentalId);
  }
}
