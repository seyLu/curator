import type { Image, ImageFetcher } from '../../services/imageFetcher';

interface Artwork {
    id: string;
    title: string;
    image_id: string;
    image_url: string;
}

export const ArticFetcher: ImageFetcher = {
    async *fetchImages(
        query: string,
        count: number,
    ): AsyncGenerator<Image, void, unknown> {
        const galleryAPI = 'https://api.artic.edu/api/v1/artworks';
        const imageAPI = 'https://www.artic.edu/iiif/2';
        const fields = ['id', 'title', 'image_id'].join(',');

        const baseUrl = query.trim() ? `${galleryAPI}/search` : galleryAPI;

        const params = new URLSearchParams({
            ...(query.trim() && { q: query }),
            fields: fields,
            page: '1',
            limit: count.toString(),
        });

        const url = `${baseUrl}?${params}`;

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
            for (const gallery of galleries) {
                yield {
                    id: gallery.id,
                    url: gallery.image_url,
                    alt: gallery.title,
                };
            }
        } catch (error) {
            console.error(`Error fetching 'artic' gallery: ${error}`);
        }
    },
};
