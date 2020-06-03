import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { User } from './user.schema';

@Schema()
export class Column extends Document {

    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: Number })
    position: number;

    @Prop([User])
    users: User[];

    @Prop({ type: [String] })
    tags: string[];

}

export const ColumnSchema = SchemaFactory.createForClass(Column);
