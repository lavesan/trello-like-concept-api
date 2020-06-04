import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { SaveBoardForm } from 'src/models/forms/SaveBoardForm';
import { BoardService } from 'src/services/board/board.service';
import { AddUserForm } from 'src/models/forms/AddUserForm';
import { AddRowForm } from 'src/models/forms/AddRowForm';
import { AddColumnForm } from 'src/models/forms/AddColumnForm';
import { AddUserToColumn } from 'src/models/forms/AddUserToColumn';
import { UpdateBoardForm } from 'src/models/forms/UpdateBoardForm';
import { AddTagToColumnForm } from 'src/models/forms/AddTagToColumnForm';
import { AddTagForm } from 'src/models/forms/AddTagForm';
import { DeleteColumnForm } from 'src/models/forms/DeleteColumnForm';
import { UpdateColumnForm } from 'src/models/forms/UpdateColumnForm';
import { UpdateRowForm } from 'src/models/forms/UpdateRowForm';
import { MoveColumnForm } from 'src/models/forms/MoveColumnForm';

@Controller('board')
export class BoardController {

    constructor(private readonly boardService: BoardService) {}

    @Post()
    createBoard(@Body() body: SaveBoardForm) {
        return this.boardService.createBoard(body);
    }

    @Put()
    updateBoard(@Body() body: UpdateBoardForm) {
        return this.boardService.updateBoard(body);
    }

    @Get()
    findAll() {
        return this.boardService.findAll();
    }

    @Get(':id')
    findOneById(@Param('id') id: string) {
        return this.boardService.findOneById(id);
    }

    @Put('add-user')
    pushUser(@Body() body: AddUserForm) {
        return this.boardService.addUser(body);
    }

    @Post('row')
    pushRow(@Body() body: AddRowForm) {
        return this.boardService.addRow(body);
    }

    @Delete('row/:id')
    deleteRow(@Param('id') rowId: string) {
        return this.boardService.deleteRow(rowId);
    }

    @Put('row')
    updateRow(@Body() body: UpdateRowForm) {
        return this.boardService.updateRow(body);
    }

    @Post('column')
    pushColumn(@Body() body: AddColumnForm) {
        return this.boardService.addColumn(body);
    }

    @Put('column')
    updateColumn(@Body() body: UpdateColumnForm) {
        return this.boardService.updateColumn(body);
    }

    @Delete('column/:columnId/row/:rowId')
    deleteColumn(@Param() body: DeleteColumnForm) {
        return this.boardService.deleteColumn(body);
    }

    @Put('column/add-user')
    pushUserIntoColumn(@Body() body: AddUserToColumn) {
        return this.boardService.addUserToColumn(body);
    }

    @Put('column/tag')
    pushTagIntoColumn(@Body() body: AddTagToColumnForm) {
        return this.boardService.addTagToColumn(body);
    }

    @Put('tag')
    pushTagIntoBoard(@Body() body: AddTagForm) {
        return this.boardService.addTagToBoard(body);
    }

    @Put('column/move')
    moveColumn(@Body() body: MoveColumnForm) {
        return this.boardService.moveColumn(body);
    }

}
