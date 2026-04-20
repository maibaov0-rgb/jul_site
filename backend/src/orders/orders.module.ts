import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';
import { TelegramModule } from '../telegram/telegram.module.js';

@Module({
  imports: [TelegramModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
