import { createRootRouteWithContext, Outlet, Link } from "@tanstack/react-router";
import { Layout, Menu, Typography } from "antd";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";

interface RouterContext {
  queryClient: QueryClient;
}

const { Header, Content, Footer } = Layout;

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Typography.Title level={4} style={{ color: "#fff", margin: 0 }}>
          Посты
        </Typography.Title>
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          items={[
            { key: "list", label: <Link to="/">Список</Link> },
            { key: "new", label: <Link to="/editor">Создать</Link> },
          ]}
        />
      </Header>
      <Content style={{ padding: 24, maxWidth: 960, margin: "0 auto", width: "100%" }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center", color: "#999" }}>
        TanStack Query + TanStack Router + Ant Design
      </Footer>
      {import.meta.env.DEV && (
        <>
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      )}
    </Layout>
  ),
});
