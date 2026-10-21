import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Space, Typography, Spin } from "antd";
import { fetchPost, createPost, updatePost } from "@/api/posts";
import { z } from "zod";

const searchSchema = z.object({ id: z.number().optional() });

export const Route = createFileRoute("/editor")({
  validateSearch: searchSchema,
  component: EditorPage,
});

function EditorPage() {
  const { id } = Route.useSearch();
  const isEdit = typeof id === "number";
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id as number),
    enabled: isEdit,
  });

  const [form] = Form.useForm<{ title: string; body: string }>();

  // fill form when editing
  React.useEffect(() => {
    if (isEdit && postQuery.data) {
      form.setFieldsValue({ title: postQuery.data.title, body: postQuery.data.body });
    }
  }, [isEdit, postQuery.data, form]);

  const mutation = useMutation({
    mutationFn: (values: { title: string; body: string }) =>
      isEdit ? updatePost(id as number, values) : createPost(values),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (isEdit) void queryClient.invalidateQueries({ queryKey: ["post", id] });
      void navigate({ to: "/" });
    },
  });

  if (isEdit && postQuery.isLoading) return <Spin />;

  return (
    <Space direction="vertical" size="large" style={{ width: "100%", maxWidth: 720 }}>
      <Typography.Title level={3}>{isEdit ? "Редактирование поста" : "Новый пост"}</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => mutation.mutate(values)}
        initialValues={{ title: "", body: "" }}
      >
        <Form.Item name="title" label="Заголовок" rules={[{ required: true, message: "Введите заголовок" }]}>
          <Input placeholder="Заголовок поста" />
        </Form.Item>
        <Form.Item name="body" label="Текст" rules={[{ required: true, message: "Введите текст" }]}>
          <Input.TextArea rows={8} placeholder="Текст поста" />
        </Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={mutation.isPending}>
            {isEdit ? "Сохранить" : "Создать"}
          </Button>
          <Button onClick={() => navigate({ to: "/" })}>Отмена</Button>
        </Space>
      </Form>
      {mutation.isError && <Typography.Text type="danger">Ошибка: {(mutation.error as Error).message}</Typography.Text>}
    </Space>
  );
}

