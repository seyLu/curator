import { ArticFetcher } from "./api/artic";
import { MetFetcher } from "./api/met";
import type { ImageFetcher } from "../services/imageFetcher";

export interface OpenMuseumApi {
  fetcher: ImageFetcher;
  value: string;
  label: string;
}

export const openMuseumApis: OpenMuseumApi[] = [
  { fetcher: ArticFetcher, value: "artic", label: "Art Institute of Chicago API" },
  {
    fetcher: MetFetcher,
    value: "met",
    label: "The Metropolitan Museum of Art Collection API",
  },
];
