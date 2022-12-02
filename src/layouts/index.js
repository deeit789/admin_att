import React, { useEffect, useState } from "react";
import { LaptopOutlined, FieldTimeOutlined } from "@ant-design/icons";

import { Layout, Menu } from "antd";

import DashboardPage from "../pages/dashboard";
import MatchPage from "../pages/score-prediction/match";

import { Navigate, useNavigate, useLocation, Link } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const menuSider = [
  {
    key: `app-score-prediction`,
    icon: <LaptopOutlined />,
    label: `App dự đoán tỉ số`,
    children: [
      {
        key: `app-score-prediction-match`,
        label: `Trận đấu`,
        icon: <FieldTimeOutlined />,
      },
    ],
  },
];

const authProtectedRoutes = [
  { key: "dashboard", path: "/dashboard", component: <DashboardPage /> },
  {
    key: "app-score-prediction-match",
    path: "/score-prediction/match",
    component: <MatchPage />,
  },
  {
    path: "/",
    component: () => <Navigate to="/score-prediction/match" />,
  },
];

const AuthProtectedLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [components, setComponents] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const itemMenuClicked = authProtectedRoutes.filter(
      (items) => items.path === location.pathname
    );
    if (itemMenuClicked.length > 0) setComponents(itemMenuClicked[0].component);
    else navigate("/404");
  }, [location.pathname]);

  const onClickItemMenu = (item) => {
    const itemMenuClicked = authProtectedRoutes.filter(
      (items) => items.key === item.key
    );
    setComponents(itemMenuClicked[0].component);
    return navigate(itemMenuClicked[0].path);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="logo" />
        <Link to="/logout">Đăng Xuất </Link>
      </Header>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["app-score-prediction-match"]}
            defaultOpenKeys={["app-score-prediction"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={menuSider}
            onClick={(item) => onClickItemMenu(item)}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {components}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default AuthProtectedLayout;
