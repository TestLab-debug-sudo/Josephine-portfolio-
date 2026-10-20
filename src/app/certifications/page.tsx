import { redirect } from "next/navigation";

export default function CertificationsRedirect() {
  redirect("/about#achievements");
}
