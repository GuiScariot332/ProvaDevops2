import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({ example: 'Distribuidora Alfa Ltda' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  company_name: string;

  @ApiProperty({
    example: '12345678000195',
    description: 'CNPJ com 14 dígitos (a máscara é aceita e removida automaticamente)',
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/\D/g, '') : value,
  )
  @Matches(/^\d{14}$/, { message: 'cnpj deve conter 14 dígitos' })
  cnpj: string;

  @ApiProperty({ example: 'Maria Souza' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  contact_name: string;

  @ApiProperty({ example: 'maria@alfa.com.br' })
  @IsEmail()
  @MaxLength(150)
  contact_email: string;
}
