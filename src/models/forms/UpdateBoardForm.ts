import { SaveBoardForm } from "./SaveBoardForm";
import { IsString } from "class-validator";

export class UpdateBoardForm extends SaveBoardForm {

    @IsString()
    boardId: string;

}