import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GitHub Repo Explorer" },
    { name: "description", content: "Welcome to GitHub Repo Explorer demo!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
