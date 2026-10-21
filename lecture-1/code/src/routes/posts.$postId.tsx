import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPost, fetchComments, likePost, deletePost } from "@/api/posts";

export const Route = createFileRoute("/posts/$postId")({
  loader: async ({ params, context }) => {
    const id = Number(params.postId);
    await context.queryClient.ensureQueryData({
      queryKey: ["post", id],
      queryFn: () => fetchPost(id),
    });
    await context.queryClient.ensureQueryData({
      queryKey: ["comments", id],
      queryFn: () => fetchComments(id),
    });
  },
  component: PostDetailPage,
});

function PostDetailPage() {
  const { postId } = Route.useParams();
  const id = Number(postId);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const postQuery = useQuery({ queryKey: ["post", id], queryFn: () => fetchPost(id) });
  const commentsQuery = useQuery({ queryKey: ["comments", id], queryFn: () => fetchComments(id) });

  const likeMutation = useMutation({
    mutationFn: () => likePost(id),
    onSuccess: (updated) => queryClient.setQueryData(["post", id], updated),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["posts"] });
      void navigate({ to: "/" });
    },
  });

  if (postQuery.isLoading) return <p>Загрузка поста…</p>;
  if (postQuery.isError)
    return <p style={{ color: "crimson" }}>Ошибка: {(postQuery.error as Error).message}</p>;

  const post = postQuery.data!;

  return (
    <article>
      <Link to="/" style={{ display: "inline-block", marginBottom: 12 }}>
        ← Назад
      </Link>
      <h2>{post.title}</h2>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        {new Date(post.createdAt).toLocaleString("ru-RU")} · ❤ {post.likes}
      </p>
      <p style={{ lineHeight: 1.6 }}>{post.body}</p>

      <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        <button onClick={() => likeMutation.mutate()} disabled={likeMutation.isPending}>
          Лайк {likeMutation.isPending ? "…" : ""}
        </button>
        <button
          onClick={() => deleteMutation.mutate()}
          disabled={deleteMutation.isPending}
          style={{ color: "crimson" }}
        >
          Удалить пост
        </button>
      </div>

      <h3>Комментарии</h3>
      {commentsQuery.isLoading && <p>Загрузка комментариев…</p>}
      {commentsQuery.isError && (
        <p style={{ color: "crimson" }}>Не удалось загрузить комментарии</p>
      )}
      <ul style={{ paddingLeft: 20 }}>
        {(commentsQuery.data ?? []).map((c) => (
          <li key={c.id} style={{ marginBottom: 8 }}>
            <strong>{c.author}:</strong> {c.text}
          </li>
        ))}
        {commentsQuery.data?.length === 0 && (
          <li style={{ color: "#9ca3af" }}>Комментариев пока нет</li>
        )}
      </ul>
    </article>
  );
}
