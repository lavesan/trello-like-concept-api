import { IsString, IsNumber } from 'class-validator';
import { BoardIdForm } from './BoardIdForm';

export class MoveColumnForm extends BoardIdForm {

    @IsString()
    newRowId: string;

    @IsString()
    oldRowId: string;

    @IsNumber()
    newPosition: number;

    @IsString()
    columnId: string;

}