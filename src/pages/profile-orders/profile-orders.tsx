import { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { setOrderHistory } from '../../services/slices/order-slice';
import { ProfileOrdersUI } from '@ui-pages';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orderHistory);

  useEffect(() => {
    const tokenRaw = localStorage.getItem('accessToken');
    if (!tokenRaw) return;

    const token = tokenRaw.replace('Bearer ', '');
    const ws = new WebSocket(
      `wss://norma.nomoreparties.space/orders?token=${token}`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data?.success && Array.isArray(data.orders)) {
        dispatch(setOrderHistory(data.orders));
      }
    };

    ws.onerror = (e) => {
      console.error('WebSocket error', e);
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
