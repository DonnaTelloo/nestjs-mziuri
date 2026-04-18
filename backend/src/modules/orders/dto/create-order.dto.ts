import {
    IsNumber,
    IsArray,
    ValidateNested,
    IsEnum,
    IsOptional
} from 'class-validator'
import { Type } from 'class-transformer';

class OrderItemDto {
    @IsNumber()
    productId: number;
    
    @IsNumber()
    quantity: number;
}

export enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled'
}

export class CreateOrderDto {
    @IsNumber()
    userId: number;
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
    
    @IsEnum(OrderStatus)
    @IsOptional()
    status?: OrderStatus = OrderStatus.PENDING;
}