import { IsString } from "class-validator";
import { BoardIdForm } from "./BoardIdForm";

export class AddTagForm extends BoardIdForm {

    @IsString()
    tag: string;

}