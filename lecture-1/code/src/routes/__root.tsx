import { createRootRouteWithContext, Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div
      style={{ fontFamily: "system-ui, sans-serif", padding: 24, maxWidth: 900, margin: "0 auto" }}
    >
      <h1 style={{ marginBottom: 4 }}>TanStack Query — демо</h1>
      <p style={{ color: "#6b7280", marginTop: 0, marginBottom: 16 }}>
        Фичи: useQuery, useInfiniteQuery, useMutation, optimistic updates, prefetch, invalidate,
        dependent queries
      </p>
      <nav style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <Link to="/">Список постов</Link>
        <Link to="/new">Создать пост</Link>
      </nav>
      <Outlet />
      {import.meta.env.DEV && (
        <>
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      )}
    </div>
  ),
});
