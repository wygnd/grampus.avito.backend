import { ApiProperty } from '@nestjs/swagger';
import { APP_LIMIT_ITEMS } from '@shared/constants';
import { IPagination } from '@shared/interfaces';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationRequestDTO implements Partial<IPagination> {
  @ApiProperty({
    type: Number,
    description: 'Номер страницы',
    required: false,
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiProperty({
    type: Number,
    description: 'Количество записей на странице',
    required: false,
    default: APP_LIMIT_ITEMS,
    minimum: 1,
    maximum: APP_LIMIT_ITEMS,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(APP_LIMIT_ITEMS)
  limit: number = APP_LIMIT_ITEMS;
}
