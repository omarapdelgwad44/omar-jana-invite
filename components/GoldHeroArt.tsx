import Image from "next/image";

const PETALS = [
  { left: "8%", delay: "0s", duration: "18s", size: 10 },
  { left: "16%", delay: "2.2s", duration: "21s", size: 7 },
  { left: "24%", delay: "5s", duration: "16s", size: 12 },
  { left: "33%", delay: "1.1s", duration: "22s", size: 8 },
  { left: "41%", delay: "7.4s", duration: "19s", size: 11 },
  { left: "52%", delay: "3.6s", duration: "17s", size: 6 },
  { left: "61%", delay: "8.8s", duration: "20s", size: 9 },
  { left: "70%", delay: "0.8s", duration: "23s", size: 13 },
  { left: "78%", delay: "4.5s", duration: "18s", size: 7 },
  { left: "86%", delay: "6.2s", duration: "21s", size: 10 },
  { left: "12%", delay: "11s", duration: "19s", size: 8 },
  { left: "92%", delay: "9.4s", duration: "16s", size: 11 },
] as const;

export function GoldHeroArt() {
  return (
    <div className="gold-art" aria-hidden="true">
      <div className="gold-art__ken">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/invite/swan-arch-hero.png`}
          alt=""
          fill
          preload
          sizes="100vw"
          className="gold-art__photo"
        />
      </div>
      <div className="gold-art__petals">
        {PETALS.map((petal, index) => (
          <span
            key={index}
            className="gold-petal"
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
              width: petal.size,
              height: petal.size * 1.4,
            }}
          />
        ))}
      </div>
    </div>
  );
}
