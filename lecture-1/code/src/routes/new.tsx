import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/posts";
import { useState } from "react";

export const Route = createFileRoute("/new")({
  component: NewPostPage,
});

function NewPostPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const mutation = useMutation({
    mutationFn: () => createPost({ title: title.trim(), body: body.trim() }),
    onSuccess: (post) => {
      void queryClient.invalidateQueries({ queryKey: ["posts"] });
      void navigate({ to: "/posts/$postId", params: { postId: String(post.id) } });
    },
  });

  const canSubmit = title.trim().length > 0 && body.trim().length > 0 && !mutation.isPending;

  return (
    <section style={{ maxWidth: 600 }}>
      <h2>Новый пост</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) mutation.mutate();
        }}
        style={{ display: "grid", gap: 12 }}
      >
        <input
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 8 }}
        />
        <textarea
          placeholder="Текст поста"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          style={{ padding: 8 }}
        />
        <button type="submit" disabled={!canSubmit}>
          {mutation.isPending ? "Создание…" : "Создать"}
        </button>
      </form>
      {mutation.isError && (
        <p style={{ color: "crimson" }}>Ошибка: {(mutation.error as Error).message}</p>
      )}
      {mutation.isSuccess && <p style={{ color: "green" }}>Пост создан!</p>}
    </section>
  );
}
