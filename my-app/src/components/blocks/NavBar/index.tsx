import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const { Header } = Layout;

export const NavBar = () => {
  const {
    location: { pathname },
  } = useHistory();
  const activePage = pathname.split('/')[1];
  
  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[`${activePage}`]}
      >
        <Menu.Item key="users">
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="todos">
          <Link to="/todos">Todos</Link>
        </Menu.Item>
        <Menu.Item key="albums">
          <Link to="/albums">Albums</Link>
        </Menu.Item>
        <Menu.Item key="posts">
          <Link to="/posts">Posts</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};
