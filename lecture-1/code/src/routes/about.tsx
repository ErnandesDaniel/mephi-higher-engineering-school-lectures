import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: () => <p>Стартовый проект: Vite+, TanStack Router, Oxlint/Oxfmt.</p>,
});
