import { IsString } from 'class-validator';

export class AddColumnForm {

    @IsString()
    rowId: string;

    @IsString()
    description: string;

}