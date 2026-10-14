import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RentalsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getForUser(userId: string) {
    const rentals = await this.prisma.rental.findMany({
      where: { userId },
      include: { bike: { select: { name: true, station: true, price: true } } },
      orderBy: { startedAt: 'desc' },
    });
    return rentals.map((rental) => ({ ...rental, id: rental.id.toString() }));
  }

  async start(userId: string, bikeIdValue: unknown) {
    if (typeof bikeIdValue !== 'string' || bikeIdValue.length < 1 || bikeIdValue.length > 80) {
      throw new BadRequestException('Choose a valid bike.');
    }
    try {
      const rental = await this.prisma.$transaction(async (transaction) => {
        const activeRental = await transaction.rental.findFirst({ where: { userId, returnedAt: null } });
        if (activeRental) throw new ConflictException('Return your active bike before renting another.');
        const update = await transaction.bike.updateMany({
          where: { id: bikeIdValue, available: true },
          data: { available: false },
        });
        if (update.count !== 1) throw new ConflictException('This bike is no longer available.');
        return transaction.rental.create({ data: { userId, bikeId: bikeIdValue } });
      }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
      return { ...rental, id: rental.id.toString() };
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2034') {
        throw new ConflictException('Another rental request is being processed. Please try again.');
      }
      throw error;
    }
  }

  async return(userId: string, rentalIdValue: unknown) {
    if (typeof rentalIdValue !== 'string' || !/^\d+$/.test(rentalIdValue)) {
      throw new BadRequestException('Choose a valid rental.');
    }
    let rentalId: bigint;
    try {
      rentalId = BigInt(rentalIdValue);
    } catch {
      throw new BadRequestException('Choose a valid rental.');
    }

    return this.prisma.$transaction(async (transaction) => {
      const active = await transaction.rental.findFirst({
        where: { id: rentalId, userId, returnedAt: null },
      });
      if (!active) throw new NotFoundException('Active rental not found.');
      const returnedAt = new Date();
      await transaction.rental.update({ where: { id: rentalId }, data: { returnedAt } });
      await transaction.bike.update({ where: { id: active.bikeId }, data: { available: true } });
      return { id: active.id.toString(), returnedAt };
    });
  }
}
