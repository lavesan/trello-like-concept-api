import { BoardIdForm } from "./BoardIdForm";
import { IsString } from "class-validator";

export class UpdateColumnForm extends BoardIdForm {

    @IsString()
    rowId: string;

    @IsString()
    columnId: string;

    @IsString()
    description: string;

}