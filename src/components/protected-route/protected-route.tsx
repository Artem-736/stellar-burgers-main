import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

type Props = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};

export const ProtectedRoute: FC<Props> = ({
  onlyUnAuth = false,
  component
}) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated && !onlyUnAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (isAuthenticated && onlyUnAuth) {
    return <Navigate to='/profile' replace />;
  }

  return component;
};
