import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Board } from 'src/schemas/board.schema';
import { Model } from 'mongoose';`
`
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
import { DeleteColumnForm } from 'src/models/forms/DeleteColumnForm';
import { sortByPosition } from 'src/helpers/board.helpers';
import { UpdateColumnForm } from 'src/models/forms/UpdateColumnForm';
import { UpdateRowForm } from 'src/models/forms/UpdateRowForm';
import { MoveColumnForm } from 'src/models/forms/MoveColumnForm';

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

    updateBoard({ boardId, name }: UpdateBoardForm) {
        return this.boardModel.updateOne({ _id: boardId }, { $set: { name } }).exec();
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

    async addRow({ boardId, ...row }: AddRowForm) {

        const data = {
            ...row,
            columns: [],
        };

        const createdRow = new this.rowModel(data);
        await createdRow.save();

        return this.boardModel.updateOne({ _id: boardId }, { $push: { rows: createdRow } }).exec();

    }

    deleteRow(rowId: string) {
        return this.boardModel.updateOne({}, { $pull: { rows: { _id: rowId } }}).exec();
    }

    async addColumn({ rowId, ...column }: AddColumnForm) {

        const data = {
            ...column,
            position: 0,
            users: [],
            tags: [],
        };

        const board = await this.boardModel.findOne({ 'rows._id': rowId }).exec();

        const row = board.rows.find(rowIterate => rowIterate._id == rowId);

        data.position = row.columns.length;

        const createdColumn = new this.columnModel(data);
        await createdColumn.save();

        return this.boardModel.updateOne({ 'rows._id': rowId },
        {
            $push: { 'rows.$.columns': createdColumn }
        }).exec();

    }

    async deleteColumn({ columnId, rowId }: DeleteColumnForm) {

        await this.boardModel.updateOne({}, { $pull: { 'rows.$[].columns': { _id: columnId } }}).exec();

        return this.reorderColumns(rowId);

    }

    async addUserToColumn({ userId, columnId, boardId, rowId }: AddUserToColumn) {

        const user = await this.userService.findOneById(userId);
        const userExistOnColumn = await this.columnModel.exists({ _id: columnId, 'users.$._id': userId })

        if (!user) {
            return {
                message: 'Usuário não encontrado',
            };
        }

        if (userExistOnColumn) {
            return {
                message: 'Usuário já existe na coluna',
            }
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

    async addTagToColumn({ columnId, tag, boardId, rowId }: AddTagToColumnForm) {

        const tagExists = await this.boardModel.exists({ tags: tag });
        const tagExistsOnColumn = await this.columnModel.exists({ _id: columnId, tags: tag });

        if (!tagExists) {
            return {
                message: 'Esta tag não existe neste quadro.',
            };
        }

        if (tagExistsOnColumn) {
            return {
                message: 'Esta tag já existe neste cartão',
            }
        }

        return this.boardModel.updateOne({
            _id: boardId,
            'rows._id': rowId,
            'rows.columns._id': columnId,
        }, { $push: { 'rows.$[].columns.$[].tags': tag } }).exec();

    }

    updateColumn({ columnId, rowId, boardId, description }: UpdateColumnForm) {
        return this.boardModel.updateOne({
            _id: boardId,
            'rows._id': rowId,
            'rows.columns._id': columnId,
        },{
            $set: { 'rows.$[].columns.$[].description': description }
        });
    }

    updateRow({ rowId, boardId, name }: UpdateRowForm) {
        return this.boardModel.updateOne({
            _id: boardId,
            'rows._id': rowId,
        },{
            $set: { 'rows.$.name': name },
        });
    }

    async moveColumn({ boardId, newPosition, newRowId, oldRowId, columnId }: MoveColumnForm) {

        const column = await this.columnModel.findOne({ _id: columnId }).exec();
        const board = await this.boardModel.findOne({ _id: boardId }).exec();
        const row = board.rows.find(ro => ro._id == newRowId);

        await this.boardModel.updateOne({
            _id: boardId,
            'rows._id': oldRowId,
        },{
            $pull: { 'rows.$[].columns': { _id: columnId } },
        });

        let allColumns = [];

        const mapppedColumns = row.columns.map(col => ({
            _id: col._id,
            position: col.position,
            users: col.users,
            tags: col.tags,
            description: col.description,
        }));

        console.log('mapppedColumns: ', mapppedColumns);

        const columnData = {
            _id: column._id,
            position: newPosition,
            users: column.users,
            tags: column.tags,
            description: column.description,
        }

        console.log('newPosition: ', newPosition);

        const firtElems = mapppedColumns.slice(0, newPosition);
        const lastElems = mapppedColumns.slice(newPosition);
        firtElems.push(columnData);
        allColumns = firtElems.concat(lastElems);
        allColumns = allColumns.map((col, index) => ({
            ...col,
            position: index,
        }))

        console.log('firtElems: ', firtElems);
        console.log('lastElems: ', lastElems);
        console.log('allColumns: ', allColumns);

        await this.boardModel.updateOne({
            _id: boardId,
            'rows._id': newRowId,
        },{
            $set: { 'rows.$.columns': allColumns },
        });

        if (newRowId != oldRowId) {
            await this.reorderColumns(oldRowId);
        }

        return {
            message: 'Posição alterada',
        };

    }

    private async reorderColumns(rowId: string) {

        const row = await this.rowModel.findOne({ _id: rowId }).exec();

        if (!row) {
            return {
                message: 'Esta linha não existe',
            };
        }

        const sortedColumns = row.columns.sort(sortByPosition);
        const mappedColumns = sortedColumns.map((column, index) => ({
            ...column,
            position: index,
        }));

        return this.boardModel.updateOne({ 'rows._id': rowId }, { $set: { 'rows.$.columns': mappedColumns } });

    }

}
