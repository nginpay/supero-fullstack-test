import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Status } from './status.enum';

@Schema({
  collection: 'client',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Client {
  @Expose()
  @ApiProperty()
  @Prop({ type: String, maxlength: 40 })
  nome: string;

  @Expose()
  @ApiProperty()
  @Prop({ type: String, maxlength: 14 })
  cnpj: string;

  @Expose()
  @ApiProperty()
  @Prop({ type: Date })
  dataContrato: Date;

  @Expose()
  @ApiProperty()
  @Prop({ type: Number })
  valorContrato: number;

  @Prop({ type: Array })
  situacaoContrato: Array<Status>;
}

export type ClientDocument = Document & Client;
export const ClientSchema = SchemaFactory.createForClass(Client);
