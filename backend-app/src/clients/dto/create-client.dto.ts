import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
export class CreateClientDto {
  @ApiProperty()
  @MaxLength(40, { message: 'O nome deve ter no máximo 40 caracteres' })
  @IsString({ message: 'O name deve ser uma string' })
  @IsNotEmpty({ message: 'O name é obrigatório' })
  nome: string;

  @ApiProperty()
  @MaxLength(14, { message: 'O cnpj deve ter no máximo 14 caracteres' })
  @IsNumber()
  @IsNotEmpty({ message: 'O cnpj é obrigatório' })
  cnpj: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty({ message: 'A data do contrato é obrigatório' })
  dataContrato: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'O valor do contrato é obrigatório' })
  valorContrato: number;

  @ApiProperty({
    type: 'array',
    items: {
      example: 'Em Atraso, Dentro do Prazo, Pago, Cancelados',
    },
  })
  @IsArray()
  situacaoContrato: string;
}
