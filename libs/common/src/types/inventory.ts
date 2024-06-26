// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.0
//   protoc               v4.25.3
// source: proto/inventory.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

// const protobufPackage = 'inventory';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface Products {
  products: Product[];
}

export interface FindOneProductDto {
  id: string;
}

interface Empty {}

export const INVENTORY_PACKAGE_NAME = 'inventory';

export interface ProductServiceClient {
  findAllProducts(request: Empty): Observable<Products>;

  findOneProduct(request: FindOneProductDto): Observable<Product>;
}

export interface ProductServiceController {
  findAllProducts(
    request: Empty,
  ): Promise<Products> | Observable<Products> | Products;

  findOneProduct(
    request: FindOneProductDto,
  ): Promise<Product> | Observable<Product> | Product;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findAllProducts', 'findOneProduct'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('ProductService', method)(
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
      GrpcStreamMethod('ProductService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const PRODUCT_SERVICE_NAME = 'ProductService';
