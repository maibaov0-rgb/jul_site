export class OrderProductDto {
  id!: number;
  name!: string;
  price!: number;
  quantity!: number;
}

export class CreateOrderDto {
  customerName!: string;
  phone!: string;
  deliveryInfo!: string;
  products!: OrderProductDto[];
  totalPrice!: number;
}
