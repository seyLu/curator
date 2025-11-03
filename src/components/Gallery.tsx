import { Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import type { Image, ImageFetcher } from '../services/imageFetcher';
import { Photo } from './Photo';

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
    colCount = 4,
}: {
    fetcher: ImageFetcher;
    subject: string;
    photoCount?: number;
    colCount?: number;
}) {
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const colCalc = `calc(100%/${colCount})`;
    const galleryRows = chunkIntoColumns(images, colCount);

    useEffect(() => {
        let cancelled = false;
        setImages([]);
        setLoading(true);

        (async () => {
            const generator = fetcher.fetchImages(subject, photoCount);

            try {
                for await (const img of generator) {
                    if (cancelled) break;

                    const imgID = img.id || crypto.randomUUID();
                    setImages((prev) => [...prev, { ...img, id: imgID }]);
                    setLoading(false);
                }
            } catch (error) {
                console.error(`Error streaming images: ${error}`);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [fetcher, subject, photoCount]);

    return (
        <div className="flex flex-wrap relative">
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <Loader color="blue" />
                </div>
            )}

            {galleryRows
                .filter((row) => row.length > 0)
                .map((row) => {
                    const rowKey = row.map((img) => img.id).join('-');
                    return (
                        <div
                            key={rowKey}
                            className="p-0.5"
                            style={{ flex: colCalc, maxWidth: colCalc }}
                        >
                            {row.map((image) => (
                                <Photo
                                    key={image.id}
                                    image_alt={image.alt}
                                    image_url={image.url}
                                    image_classNames="align-middle w-full h-auto mt-1"
                                />
                            ))}
                        </div>
                    );
                })}
        </div>
    );
}
