import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { LinkRepository } from './repositories/link.repository';
import PrismaLinkRepository from './repositories/prisma-link.repository';

@Module({
  imports: [],
  controllers: [LinkController],
  providers: [
    LinkService, { provide: LinkRepository, useClass: PrismaLinkRepository },
  ],
  exports: [LinkService],
})
export class LinkModule {}
