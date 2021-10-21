import {
  Button,
  Card,
  Comment,
  Avatar,
  Modal,
  Tooltip,
  Space,
  Spin,
} from 'antd';

import React, { createElement, useContext, useState } from 'react';
import {
  COMMENTS_ENDPOINT,
  POSTS_ENDPOINT,
} from '../../../constants/endpoints';
import { UsersContext } from '../../../context/userContext';
import { useFetch } from '../../../hooks/useFetch';
import { PageWrapper } from '../../wrappers';
import './styles.scss';
import moment from 'moment';
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from '@ant-design/icons';

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const PostsPage = () => {
  const posts = useFetch(POSTS_ENDPOINT);
  const { users } = useContext(UsersContext);
  const comments = useFetch(COMMENTS_ENDPOINT);
  const [isModalVisible, setIsModalVisible] = useState<boolean | undefined>(
    false
  );
  const [postId, setPostId] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);
  const [action, setAction] = useState<string>('');

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === 'disliked' ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  const showModal = (id: number) => {
    setIsModalVisible(true);
    setPostId(id);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <PageWrapper>
      <div>Total Posts: {posts?.length}</div>
      <div className="site-card-wrapper">
        <Modal
          title="Post info"
          width="70%"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          mask={false}
        >
          <p>{posts?.[postId - 1]?.body}</p>
          <div>
            {comments?.map(
              (comment: IComment) =>
                comment.postId === postId && (
                  <Comment
                    actions={actions}
                    author={comment.email}
                    key={comment.id}
                    avatar={
                      <Avatar
                        key={comment.id}
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                      />
                    }
                    content={<p>{comment.body}</p>}
                    datetime={
                      <Tooltip
                        key={comment.id}
                        title={moment().format('YYYY-MM-DD HH:mm:ss')}
                      >
                        <span>{moment().fromNow()}</span>
                      </Tooltip>
                    }
                  />
                )
            )}
          </div>
        </Modal>
        {posts ? (
          posts.map((post: IPost) => (
            <div className="posts-card" key={post.id}>
              <Card
                title={post?.title}
                bordered={true}
                style={{ width: 400, height: 300, margin: 15 }}
                key={post?.id}
                bodyStyle={{ border: '1px solid red' }}
                headStyle={{ border: '1px solid red' }}
                hoverable={true}
              >
                <p>{post.body}</p>
                <p>{users?.[post?.userId - 1]?.name}</p>
                <Button
                  type="primary"
                  key={post?.id}
                  onClick={() => showModal(post.id)}
                >
                  Show Comments
                </Button>
              </Card>
            </div>
          ))
        ) : (
          <Space size="middle">
            <Spin size="large" />
          </Space>
        )}
      </div>
    </PageWrapper>
  );
};
