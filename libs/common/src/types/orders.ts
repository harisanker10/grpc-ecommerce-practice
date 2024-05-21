// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.0
//   protoc               v4.25.3
// source: proto/orders.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

const protobufPackage = 'orders';

export interface Order {
  id: string;
  userId: string;
  productId: string;
  status: string;
  amount: number;
}

export interface CreateOrderDto {
  userId: string;
  productId: string;
  amount: number;
}

export interface UserOrdersDto {
  userId: string;
}

export interface Orders {
  orders: Order[];
}

interface Empty {}

export const ORDERS_PACKAGE_NAME = 'orders';

export interface OrderServiceClient {
  createOrder(request: CreateOrderDto): Observable<Order>;

  findAllOrders(request: Empty): Observable<Orders>;

  findOrdersOfUser(request: UserOrdersDto): Observable<Orders>;
}

export interface OrderServiceController {
  createOrder(
    request: CreateOrderDto,
  ): Promise<Order> | Observable<Order> | Order;

  findAllOrders(request: Empty): Promise<Orders> | Observable<Orders> | Orders;

  findOrdersOfUser(
    request: UserOrdersDto,
  ): Promise<Orders> | Observable<Orders> | Orders;
}

export function OrderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createOrder',
      'findAllOrders',
      'findOrdersOfUser',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('OrderService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('OrderService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const ORDER_SERVICE_NAME = 'OrderService';
