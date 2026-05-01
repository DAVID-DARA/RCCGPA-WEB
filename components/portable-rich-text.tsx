import { PortableText } from "@portabletext/react";

type PortableRichTextProps = { value: unknown };

export function PortableRichText({ value }: PortableRichTextProps) {
  if (!value) return null;

  return (
    <div className="prose max-w-none prose-p:leading-relaxed prose-headings:text-[#111111] prose-p:text-[#333333]">
      <PortableText value={value as any} />
    </div>
  );
}
