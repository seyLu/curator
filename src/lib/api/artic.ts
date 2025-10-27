import type { Image, ImageFetcher } from "../../services/imageFetcher";

export interface Artwork {
  id: string;
  title: string;
  image_id: string;
  image_url: string;
}

export const ArticFetcher: ImageFetcher = {
  async fetchImages(query: string, count: number): Promise<Image[]> {
    const galleryAPI = "https://api.artic.edu/api/v1/artworks";
    const imageAPI = "https://www.artic.edu/iiif/2/";
    const fields = ["id", "title", "image_id"].join(",");

    let url = "";
    if (query.trim() !== "") {
      url = `${galleryAPI}/search?q=${query}&fields=${fields}`;
    } else {
      url = `${galleryAPI}?fields=${fields}`;
    }
    url = `${url}&page=1&limit=${count}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`status: ${res.status}`);
      }
      const json = await res.json();
      const galleries: Artwork[] = json.data;
      for (const gallery of galleries) {
        gallery.image_url = `${imageAPI}/${gallery.image_id}/full/843,/0/default.jpg`;
      }
      return galleries.map((gallery) => ({
        id: gallery.id,
        url: gallery.image_url,
        alt: gallery.title,
      }));
    } catch (error) {
      console.error(`Error fetching 'artic' gallery: ${error}`);
      return [];
    }
  },
};
