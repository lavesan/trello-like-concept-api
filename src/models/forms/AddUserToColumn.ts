import { IsString } from "class-validator";
import { BoardIdForm } from "./BoardIdForm";

export class AddUserToColumn extends BoardIdForm {

    @IsString()
    rowId: string;

    @IsString()
    columnId: string;

    @IsString()
    userId: string;

}