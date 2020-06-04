import { BoardIdForm } from "./BoardIdForm";
import { IsString } from "class-validator";

export class UpdateRowForm extends BoardIdForm {

    @IsString()
    rowId: string;

    @IsString()
    name: string;

}