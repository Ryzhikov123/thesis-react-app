import { Image, Space, Spin } from 'antd';
import { useHistory } from 'react-router';
import { PHOTOS_ENDPOINT } from '../../../../constants/endpoints';
import { useFetch } from '../../../../hooks/useFetch';
import { PageWrapper } from '../../../wrappers';


interface IPhoto {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string,
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
          <>
            {photosId === photo?.albumId && (
              <Image width={250} src={photo?.url} />
            )}
          </>
        ))
      ) : (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      )}
    </PageWrapper>
  );
};
