import { Gallery } from './components/Gallery';
import { Filter } from './components/Filter';
import { useState } from 'react';
import { ArticFetcher } from './api/artic';

function App() {
  const [subject, setSubject] = useState<string>('cat');
  const [photoCount, setPhotoCount] = useState<number>(10);
  const [colCount, setColCount] = useState<number>(3);

  return (
    <>
      <div className="p-3 mx-auto container flex flex-col gap-3">
        <Filter
          subject={subject}
          photoCount={photoCount}
          colCount={colCount}
          setSubject={setSubject}
          setPhotoCount={setPhotoCount}
          setColCount={setColCount}
        />
        <Gallery
          fetcher={ArticFetcher}
          subject={subject}
          photoCount={photoCount}
          colCount={colCount}
        />
      </div>
    </>
  );
}

export default App;
