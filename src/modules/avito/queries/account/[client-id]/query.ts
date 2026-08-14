import { AvitoAccountDTO } from '@modules/avito/dtos';
import { Injectable } from '@nestjs/common';
import { Query } from '@nestjs/cqrs';

@Injectable()
export class AvitoAccountGetByClientIdQuery extends Query<AvitoAccountDTO | null> {
  constructor(public readonly clientId: string) {
    super();
  }
}
