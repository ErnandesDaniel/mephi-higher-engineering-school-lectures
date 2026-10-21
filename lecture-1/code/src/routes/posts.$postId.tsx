import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Space, Typography, List } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { fetchPost, fetchComments, deletePost } from "@/api/posts";

export const Route = createFileRoute("/posts/$postId")({
  loader: async ({ params, context }) => {
    const id = Number(params.postId);
    await context.queryClient.ensureQueryData({ queryKey: ["post", id], queryFn: () => fetchPost(id) });
    await context.queryClient.ensureQueryData({ queryKey: ["comments", id], queryFn: () => fetchComments(id) });
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

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["posts"] });
      void navigate({ to: "/" });
    },
  });

  if (postQuery.isLoading) return <Typography.Text>Загрузка поста…</Typography.Text>;
  if (postQuery.isError) return <Typography.Text type="danger">Ошибка: {(postQuery.error as Error).message}</Typography.Text>;

  const post = postQuery.data!;

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Link to="/">← Назад к списку</Link>
      <Card
        title={post.title}
        extra={
          <Space>
            <Link to="/editor" search={{ id: post.id }}>
              <Button icon={<EditOutlined />}>Редактировать</Button>
            </Link>
            <Button danger icon={<DeleteOutlined />} loading={deleteMutation.isPending} onClick={() => deleteMutation.mutate()}>
              Удалить
            </Button>
          </Space>
        }
      >
        <Typography.Paragraph style={{ whiteSpace: "pre-wrap" }}>{post.body}</Typography.Paragraph>
        <Typography.Text type="secondary">
          {new Date(post.createdAt).toLocaleString("ru-RU")}
        </Typography.Text>
      </Card>

      <Card title="Комментарии">
        {commentsQuery.isLoading && <Typography.Text>Загрузка комментариев…</Typography.Text>}
        {commentsQuery.isError && <Typography.Text type="danger">Не удалось загрузить комментарии</Typography.Text>}
        <List
          dataSource={commentsQuery.data ?? []}
          renderItem={(c) => (
            <List.Item>
              <Typography.Text strong>{c.author}: </Typography.Text>
              {c.text}
            </List.Item>
          )}
          locale={{ emptyText: "Комментариев пока нет" }}
        />
      </Card>
    </Space>
  );
}
