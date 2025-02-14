import { Injectable } from '@nestjs/common';

import { Category, Component } from '@prisma/client';
import { PrismaService } from './db/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async saveComponents(data: Component[]) {
    // data.forEach(async (d) => {
    //   d.updated_at = new Date(d.updated_at);
    //   await this.prisma.component.create({ data: d });
    // });
    data.forEach(d => d.updated_at = new Date(d.updated_at));
    return this.prisma.component.createMany({ data });
  }
}
