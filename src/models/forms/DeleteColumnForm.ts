import { IsString } from "class-validator";

export class DeleteColumnForm {

    @IsString()
    rowId: string;

    @IsString()
    columnId: string;

}