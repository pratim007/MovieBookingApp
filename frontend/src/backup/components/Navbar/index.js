import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const items = [
    {label:"Home"},
    {label:"User"}
]


const Navbar  = () => {
  
  const navigate = useNavigate();
  const handleNavigateToHome = () => {
  
    navigate('/');
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

 
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Link to={"/"} onClick={handleNavigateToHome} className='text-white fs-18'> Book My Show </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
        />
      </Header>
    </Layout>
  );
};

export default Navbar;