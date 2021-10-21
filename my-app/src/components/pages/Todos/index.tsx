import { Avatar, Button, Card, Checkbox, Popover, Space, Spin } from 'antd';
import Search from 'antd/lib/transfer/search';
import { Select } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { TODOS_ENDPOINT } from '../../../constants/endpoints';
import { UsersContext } from '../../../context/userContext';
import { useFetch } from '../../../hooks/useFetch';
import { PageWrapper } from '../../wrappers';
import './styles.scss';

interface ITodos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const TodosPage = () => {
  const todos = useFetch(TODOS_ENDPOINT);
  const { users } = useContext(UsersContext);
  const [selected, setSelected] = useState<string>('');
  const [filteredTodos, setFilteredTodos] = useState<ITodos[] | null>(null);
  const [searchNameValue, setSearchNameValue] = useState<string>('');
  const [searchTitleValue, setSearchTitleValue] = useState<string>('');
  const [mtodos, setMtodos] = useState<ITodos[]>([]);
  const items = filteredTodos !== null ? filteredTodos : mtodos;

  const getModifiedMtodos = (checked: boolean, id: number) => {
    const modifiedMtodos = [...mtodos];
    modifiedMtodos[id - 1].completed = checked;
    setMtodos(modifiedMtodos);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMtodos(todos);
  }, [todos]);

  const { Option } = Select;

  const handleClick = (e: {}) => {
    const filteredTodos = mtodos?.filter((todo: ITodos) => {
      const filteredNameAndTitle =
        users?.[todo?.userId - 1]?.name.includes(searchNameValue) &&
        todo.title.includes(searchTitleValue);
      return selected
        ? selected === 'completed'
          ? todo.completed && filteredNameAndTitle
          : !todo.completed && filteredNameAndTitle
        : filteredNameAndTitle;
    });
    filteredTodos && setFilteredTodos(filteredTodos);
    setSearchNameValue('');
    setSearchTitleValue('');
  };
  return (
    <PageWrapper>
      <div className="todos-page">
        <div className="todos-page__total">
          <div>Total: {todos?.length}</div>
          <div className="todos-page__input-string">
            <Search
              placeholder="input search name"
              value={searchNameValue}
              onChange={(e: any) => setSearchNameValue(e.target.value)}
            />
          </div>
          <div className="todos-page__input-title">
            <Search
              placeholder="input search title"
              value={searchTitleValue}
              onChange={(e: any) => setSearchTitleValue(e.target.value)}
            />
          </div>
        </div>
        <div className="todos-page__select">
          <Select
            defaultValue="Not Chosen"
            style={{ width: 120 }}
            onChange={(value: string) => setSelected(value)}
          >
            <Option value="completed">Completed</Option>
            <Option value="uncompleted">Uncompleted</Option>
          </Select>
          <span>total:{filteredTodos?.length}</span>
          <Button type="primary" onClick={handleClick}>
            Применить изменения
          </Button>
        </div>
        <div className="todos-page__list">
          {items ? (
            items.map((todo: ITodos) => (
              <Card
                title={todo?.title}
                key={todo?.id}
                bordered={true}
                style={{ width: 250, height: 200, margin: 25 }}
                bodyStyle={{ border: '1px solid red' }}
                headStyle={{ border: '1px solid red' }}
                hoverable={true}
              >
                <div className="card-content">
                  <div className="card-content__user-info">
                    <Avatar size={40}>
                      {users?.[todo?.userId - 1]?.username}
                    </Avatar>{' '}
                    <Popover
                      content={
                        <div>
                          <p>Email: {users?.[todo?.userId - 1]?.email}</p>
                          <p>Phone: {users?.[todo?.userId - 1]?.phone}</p>
                          <p>Address:</p>
                          <p>city: {users?.[todo?.userId - 1]?.address.city}</p>
                          <p>
                            street: {users?.[todo?.userId - 1]?.address.street}
                          </p>
                          <p>
                            suite: {users?.[todo?.userId - 1]?.address.suite}
                          </p>
                        </div>
                      }
                      key={todo.id}
                      title={users?.[todo?.userId - 1]?.name}
                    >
                      <span>{users?.[todo?.userId - 1]?.name}</span>
                    </Popover>
                  </div>
                  <div className="card-content__user-completed">
                    <Checkbox
                      checked={todo.completed}
                      key={todo.id}
                      onChange={(e) =>
                        getModifiedMtodos(e.target.checked, todo.id)
                      }
                    >
                      Completed
                    </Checkbox>
                  </div>
                </div>
              </Card>
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
