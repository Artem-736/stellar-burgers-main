import { useEffect, FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchOrders } from '../../services/slices/feed-slice';
import { FeedUI } from '@ui-pages';
import { Preloader } from '@ui';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.feed.orders);
  const status = useSelector((state) => state.feed.status);
  const total = useSelector((state) => state.feed.total);
  const totalToday = useSelector((state) => state.feed.totalToday);
  const error = useSelector((state) => state.feed.error);

  const isLoading = status === 'loading';

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchOrders());
  };

  if (isLoading) return <Preloader />;
  if (error)
    return <p className='text text_type_main-default mt-10'>{error}</p>;

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={handleGetFeeds}
      total={total}
      totalToday={totalToday}
      status={status}
      error={error}
    />
  );
};
