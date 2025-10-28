import type { Image, ImageFetcher } from "../../services/imageFetcher";

interface ArtworkImagesWeb {
  url: string;
}

interface ArtworkImages {
  web: ArtworkImagesWeb;
}

interface Artwork {
  id: string;
  title: string;
  images: ArtworkImages;
}

export const CmaFetcher: ImageFetcher = {
  async *fetchImages(
    query: string,
    count: number,
  ): AsyncGenerator<Image, void, unknown> {
    const galleryAPI = "https://openaccess-api.clevelandart.org/api/artworks";
    const fields = ["id", "title", "images"].join(",");

    const params = new URLSearchParams({
      ...(query.trim() && { q: query }),
      fields: fields,
      has_image: "1",
      limit: count.toString(),
    });

    const url = `${galleryAPI}?${params}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`status: ${res.status}`);
      }
      const json = await res.json();
      const galleries: Artwork[] = json.data;
      for (const gallery of galleries) {
        yield {
          id: gallery.id,
          url: gallery.images.web.url,
          alt: gallery.title,
        };
      }
    } catch (error) {
      console.error(`Error fetching 'cma' gallery: ${error}`);
    }
  },
};
