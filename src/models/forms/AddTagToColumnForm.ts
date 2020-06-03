import { IsString } from "class-validator";

export class AddTagToColumnForm {

    @IsString()
    columnId: string;

    @IsString()
    tag: string;

}