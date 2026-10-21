import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Input, Space, Typography, Tag } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { fetchPosts, fetchPost, deletePost } from "@/api/posts";
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
  const [searchValue, setSearchValue] = React.useState(q);

  const postsQuery = useInfiniteQuery({
    queryKey: ["posts", "infinite", q],
    queryFn: ({ pageParam }) => fetchPosts({ page: pageParam, pageSize: 6, search: q }),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.items.length < last.pageSize ? undefined : last.page + 1),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const allPosts = postsQuery.data?.pages.flatMap((p) => p.items) ?? [];
  const total = postsQuery.data?.pages[0]?.total ?? 0;

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Space style={{ width: "100%", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Space>
          <Input.Search
            placeholder="Поиск по постам…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={(v) => navigate({ search: { q: v } })}
            style={{ width: 320 }}
            allowClear
          />
          <Button onClick={() => navigate({ search: { q: "" } })}>Сбросить</Button>
        </Space>
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate({ to: "/editor" })}>
            Создать пост
          </Button>
          <Button icon={<ReloadOutlined />} onClick={() => postsQuery.refetch()} loading={postsQuery.isFetching}>
            Обновить
          </Button>
        </Space>
      </Space>

      {postsQuery.isLoading && <Typography.Text>Загрузка…</Typography.Text>}
      {postsQuery.isError && (
        <Typography.Text type="danger">Ошибка: {(postsQuery.error as Error).message}</Typography.Text>
      )}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
        {allPosts.map((post) => (
          <Card
            key={post.id}
            style={{ width: "70vw" }}
            title={<Link to="/posts/$postId" params={{ postId: String(post.id) }}>{post.title}</Link>}
            extra={
              <Space>
                <Link to="/editor" search={{ id: post.id }}>
                  <Button type="text" icon={<EditOutlined />} size="small" />
                </Link>
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  size="small"
                  loading={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate(post.id)}
                />
              </Space>
            }
            hoverable
            onMouseEnter={() =>
              void queryClient.prefetchQuery({ queryKey: ["post", post.id], queryFn: () => fetchPost(post.id) })
            }
          >
            <Typography.Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 8 }}>
              {post.body}
            </Typography.Paragraph>
            <Tag color="blue">{new Date(post.createdAt).toLocaleDateString("ru-RU")}</Tag>
          </Card>
        ))}
      </div>

      <Space>
        <Button
          onClick={() => postsQuery.fetchNextPage()}
          disabled={!postsQuery.hasNextPage || postsQuery.isFetchingNextPage}
          loading={postsQuery.isFetchingNextPage}
        >
          {postsQuery.hasNextPage ? "Загрузить ещё" : "Больше нет"}
        </Button>
      </Space>

      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        Всего: {total} · загружено: {allPosts.length} · страниц: {postsQuery.data?.pages.length ?? 0}
      </Typography.Text>
    </Space>
  );
}

