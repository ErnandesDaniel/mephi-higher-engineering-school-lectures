import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, fetchPost, likePost, type Post } from "@/api/posts";
import { z } from "zod";

const searchSchema = z.object({ q: z.string().optional().default("") });

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  component: PostsPage,
});

function PostsPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const queryClient = useQueryClient();

  const postsQuery = useInfiniteQuery({
    queryKey: ["posts", "infinite", q],
    queryFn: ({ pageParam }) => fetchPosts({ page: pageParam, pageSize: 6, search: q }),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.items.length < last.pageSize ? undefined : last.page + 1),
  });

  const likeMutation = useMutation({
    mutationFn: (id: number) => likePost(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previous = queryClient.getQueryData(["posts", "infinite", q]);
      queryClient.setQueryData(["posts", "infinite", q], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((p: any) => ({
            ...p,
            items: p.items.map((item: Post) =>
              item.id === id ? { ...item, likes: item.likes + 1 } : item,
            ),
          })),
        };
      });
      return { previous };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(["posts", "infinite", q], ctx.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const allPosts = postsQuery.data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <section>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          placeholder="Поиск по постам…"
          defaultValue={q}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              void navigate({ search: { q: (e.target as HTMLInputElement).value } });
          }}
          style={{ padding: 8, flex: 1, minWidth: 200 }}
        />
        <button onClick={() => navigate({ search: { q: "" } })}>Сбросить</button>
      </div>

      {postsQuery.isLoading && <p>Загрузка…</p>}
      {postsQuery.isError && (
        <p style={{ color: "crimson" }}>Ошибка: {(postsQuery.error as Error).message}</p>
      )}

      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
        {allPosts.map((post) => (
          <li
            key={post.id}
            onMouseEnter={() => {
              void queryClient.prefetchQuery({
                queryKey: ["post", post.id],
                queryFn: () => fetchPost(post.id),
              });
            }}
            style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}
          >
            <Link
              to="/posts/$postId"
              params={{ postId: String(post.id) }}
              style={{ fontWeight: 600, fontSize: 18 }}
            >
              {post.title}
            </Link>
            <p style={{ color: "#6b7280", margin: "4px 0" }}>{post.body.slice(0, 80)}…</p>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button
                onClick={() => likeMutation.mutate(post.id)}
                disabled={likeMutation.isPending}
              >
                ❤ {post.likes}
              </button>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>
                {new Date(post.createdAt).toLocaleDateString("ru-RU")}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <button
          onClick={() => postsQuery.fetchNextPage()}
          disabled={!postsQuery.hasNextPage || postsQuery.isFetchingNextPage}
        >
          {postsQuery.isFetchingNextPage
            ? "Загрузка…"
            : postsQuery.hasNextPage
              ? "Загрузить ещё"
              : "Больше нет"}
        </button>
        <button onClick={() => postsQuery.refetch()}>Обновить</button>
      </div>

      <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 12 }}>
        Всего: {postsQuery.data?.pages[0]?.total ?? 0} · страниц загружено:{" "}
        {postsQuery.data?.pages.length ?? 0}
      </p>
    </section>
  );
}
