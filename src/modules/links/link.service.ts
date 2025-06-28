import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Links } from 'generated/prisma';
import { IFindAllParams } from 'src/utils/interfaces/findall-params';
import { generateRandomCode } from 'src/utils/random-code-generator';
import { CreateLinkDto } from './dtos/create-link.dto';
import { UpdateLinkDto } from './dtos/update-link.dto';
import { IOriginalUrlResponse, IShortUrlResponse } from './interfaces/short-url-response';
import { LinkRepository } from './repositories/link.repository';

@Injectable()
export class LinkService {
  constructor(
    private readonly linkRepository: LinkRepository,
  ) {}

  async create(data: CreateLinkDto, userId?: string): Promise<Links> {
    const link = {
      ...data,
      userId: userId ? userId : null,
      code: generateRandomCode(6),
    }
    while(await this.isCodeDuplicate(link.code)) {
      link.code = generateRandomCode(6);
    }
    return await this.linkRepository.create(link);
  }

  async findAll({ criteria, pagination, fields }: IFindAllParams): Promise<Partial<Links>[]> {
    return await this.linkRepository.findAll({ criteria, pagination, fields });
  }

  async redirectToOriginalUrl(code: string): Promise<IOriginalUrlResponse> {
    const link = await this.linkRepository.findBy({ code });
    if(!link || link.deletedAt) throw new NotFoundException("Link not found");
    await this.linkRepository.update(link.id, { accessCount: link.accessCount + 1 });
    return { originalUrl: link.originalUrl };
  }

  async update(id: string, data: UpdateLinkDto): Promise<Links> {
    return await this.linkRepository.update(id, data);
  }

  async updateOriginalUrl(id: string, originalUrl: string): Promise<IShortUrlResponse> {
    const link = await this.linkRepository.update(id, { originalUrl });
    return { shortUrl: `${process.env.DOMAIN}${link.code}` };
  }

  async softDelete(id: string, userId: string): Promise<void> {
    const link = await this.linkRepository.findBy({ id });
    if(!link || link.deletedAt) throw new NotFoundException("Link not found");
    if(link.userId !== userId) throw new ForbiddenException("You do not have permission to delete this link");
    await this.linkRepository.update(id, { deletedAt: new Date() });
  }

  private async isCodeDuplicate(code: string): Promise<boolean> {
    const existingProduct = await this.linkRepository.findBy({ code });
    return !!existingProduct;
  }
}
