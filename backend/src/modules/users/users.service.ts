import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from './schema/users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(dto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(dto);
        return createdUser.save();
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async getSpecificUser(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async delete(id: string): Promise<{ deleted: boolean }> {
        const result = await this.userModel.findByIdAndDelete(id).exec();

        if (!result) {
            throw new NotFoundException('User not found');
        }

        return { deleted: true };
    }

    async update(id: string, dto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();

        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }

        return updatedUser;
    }
}