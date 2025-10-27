import { ArticFetcher } from "./api/artic";
import { MetFetcher } from "./api/met";
import type { ImageFetcher } from "../services/imageFetcher";

export interface OpenMuseumApi {
  fetcher: ImageFetcher;
  value: string;
  label: string;
}

export const museumOptions: Record<string, OpenMuseumApi> = {
  artic: {
    fetcher: ArticFetcher,
    value: "artic",
    label: "Art Institute of Chicago API",
  },
  met: {
    fetcher: MetFetcher,
    value: "met",
    label: "The Metropolitan Museum of Art Collection API",
  },
};
