import { ContactSection } from "@/components/home/ContactSection";

export const metadata = {
  title: "Academic Collaboration & Inquiries | Dr. Josephine Selle Jeyanathan",
  description:
    "Direct academic contact coordinates, institutional affiliation at Kalasalingam Academy of Research and Education, and research collaboration inquiry form.",
};

export default function ContactPage() {
  return (
    <div className="w-full py-6">
      <ContactSection />
    </div>
  );
}
