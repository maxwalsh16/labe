type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header className="max-w-2xl">
      {eyebrow && <p className="font-semibold text-blue-600">{eyebrow}</p>}
      <h2 className="mt-2 text-4xl font-bold tracking-tight">{title}</h2>
      {description && <p className="mt-4 text-lg text-black/60">{description}</p>}
    </header>
  );
}
