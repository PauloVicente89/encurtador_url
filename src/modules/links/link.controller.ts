import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/core/decorators/public-route.decorator';
import { CreateLinkDto } from './dtos/create-link.dto';
import { LinkService } from './link.service';

@Controller('links')
export class LinkController {
  constructor(
    private readonly linkService: LinkService,
  ) {}

  @Public()
  @Post()
  async create(
    @Body() body: CreateLinkDto,
    @Req() req: Request,
  ): Promise<{ shortUrl: string }> {
    const userId = req.user ? req.user['sub'] : null;
    const link = await this.linkService.create(body, userId);
    return { shortUrl: `${process.env.DOMAIN}${link.code}` };
  }

  @Delete(':id')
  async softDelete(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<void> {
    const userId = req.user ? req.user['sub'] : null;
    await this.linkService.softDelete(id, userId);
  }

}
