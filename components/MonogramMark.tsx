/** ع ج monogram mark from the chosen calligraphic seal. */
export function MonogramMark({ className }: { className?: string }) {
  const src = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/invite/monogram.png`;

  return (
    <span
      className={className}
      role="img"
      aria-label="ع ج"
      style={{
        backgroundColor: "currentColor",
        WebkitMaskImage: `url("${src}")`,
        maskImage: `url("${src}")`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
