import type { ImageFetcher } from '../services/imageFetcher';
import { ArticFetcher } from './api/artic';
import { CmaFetcher } from './api/cma';
import { MetFetcher } from './api/met';

export interface OpenMuseumApi {
    fetcher: ImageFetcher;
    value: string;
    label: string;
}

export const museumOptions: Record<string, OpenMuseumApi> = {
    artic: {
        fetcher: ArticFetcher,
        value: 'artic',
        label: 'Art Institute of Chicago',
    },
    met: {
        fetcher: MetFetcher,
        value: 'met',
        label: 'The Metropolitan Museum of Art Collection',
    },
    cma: {
        fetcher: CmaFetcher,
        value: 'cma',
        label: 'The Cleveland Museum of Art Open Access',
    },
};
