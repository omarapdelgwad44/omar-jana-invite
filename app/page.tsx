import { InvitationExperience } from "@/components/InvitationExperience";
import { StaticInvitation } from "@/components/StaticInvitation";

export default function Home() {
  return (
    <>
      <noscript>
        <StaticInvitation />
      </noscript>
      <InvitationExperience />
    </>
  );
}
