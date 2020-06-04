import { IsString } from "class-validator";
import { BoardIdForm } from "./BoardIdForm";

export class AddUserToColumn extends BoardIdForm {

    @IsString()
    columnId: string;

    @IsString()
    userId: string;

    @IsString()
    rowId: string;

}