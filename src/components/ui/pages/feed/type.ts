import { TOrder } from '@utils-types';

export interface FeedUIProps {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  handleGetFeeds: () => void;
}
