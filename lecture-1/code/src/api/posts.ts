// src/api/posts.ts
// Mock API: имитирует бэкенд с задержкой. Данные хранятся в памяти модуля,
// поэтому мутации (создание/редактирование/удаление) сразу отражаются в списках.

export interface Post {
  id: number;
  title: string;
  body: string;
  createdAt: number;
}

export interface Comment {
  id: number;
  postId: number;
  text: string;
  author: string;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

let posts: Post[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: `Пост #${i + 1}: ${["React", "Vite", "TanStack", "Oxc", "TypeScript"][i % 5]} в деталях`,
  body: `Это содержимое поста номер ${i + 1}. Здесь могла бы быть длинная статья про фронтенд-инструменты, но для демо достаточно этого текста.`,
  createdAt: Date.now() - i * 86400000,
}));

const comments: Comment[] = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  postId: (i % 24) + 1,
  text: `Комментарий ${i + 1}: согласен с автором!`,
  author: ["Анна", "Борис", "Вика", "Глеб"][i % 4],
}));

export async function fetchPosts(params: { page: number; pageSize: number; search?: string }) {
  await delay(400);
  const search = (params.search ?? "").toLowerCase().trim();
  const filtered = search
    ? posts.filter((p) => p.title.toLowerCase().includes(search) || p.body.toLowerCase().includes(search))
    : posts;
  const start = (params.page - 1) * params.pageSize;
  const items = filtered.slice(start, start + params.pageSize);
  return { items, total: filtered.length, page: params.page, pageSize: params.pageSize };
}

export async function fetchPost(id: number) {
  await delay(300);
  const post = posts.find((p) => p.id === id);
  if (!post) throw new Error(`Пост ${id} не найден`);
  return post;
}

export async function fetchComments(postId: number) {
  await delay(250);
  return comments.filter((c) => c.postId === postId);
}

export async function createPost(input: { title: string; body: string }) {
  await delay(500);
  const post: Post = {
    id: Math.max(0, ...posts.map((p) => p.id)) + 1,
    title: input.title,
    body: input.body,
    createdAt: Date.now(),
  };
  posts = [post, ...posts];
  return post;
}

export async function updatePost(id: number, input: { title: string; body: string }) {
  await delay(400);
  const post = posts.find((p) => p.id === id);
  if (!post) throw new Error(`Пост ${id} не найден`);
  post.title = input.title;
  post.body = input.body;
  return { ...post };
}

export async function deletePost(id: number) {
  await delay(300);
  posts = posts.filter((p) => p.id !== id);
}
