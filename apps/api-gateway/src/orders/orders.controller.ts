import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '@app/common';
import { AuthGuard } from '../guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Post()
  createOrder(@Body() order: CreateOrderDto, @Request() req) {
    return this.orderService.create(order, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAllOrders(@Request() req) {
    return this.orderService.findByUserId(req.user.id);
  }

  @Get(':id')
  findUserOrders(@Param('id') id: string) {
    return this.orderService.findByUserId(id);
  }
}
