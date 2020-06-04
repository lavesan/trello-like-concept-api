import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { SaveUserForm } from 'src/models/forms/SaveUserForm';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() body: SaveUserForm) {
        return this.userService.create(body);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

}
