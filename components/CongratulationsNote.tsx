"use client";

import { useMemo, useState } from "react";
import { COPY, WHATSAPP_DEFAULT_TEXT, whatsappShareUrl } from "@/lib/constants";

export function CongratulationsNote() {
  const [note, setNote] = useState(WHATSAPP_DEFAULT_TEXT);
  const href = useMemo(() => whatsappShareUrl(note), [note]);

  return (
    <div className="bless">
      <p className="sheet__body">{COPY.blessingBody.ar}</p>
      <label className="bless__field">
        <span>{COPY.blessingLabel.ar}</span>
        <textarea
          name="blessing"
          rows={5}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder={COPY.blessingPlaceholder.ar}
        />
      </label>
      <a className="maps-btn bless__send" href={href} target="_blank" rel="noreferrer">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12.04 2c-5.46 0-9.9 4.43-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.27-1.38c1.45.79 3.08 1.21 4.77 1.21 5.46 0 9.9-4.43 9.9-9.9S17.5 2 12.04 2zm5.79 14.13c-.24.68-1.4 1.3-1.94 1.34-.5.04-1.12.06-1.81-.11-.42-.11-.96-.31-1.66-.61-2.92-1.26-4.82-4.2-4.97-4.39-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1.01-2.41.24-.26.64-.38 1.02-.38.12 0 .23 0 .33.01.3.01.44.03.64.5.24.58.83 2.02.9 2.17.07.15.12.32.02.52-.09.2-.14.32-.28.5-.14.17-.29.38-.41.51-.14.14-.28.3-.12.58.16.29.7 1.16 1.5 1.88 1.04.93 1.91 1.22 2.2 1.36.28.13.45.11.62-.07.16-.17.7-.82.89-1.1.19-.28.37-.23.63-.14.26.09 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.68-.17 1.36z"
          />
        </svg>
        {COPY.sendBlessing.ar}
      </a>
      <p className="bless__hint">{COPY.blessingHint.ar}</p>
    </div>
  );
}
