import { AvitoItemService } from '@modules/avito/services';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { randomUUID } from 'node:crypto';

@ApiTags('Объявления')
@ApiParam({
  name: 'account_id',
  description: 'ID аккаунта в системе',
  required: true,
  example: randomUUID(),
})
@Controller({
  version: '1',
  path: 'accounts/:account_id/items',
})
export class AvitoItemControllerV1 {
  constructor(private readonly avitoItemService: AvitoItemService) {}

  @ApiOperation({ summary: 'Получить информацию по объявлению' })
  @ApiParam({
    name: 'item_id',
    description: 'ID объявления',
    required: true,
    example: randomUUID(),
  })
  @Get(':item_id')
  public async getItemById(
    @Param('account_id') accountId: string,
    @Param('item_id') itemId: string,
  ) {
    return this.avitoItemService.getItemById(accountId, itemId);
  }
}
