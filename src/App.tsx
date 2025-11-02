import { useDebouncedValue } from '@mantine/hooks';
import { useState } from 'react';
import { Filter } from './components/Filter';
import { Gallery } from './components/Gallery';
import { museumOptions } from './lib';
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Footer } from './components/Footer';
import type { OpenMuseumApi } from './lib';

function App() {
    const debouncems: number = 300;

    const [subject, setSubject] = useState<string>('cat');
    const [debouncedSubject] = useDebouncedValue(subject, debouncems);

    const [photoCount, setPhotoCount] = useState<number>(10);
    const [debouncedPhotoCount] = useDebouncedValue(photoCount, debouncems);

    const [colCount, setColCount] = useState<number>(3);

    const [openMuseumApi, setOpenMuseumApi] = useState<OpenMuseumApi>(
        museumOptions.artic,
    );

    return (
        <MantineProvider>
            <div className="mx-auto container p-3 max-w-2xl min-h-screen flex flex-col gap-3">
                <Filter
                    openMuseumApi={openMuseumApi}
                    setOpenMuseumApi={setOpenMuseumApi}
                    subject={subject}
                    photoCount={photoCount}
                    colCount={colCount}
                    setSubject={setSubject}
                    setPhotoCount={setPhotoCount}
                    setColCount={setColCount}
                />
                <div className="grow">
                    <Gallery
                        fetcher={openMuseumApi.fetcher}
                        subject={debouncedSubject}
                        photoCount={debouncedPhotoCount}
                        colCount={colCount}
                    />
                </div>
                <Footer />
            </div>
        </MantineProvider>
    );
}

export default App;
