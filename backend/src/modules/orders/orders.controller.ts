import {
    Controller,
    Get,
    Post,
    Delete,
    Patch,
    Body,
    Param,
    Query
} from '@nestjs/common'
import { OrdersService } from "./orders.service";
import { CreateOrderDto, OrderStatus } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly service: OrdersService) {}

    @Post()
    create(@Body() dto: CreateOrderDto) {
        return this.service.create(dto);
    }

    @Get()
    getAllOrders(@Query('userId') userId?: string, @Query('status') status?: OrderStatus) {
        if (userId) {
            return this.service.getOrdersByUser(+userId);
        }
        if (status) {
            return this.service.getOrdersByStatus(status);
        }
        return this.service.getAllOrders();
    }

    @Get(':id')
    getSpecificOrder(@Param('id') id: string) {
        return this.service.getSpecificOrder(+id);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
        return this.service.update(+id, dto);
    }

    @Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body('status') status: OrderStatus) {
        return this.service.update(+id, { status });
    }
}