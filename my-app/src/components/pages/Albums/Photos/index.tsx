import { Image, Row, Space, Spin } from 'antd';
import { useHistory } from 'react-router';
import { PHOTOS_ENDPOINT } from '../../../../constants/endpoints';
import { useFetch } from '../../../../hooks/useFetch';
import { PageWrapper } from '../../../wrappers';
import './styles.scss';

interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export const PhotosPage = () => {
  const photos = useFetch(PHOTOS_ENDPOINT);
  const {
    location: { state: photosId },
  } = useHistory();

  return (
    <PageWrapper>
      {photos ? (
        photos?.map((photo: IPhoto) => (
          <Row className="photos-page" key={photo.id}>
            {photosId === photo?.albumId && (
              <Image width={250} key={photo.id} src={photo?.url} />
            )}
          </Row>
        ))
      ) : (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      )}
    </PageWrapper>
  );
};
