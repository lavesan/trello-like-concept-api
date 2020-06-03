import { IsString } from "class-validator";

export class SaveBoardForm {

    @IsString()
    name: string;

}