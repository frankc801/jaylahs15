import { Hero } from "@/components/invitation/Hero";
import { Countdown } from "@/components/invitation/Countdown";
import { InvitationMessage } from "@/components/invitation/InvitationMessage";
import { Ceremony } from "@/components/invitation/Ceremony";
import { Reception } from "@/components/invitation/Reception";
import { DressCode } from "@/components/invitation/DressCode";
import { Rsvp } from "@/components/invitation/Rsvp";
import { Gifts } from "@/components/invitation/Gifts";
import { Gallery } from "@/components/invitation/Gallery";
import { Footer } from "@/components/invitation/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Countdown />
      <InvitationMessage />
      <Ceremony />
      <Reception />
      <DressCode />
      <Rsvp />
      <Gifts />
      <Gallery />
      <Footer />
    </main>
  );
}
