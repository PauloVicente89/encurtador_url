import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Links } from 'generated/prisma';
import { CreateShortUrlDto } from './dtos/create-short-url.dto';
import { UpdateLinkDto } from './dtos/update-link.dto';
import { IFindLinksByUserParams } from './interfaces/findall-by-users';
import { IOriginalUrlResponse, IShortUrlResponse } from './interfaces/short-url-response';
import { LinkRepository } from './repositories/link.repository';

@Injectable()
export class LinkService {
  constructor(
    private readonly linkRepository: LinkRepository,
  ) {}

  async create(data: CreateShortUrlDto, userId?: string): Promise<Links> {
    const link = {
      ...data,
      userId: userId ? userId : null,
      code: this.generateRandomCode(6),
    }
    while(await this.isCodeDuplicate(link.code)) {
      link.code = this.generateRandomCode(6);
    }
    return await this.linkRepository.create(link);
  }

  async findAllByUser(data: IFindLinksByUserParams): Promise<Partial<Links>[]> {
    const links = await this.linkRepository.findAllByUser({
      pagination: data.pagination,
      userId: data.userId,
    });
    return links.map((link: Links) => ({
      id: link.id,
      accessCount: link.accessCount,
      shortUrl: this.formatShortUrl(link.code),
    }));
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
    return { shortUrl: this.formatShortUrl(link.code) };
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

  private formatShortUrl(code: string): string {
    const domain = process.env.DOMAIN;
    return `${domain}links/${code}`;
  }

  private generateRandomCode(len: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < len; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
  }
}
