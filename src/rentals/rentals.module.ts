import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';

@Module({
  imports: [AuthModule],
  controllers: [RentalsController],
  providers: [RentalsService, AuthGuard, AuthService],
})
export class RentalsModule {}
