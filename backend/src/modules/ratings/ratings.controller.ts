import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {RatingsService} from "./ratings.service";
import {CreateRatingDto} from "./dto/create-rating.dto";
import {UpdateRatingDto} from "./dto/update-rating.dto";

@Controller('ratings')
export class RatingsController {
    constructor(private readonly service: RatingsService) {
    }

    @Post()
    create(@Body() dto: CreateRatingDto) {
        return this.service.create(dto);
    }

    @Get()
    fetchAll() {
        return this.service.fetchAll();
    }

    @Get(':id')
    getRatingByUserId(@Param('id') userId: string) {
        return this.service.getRatingByUserId(userId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateRatingDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}