import { NumberInput, TextInput, Select } from "@mantine/core";
import type { OpenMuseumApi } from "../lib";
import { museumOptions } from "../lib";

export function Filter({
    openMuseumApi,
    setOpenMuseumApi,
    subject,
    photoCount,
    colCount,
    setSubject,
    setPhotoCount,
    setColCount,
}: {
    openMuseumApi: OpenMuseumApi;
    subject: string;
    photoCount: number;
    colCount: number;
    setOpenMuseumApi: React.Dispatch<React.SetStateAction<OpenMuseumApi>>;
    setSubject: React.Dispatch<React.SetStateAction<string>>;
    setPhotoCount: React.Dispatch<React.SetStateAction<number>>;
    setColCount: React.Dispatch<React.SetStateAction<number>>;
}) {
    return (
        <>
            <div className="flex flex-wrap sm:flex-nowrap gap-3">
                <div className="w-full flex flex-col gap-1">
                    <Select
                        label="Open Museum API"
                        name="open-museum-api"
                        placeholder="Pick an open museum API"
                        data={Object.values(museumOptions)}
                        value={openMuseumApi.value}
                        onChange={(value) =>
                            value && setOpenMuseumApi(museumOptions[value])
                        }
                        autoSelectOnBlur
                        searchable
                    />
                </div>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-3">
                <div className="w-full sm:w-1/3 flex flex-col gap-1">
                    <TextInput
                        label="Subject"
                        name="subject"
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSubject(e.target.value);
                        }}
                        value={subject}
                        id="subject"
                        type="text"
                    />
                </div>
                <div className="w-full sm:w-1/3 flex flex-col gap-1">
                    <NumberInput
                        label="Number of Photos"
                        name="photo-count"
                        onChange={(value) => setPhotoCount(Number(value))}
                        value={photoCount}
                        id="photo-count"
                        min={1}
                        max={100}
                        clampBehavior="strict"
                        allowNegative={false}
                        allowDecimal={false}
                        stepHoldDelay={500}
                        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                    />
                </div>
                <div className="w-full sm:w-1/3 not-even:flex flex-col gap-1">
                    <NumberInput
                        label="Number of Columns"
                        name="col-count"
                        onChange={(value) => setColCount(Number(value))}
                        value={colCount}
                        id="col-count"
                        min={1}
                        max={20}
                        clampBehavior="strict"
                        allowNegative={false}
                        allowDecimal={false}
                        stepHoldDelay={500}
                        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                    />
                </div>
            </div>
        </>
    );
}
