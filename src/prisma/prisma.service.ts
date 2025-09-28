import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect()
      .then(() => {
        console.log('Connected to the database');
      })
      .catch((error) => {
        console.error('Error connecting to the database:', error);
      });
  }

  async onModuleDestroy() {
    await this.$disconnect()
      .then(() => {
        console.log('Disconnected from the database');
      })
      .catch((error) => {
        console.error('Error disconnecting from the database:', error);
      });
  }
}
