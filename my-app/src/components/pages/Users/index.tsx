import { useContext, useEffect, useState } from 'react';
import { IUsers, UsersContext } from '../../../context/userContext';
import {  Card, Space, Spin } from 'antd';
import { PageWrapper } from '../../wrappers';
import './styles.scss';

export const UsersPage = () => {
  const { users } = useContext(UsersContext);
  const [usersItems, setUsersItems] = useState<IUsers[] | null>(null);
  useEffect(() => setUsersItems(users), [users]);
  return (
    <PageWrapper>
      <div className="users-page">
        <h1>Users</h1>
        <span>Total: {users?.length}</span>
        <div className="product-page__list">
          {usersItems ? (
            usersItems?.map((user: IUsers) => (
              <div key={user.id} className="site-card-wrapper">
                <div key={user.id} className="site-card-wrapper__user-card">
                  <Card
                    className="custom-card"
                    title="User Card"
                    headStyle={{ textAlign: 'center' }}
                    bordered={false}
                    key={user.id}
                  >
                    <p>Id: {user.id}</p>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                  </Card>
                </div>
              </div>
            ))
          ) : (
            <Space size="middle">
              <Spin size="large" />
            </Space>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};
