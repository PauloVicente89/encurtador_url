import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from './core/decorators/public-route.decorator';
import { LinkService } from './modules/links/link.service';

@ApiTags('General purpose controller')
@Controller()
export class AppController {
  constructor(
    private readonly linkService: LinkService,
  ) {}

  @ApiResponse({
    status: 404,
    description: 'Link not found.',
  })
  @ApiResponse({
    status: 302,
    description: 'Redirects to the original URL.',
  })
  @Public()
  @Get(':code')
  async redirectToOriginalUrl(
    @Param('code') code: string,
    @Res() res: Response,
  ): Promise<void> {
    const { originalUrl } = await this.linkService.redirectToOriginalUrl(code);
    return res.redirect(302, originalUrl);
  }
}
