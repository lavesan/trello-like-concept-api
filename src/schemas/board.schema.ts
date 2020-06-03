import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Row } from './row.schema';
import { User } from './user.schema';

@Schema()
export class Board extends Document {

  @Prop({ required: true, type: String })
  name: string;

  @Prop([User])
  users: User[];

  @Prop([Row])
  rows: Row[];

  @Prop({ type: [String] })
  tags: string[];

}

export const BoardSchema = SchemaFactory.createForClass(Board);
