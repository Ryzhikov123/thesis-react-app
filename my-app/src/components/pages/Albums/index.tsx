import { PageWrapper } from '../../wrappers';
import { Table, Space, Button, Spin } from 'antd';
import { useContext } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { ALBUMS_ENDPOINT } from '../../../constants/endpoints';
import { UsersContext } from '../../../context/userContext';
import { useHistory } from 'react-router';

const { Column } = Table;

// interface IAlbums {
//   userId: number;
//   id: number;
//   title: string;
// }

export const AlbumsPage = () => {
  const history = useHistory();
  const albums = useFetch(ALBUMS_ENDPOINT);
  // const albums: IAlbums[] = data.value;
  // const setAlbums = data.setValue;

  const { users } = useContext(UsersContext);
  const ShowPhotos = (id: string) => {
    history.push(`albums/${id}`, id);
  };

  return (
    <PageWrapper>
      {albums ? (
        <Table dataSource={albums}>
          <Column
            title="User Name"
            dataIndex="userId"
            key="userId"
            render={(userId: number) => <>{users?.[userId - 1]?.username}</>}
          />
          <Column
            title="Album Title"
            dataIndex="title"
            key="userId"
            render={(title: string) => <>{title}</>}
          />
          <Column
            title="Action"
            dataIndex="id"
            key="id"
            render={(id: string) => (
              <Button type="link" onClick={() => ShowPhotos(id)}>
                Show Photos
              </Button>
            )}
          />
        </Table>
      ) : (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      )}
    </PageWrapper>
  );
};
