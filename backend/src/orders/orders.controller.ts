import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { TelegramService } from '../telegram/telegram.service.js';
import { AdminGuard } from '../common/admin.guard.js';
import { CreateOrderDto } from './dto/create-order.dto.js';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly telegramService: TelegramService,
  ) {}

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    const order = await this.ordersService.create(dto);
    await this.telegramService.sendOrderNotification({
      id: order.id,
      customerName: order.customerName,
      phone: order.phone,
      deliveryInfo: order.deliveryInfo,
      products: dto.products,
      totalPrice: order.totalPrice,
    });
    return order;
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
}
