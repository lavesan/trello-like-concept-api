import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Board } from 'src/schemas/board.schema';
import { Model } from 'mongoose';
import { SaveBoardForm } from 'src/models/forms/SaveBoardForm';
import { AddUserForm } from 'src/models/forms/AddUserForm';
import { UserService } from '../user/user.service';
import { Row } from 'src/schemas/row.schema';
import { Column } from 'src/schemas/column.schema';
import { AddRowForm } from 'src/models/forms/AddRowForm';
import { AddColumnForm } from 'src/models/forms/AddColumnForm';
import { AddUserToColumn } from 'src/models/forms/AddUserToColumn';
import { UpdateBoardForm } from 'src/models/forms/UpdateBoardForm';
import { AddTagForm } from 'src/models/forms/AddTagForm';
import { AddTagToColumnForm } from 'src/models/forms/AddTagToColumnForm';

@Injectable()
export class BoardService {

    constructor(
        @InjectModel(Board.name)
        private readonly boardModel: Model<Board>,
        @InjectModel(Row.name)
        private readonly rowModel: Model<Row>,
        @InjectModel(Column.name)
        private readonly columnModel: Model<Column>,
        private readonly userService: UserService,
    ) {}

    createBoard(form: SaveBoardForm): Promise<Board> {

        const data = {
            ...form,
            users: [],
            rows: [],
            tags: [],
        }

        const createdBoard = new this.boardModel(data);
        return createdBoard.save();

    }

    updateBoard({ boardId, ...board }: UpdateBoardForm) {
        return this.boardModel.updateOne({ _id: boardId }, board);
    }

    findOneById(boardId: string): Promise<Board> {
        return this.boardModel.findById(boardId).exec();
    }

    findAll(): Promise<Board[]> {
        return this.boardModel.find().exec();
    }

    async addUser({ userId, boardId }: AddUserForm): Promise<any> {

        const user = await this.userService.findOneById(userId);

        if (user) {

            return this.boardModel.updateOne({ _id: boardId }, { $push: { users: user } }).exec();

        }

        return {
            message: 'Usuário não cadastrado',
        };

    }

    addRow({ boardId, ...row }: AddRowForm) {

        const data = {
            ...row,
            columns: [],
        };

        const createdRow = new this.rowModel(data);

        return this.boardModel.updateOne({ _id: boardId }, { $push: { rows: createdRow } }).exec();

    }

    deleteRow(rowId: string) {
        return this.boardModel.updateOne({}, { $pull: { rows: { _id: rowId } }}, { multi: true }).exec();
    }

    addColumn({ boardId, rowId, ...column }: AddColumnForm) {

        const data = {
            ...column,
            users: [],
            tags: [],
        };

        const createdColumn = new this.columnModel(data);

        return this.boardModel.updateOne({
            _id: boardId,
            'rows._id': rowId,
        },
        {
            $push: { 'rows.$.columns': createdColumn }
        }).exec();

    }

    deleteColumn(columnId: string) {
        return this.boardModel.updateOne({}, { $pull: { 'rows.$[].columns': { _id: columnId } }}, { multi: true }).exec();
    }

    async addUserToColumn({ userId, rowId, columnId, boardId }: AddUserToColumn) {

        const user = await this.userService.findOneById(userId);

        if (!user) {
            return {
                message: 'Usuário não encontrado',
            };
        }

        return this.boardModel.updateOne({
            _id: boardId,
            'rows._id': rowId,
            'rows.columns._id': columnId,
        },{
            $push: { 'rows.$[].columns.$[].users': user }
        });

    }

    addTagToBoard({ boardId, tag }: AddTagForm) {
        return this.boardModel.updateOne({ _id: boardId }, { $push: { tags: tag } }).exec();
    }

    async addTagToColumn({ columnId, tag }: AddTagToColumnForm) {

        const tagExists = await this.boardModel.exists({ tags: tag });

        if (!tagExists) {
            return {
                message: 'Esta tag não existe neste quadro.',
            };
        }

        return this.boardModel.updateOne({ 'rows.column._id': columnId }, { $push: { 'rows.$[].columns.$[].tags': tag } }).exec();
    }

    moveColumn() {

    }

}
