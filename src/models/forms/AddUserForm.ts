import { IsString } from 'class-validator';

export class AddUserForm {

    @IsString()
    userId: string;

    @IsString()
    boardId: string;

}