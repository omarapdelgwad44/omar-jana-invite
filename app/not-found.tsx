import Link from "next/link";
import { COUPLE } from "@/lib/constants";

export default function NotFound() {
  return (
    <main className="fallback-invite">
      <h1>
        {COUPLE.first} و {COUPLE.second}
      </h1>
      <p>هذه الصفحة ليست جزءًا من الدعوة.</p>
      <Link href="/" className="maps-btn">
        العودة إلى الدعوة
      </Link>
    </main>
  );
}
