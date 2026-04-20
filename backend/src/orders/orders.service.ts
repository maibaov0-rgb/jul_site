import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { TelegramService } from '../telegram/telegram.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly telegram: TelegramService,
  ) {}

  async create(dto: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: {
        customerName: dto.customerName,
        phone: dto.phone,
        deliveryInfo: dto.deliveryInfo,
        products: dto.products as unknown as object,
        totalPrice: dto.totalPrice,
        status: 'new',
      },
    });

    // Надсилаємо сповіщення
    await this.telegram.sendOrderNotification({
      ...order,
      products: dto.products as any,
    });

    return order;
  }

  findAll() {
    return this.prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
