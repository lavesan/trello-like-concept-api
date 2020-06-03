import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Column } from './column.schema';

@Schema()
export class Row extends Document {

  @Prop({ required: true, type: String })
  name: string;

  @Prop([Column])
  columns: Column[];

}

export const RowSchema = SchemaFactory.createForClass(Row);
