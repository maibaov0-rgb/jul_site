import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        customerName: dto.customerName,
        phone: dto.phone,
        deliveryInfo: dto.deliveryInfo,
        products: dto.products as unknown as object,
        totalPrice: dto.totalPrice,
        status: 'new',
      },
    });
  }

  findAll() {
    return this.prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
