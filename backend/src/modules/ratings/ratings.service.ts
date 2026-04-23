import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Rating } from './schema/ratings.schema';
import { Model } from 'mongoose';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectModel(Rating.name)
    private ratingModel: Model<any>,
  ) {}

  async create(dto: CreateRatingDto) {
    await this.ratingModel.create(dto);
  }

  async fetchAll() {
    try {
      const response = await this.ratingModel.find({});
        return {
        data: response,
        status: 200,
      };
    } catch (err) {
      throw err;
    }
  }

  async getRatingByUserId(userId: string) {
    return this.ratingModel.find({ userId });
  }

  async update(id: string, dto: UpdateRatingDto) {
    return this.ratingModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string) {
    return this.ratingModel.findByIdAndDelete(id);
  }
}