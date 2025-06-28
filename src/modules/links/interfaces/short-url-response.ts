export interface IUrlResponse extends IShortUrlResponse, IOriginalUrlResponse {}

export interface IOriginalUrlResponse {
  originalUrl: string;
}

export interface IShortUrlResponse {
  shortUrl?: string;
  accessCount?: number;
}