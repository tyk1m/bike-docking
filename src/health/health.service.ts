import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getStatus() {
    return {
      status: 'ok',
      service: 'cycleeazy-api',
      timestamp: new Date().toISOString(),
    };
  }
}
