import { Outlet } from "react-router-dom";
import { Breadcrumb, Button, Dropdown, Layout, Menu, MenuProps, Space } from 'antd';
import './index.scss'
import { useState } from "react";
import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, DownOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),

  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),

    getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
];

export default function LayoutPage() {
  // 菜单
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Layout hasSider className="layoutBox">
        <Sider className="siderBox" collapsed={collapsed}>
          <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            theme="dark"
            items={items}
          />
        </Sider>
        <Layout>
          <Header className="headerBox flex-row-between">
            <div className="flex-row-start flex-col-center gap20">
              <i onClick={toggleCollapsed} className="f-mx">
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </i>
              <Breadcrumb
                items={[
                  {
                    title: 'Home',
                  },
                  {
                    title: <a href="">Application Center</a>,
                  },
                  {
                    title: <a href="">Application List</a>,
                  },
                  {
                    title: 'An Application',
                  },
                ]}
              />
            </div>
            <Dropdown menu={{ items }} arrow>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Hover me
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Header>
          <Content className="contentBox">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}