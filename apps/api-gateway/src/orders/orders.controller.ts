import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '@app/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  createOrder(@Body() order: CreateOrderDto) {
    return this.orderService.create(order);
  }

  @Get()
  findAllOrders() {
    return this.orderService.findAllOrders();
  }

  @Get(':id')
  findUserOrders(@Param('id') id: string) {
    return this.orderService.findByUserId(id);
  }
}
