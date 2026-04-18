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
import { ProductsService } from "./products.service";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly service: ProductsService) {}

    @Post()
    create(@Body() dto: CreateProductDto) {
        return this.service.create(dto);
    }

    @Get()
    getAllProducts(@Query('category') category?: string) {
        if (category) {
            return this.service.getProductsByCategory(category);
        }
        return this.service.getAllProducts();
    }

    @Get(':id')
    getSpecificProduct(@Param('id') id: string) {
        return this.service.getSpecificProduct(+id);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
        return this.service.update(+id, dto);
    }
}