import { useEffect, useState } from 'react';
import { Photo } from './Photo';
import type { Image, ImageFetcher } from '../services/imageFetcher';

function chunkIntoColumns<T>(arr: T[], colCount: number): T[][] {
  const cols = Array.from({ length: colCount }, () => [] as T[]);
  arr.forEach((item, i) => {
    if (cols[i % colCount] !== undefined) {
      cols[i % colCount].push(item);
    }
  });
  return cols;
}

export function Gallery({
  fetcher,
  subject,
  photoCount = 20,
  colCount = 4
}: {
  fetcher: ImageFetcher;
  subject: string;
  photoCount?: number;
  colCount?: number;
}) {
  const [galleries, setGalleries] = useState<Image[]>([]);
  const colCalc = `calc(100%/${colCount})`;
  const galleryRows = chunkIntoColumns(galleries, colCount);

  useEffect(() => {
    fetcher.fetchImages(subject, photoCount).then(setGalleries);
  }, [fetcher, subject, photoCount]);

  return (
    <div className="flex flex-wrap">
      {galleryRows.map((row, rowIndex) => (
        <div key={rowIndex} className="p-0.5" style={{ flex: colCalc, maxWidth: colCalc }}>
          {row.map(gallery => (
            <Photo
              key={gallery.id}
              image_alt={gallery.alt}
              image_url={gallery.url}
              image_classNames="align-middle w-full h-auto mt-1"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
