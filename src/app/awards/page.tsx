import { redirect } from "next/navigation";

export default function AwardsRedirect() {
  redirect("/about#achievements");
}
