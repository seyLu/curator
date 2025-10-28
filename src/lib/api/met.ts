import type { Image, ImageFetcher } from "../../services/imageFetcher";

interface Collection {
  objectIDs: number[];
}

interface Artwork {
  objectID: number;
  primaryImageSmall: string;
  title: string;
}

export const MetFetcher: ImageFetcher = {
  async *fetchImages(
    query: string,
    count: number,
  ): AsyncGenerator<Image, void, unknown> {
    const galleryAPI = "https://collectionapi.metmuseum.org/public/collection/v1";

    const baseUrl = query.trim() ? `${galleryAPI}/search` : galleryAPI;

    const params = new URLSearchParams({
      ...(query.trim() && { q: query }),
      hasImage: "true",
    });

    const url = `${baseUrl}?${params}`;

    let objectIDs: number[] = [];
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`status: ${res.status}`);
      }
      const collection: Collection = await res.json();
      objectIDs = collection.objectIDs.splice(0, count);
    } catch (error) {
      console.error(`Error fetching 'met' gallery: ${error}`);
      return;
    }

    for (const objectID of objectIDs) {
      try {
        const res = await fetch(`${galleryAPI}/objects/${objectID}`);
        if (!res.ok) {
          throw new Error(`status: ${res.status}`);
        }
        const artwork: Artwork = await res.json();
        yield {
          id: artwork.objectID.toString(),
          url: artwork.primaryImageSmall,
          alt: artwork.title,
        };
      } catch (error) {
        console.error(`Error fetching artwork ${objectID}: ${error}`);
      }
    }
  },
};
