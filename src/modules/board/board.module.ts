import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from 'src/schemas/board.schema';
import { BoardController } from 'src/controllers/board/board.controller';
import { BoardService } from 'src/services/board/board.service';
import { UserModuleModule } from '../user/user.module';
import { Row, RowSchema } from 'src/schemas/row.schema';
import { Column, ColumnSchema } from 'src/schemas/column.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
        MongooseModule.forFeature([{ name: Row.name, schema: RowSchema }]),
        MongooseModule.forFeature([{ name: Column.name, schema: ColumnSchema }]),
        UserModuleModule,
    ],
    controllers: [BoardController],
    providers: [BoardService],
})
export class BoardModule {}
