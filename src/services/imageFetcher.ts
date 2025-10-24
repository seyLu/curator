export interface Image {
  id: string;
  url: string;
  alt: string;
}

export interface ImageFetcher {
  fetchImages(query: string, count: number): Promise<Image[]>;
}
