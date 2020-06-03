import { IsString } from 'class-validator';
import { BoardIdForm } from './BoardIdForm';

export class AddRowForm extends BoardIdForm {

    @IsString()
    name: string;

}