import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return <AppHeaderUI userName={isAuthenticated && user ? user.name : ''} />;
};
