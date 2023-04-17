import React, { useState } from 'react';
import { useRouter } from "next/router";
import { auth, database } from "@/context/firebaseAuth/firebaseConfig"
import { ref, set  } from "firebase/database";
import { signOut } from "firebase/auth"
import Image from 'next/image';
// import {laucher_icon} from "laucher_icon.png"
import {
  DesktopOutlined,
  OrderedListOutlined,
  StarOutlined,
  AimOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
  DashboardFilled,
  HistoryOutlined,
  BellOutlined,
  FileOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  onClick?:React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    onClick,
    children,
    label,
  } as MenuItem;
  
}
const Sidebar: React.FC = () => {
  const router = useRouter()
    const handleLogout =  () =>{
      set(ref(database, `admins/${auth.currentUser?.uid}`) , {
        "is_logged_in": false,
      })
      signOut(auth);
      router.push("/login");
    }
    const items: MenuItem[] = [
      getItem('Dashboard', '1', <DashboardFilled />, function(){router.push("/home")}),
      getItem('Map', '3', <AimOutlined />),  function(){router.push("/home")},
      getItem('Members', '2', <UserOutlined />, function(){router.push("/home")}),
      getItem('Trip Details', 'sub1', <OrderedListOutlined />),
      getItem('Rating/review', 'sub2', <StarOutlined />),
      getItem('History', 'sub3', <HistoryOutlined />),
      getItem('Notification', 'sub4', <BellOutlined />),
      getItem('Service Types', 'sub5', <TeamOutlined />),
      getItem('Document', 'sub6', <FileOutlined />),
      // getItem('Other', 'sub2', <TeamOutlined />,[getItem("test"), getItem("analytics")]),
      getItem('Sign Out', '9', <LogoutOutlined />, ()=>handleLogout() ),
    ];
    const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', color: "white", display:"flex", flex:"row"}} >
         <Image src="/launcher_icon.png" alt="brand" width={32} height={32}/>
         <p style={{margin: "0.5rem"}}> Ride Sharing</p></div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      {/* <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout> */}
    </Layout>
  );
};

export default Sidebar;