import { IsString } from "class-validator";
import { BoardIdForm } from "./BoardIdForm";

export class AddTagToColumnForm extends BoardIdForm {

    @IsString()
    columnId: string;

    @IsString()
    rowId: string;

    @IsString()
    tag: string;

}