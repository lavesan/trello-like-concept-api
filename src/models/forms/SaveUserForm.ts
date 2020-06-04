import { IsString } from 'class-validator';

export class SaveUserForm {

    @IsString()
    name: string;

    @IsString()
    email: string;

}