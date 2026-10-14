import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BikesService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  getBikes() {
    return this.prisma.bike.findMany({ orderBy: { id: 'asc' } });
  }

  async getStations() {
    const bikes = await this.prisma.bike.findMany({
      select: { station: true, available: true },
      orderBy: { station: 'asc' },
    });
    const stations = new Map<string, { name: string; totalBikes: number; availableBikes: number }>();
    for (const bike of bikes) {
      const station = stations.get(bike.station) ?? { name: bike.station, totalBikes: 0, availableBikes: 0 };
      station.totalBikes += 1;
      if (bike.available) station.availableBikes += 1;
      stations.set(bike.station, station);
    }
    return [...stations.values()];
  }
}
