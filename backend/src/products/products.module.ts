import { Module } from '@nestjs/common';
import { ProductsController, AdminProductsController } from './products.controller.js';
import { ProductsService } from './products.service.js';
import { CloudinaryModule } from '../cloudinary/cloudinary.module.js';

@Module({
  imports: [CloudinaryModule],
  controllers: [ProductsController, AdminProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
