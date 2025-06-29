export interface IUrlResponse extends IShortUrlResponse, IOriginalUrlResponse {}

export interface IOriginalUrlResponse {
  originalUrl: string;
}

export interface IShortUrlResponse {
  id?: string;
  shortUrl?: string;
  accessCount?: number;
}