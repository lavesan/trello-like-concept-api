import { IsString } from "class-validator";

export class BoardIdForm {

    @IsString()
    boardId: string;

}