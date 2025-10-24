import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Filter({
  subject,
  photoCount,
  colCount,
  setSubject,
  setPhotoCount,
  setColCount
}: {
  subject: string;
  photoCount: number;
  colCount: number;
  setSubject: React.Dispatch<React.SetStateAction<string>>;
  setPhotoCount: React.Dispatch<React.SetStateAction<number>>;
  setColCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  function enforceMinMax(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value != '') {
      if (parseInt(e.target.value) < parseInt(e.target.min)) {
        e.target.value = e.target.min;
      }
      if (parseInt(e.target.value) > parseInt(e.target.max)) {
        e.target.value = e.target.max;
      }
    } else {
      e.target.value = e.target.min;
    }
  }

  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-1">
      <div className="w-full sm:w-1/3 flex flex-col gap-1">
        <Label htmlFor="subject">Subject</Label>
        <Input
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSubject(e.target.value);
          }}
          value={subject}
          id="subject"
          type="text"
          name="subject"
        />
      </div>
      <div className="w-full sm:w-1/3 flex flex-col gap-1">
        <Label htmlFor="photo-count">Number of Photos</Label>
        <Input
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            enforceMinMax(e);
            setPhotoCount(Number(e.target.value));
          }}
          value={photoCount}
          id="photo-count"
          type="number"
          inputMode="numeric"
          min={1}
          max={100}
          name="photo-count"
        />
      </div>
      <div className="w-full sm:w-1/3 not-even:flex flex-col gap-1">
        <Label htmlFor="col-count">Number of Columns</Label>
        <Input
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            enforceMinMax(e);
            setColCount(Number(e.target.value));
          }}
          value={colCount}
          id="col-count"
          type="number"
          inputMode="numeric"
          min={1}
          max={20}
          name="col-count"
        />
      </div>
    </div>
  );
}
