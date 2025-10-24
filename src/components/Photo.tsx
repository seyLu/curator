export function Photo({
  image_url,
  image_alt,
  image_classNames = 'w-full'
}: {
  image_url: string;
  image_alt: string;
  image_classNames?: string;
}) {
  return <img src={image_url} alt={image_alt} className={image_classNames}></img>;
}
