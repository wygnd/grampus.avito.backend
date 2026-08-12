import { AvitoAccountDTO } from '@modules/avito/dtos';
import { Injectable } from '@nestjs/common';
import { Query } from '@nestjs/cqrs';

@Injectable()
export class AvitoAccountClientIdQuery extends Query<AvitoAccountDTO | null> {
  constructor(public readonly clientId: string) {
    super();
  }
}
