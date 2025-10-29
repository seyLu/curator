import { useEffect, useState } from "react";
import { Photo } from "./Photo";
import type { Image, ImageFetcher } from "../services/imageFetcher";
import { Loader } from "@mantine/core";

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

                    setImages((prev) => [...prev, img]);
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

            {galleryRows.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    className="p-0.5"
                    style={{ flex: colCalc, maxWidth: colCalc }}
                >
                    {row.map((image, index) => (
                        <Photo
                            key={index}
                            image_alt={image.alt}
                            image_url={image.url}
                            image_classNames="align-middle w-full h-auto mt-1"
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
