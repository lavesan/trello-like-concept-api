import { IsString, IsNumber } from 'class-validator';
import { BoardIdForm } from './BoardIdForm';

export class AddColumnForm extends BoardIdForm {

    @IsString()
    rowId: string;

    @IsString()
    description: string;

    @IsNumber()
    position: number;

}