import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {

  @Prop({ type: String })
  imgUrl: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
