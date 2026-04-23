import {
    Controller,
    Get,
    Post,
    Delete,
    Patch,
    Body,
    Param
} from '@nestjs/common'
import { UsersService } from "./users.service";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Post()
    async create(@Body() dto: CreateUserDto) {
        return this.service.create(dto);
    }

    @Get()
    async getAllUsers() {
        return this.service.getAllUsers();
    }

    @Get(':id')
    async getSpecificUser(@Param('id') id: string) {
        return this.service.getSpecificUser(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.service.delete(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.service.update(id, dto);
    }
}
