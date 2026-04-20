import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  findAll(category?: string) {
    return this.prisma.product.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({ where: { slug } });
    if (!product) throw new NotFoundException(`Товар "${slug}" не знайдено`);
    return product;
  }

  async findById(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException(`Товар #${id} не знайдено`);
    return product;
  }

  create(dto: CreateProductDto) {
    return this.prisma.product.create({ data: dto });
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findById(id);
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findById(id);
    return this.prisma.product.delete({ where: { id } });
  }
}
