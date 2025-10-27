import { Gallery } from "./components/Gallery";
import { Filter } from "./components/Filter";
import { useState } from "react";
import { openMuseumApis } from "./lib";
import type { OpenMuseumApi } from "./lib";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

function App() {
    const [subject, setSubject] = useState<string>("cat");
    const [photoCount, setPhotoCount] = useState<number>(10);
    const [colCount, setColCount] = useState<number>(3);
    const [openMuseumApi, setOpenMuseumApi] = useState<OpenMuseumApi>(
        openMuseumApis[0],
    );

    return (
        <MantineProvider>
            <div className="mx-auto container max-w-2xl p-3  flex flex-col gap-3">
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
                <Gallery
                    fetcher={openMuseumApi.fetcher}
                    subject={subject}
                    photoCount={photoCount}
                    colCount={colCount}
                />
            </div>
        </MantineProvider>
    );
}

export default App;
