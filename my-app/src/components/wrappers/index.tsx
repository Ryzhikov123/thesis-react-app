import './styles.scss';
import { Layout } from 'antd';
import { NavBar } from '../blocks/NavBar';


const { Content, Footer } = Layout;

export const PageWrapper = (props: any) => {
  return (
    <Layout>
      <NavBar />
      <Content
        className="site-layout"
        style={{ padding: '0 50px', marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};
