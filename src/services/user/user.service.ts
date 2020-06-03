import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async create(createCatDto: any): Promise<User> {
        const createdCat = new this.userModel(createCatDto);
        return createdCat.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    findOneById(userId: string): Promise<User | null> {
        return this.userModel.findById(userId).exec();
    }

}
