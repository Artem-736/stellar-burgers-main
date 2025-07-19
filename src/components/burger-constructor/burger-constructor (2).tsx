import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { sendOrder } from '../../services/slices/order-slice';
import { clearOrder } from '../../services/slices/order-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bun, ingredients = [] } = useSelector(
    (state) => state.burgerConstructor
  );
  const { currentOrder, status } = useSelector((state) => state.order);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum, item) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!bun) {
      alert('Выберите булку для заказа');
      return;
    }

    const ingredientIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    dispatch(sendOrder(ingredientIds));
  };

  const isLoading = status === 'loading';
  const hasOrder = !!currentOrder;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isLoading}
      constructorItems={{
        bun: bun ?? null,
        ingredients: ingredients ?? []
      }}
      orderModalData={hasOrder ? currentOrder : null}
      onOrderClick={onOrderClick}
      closeOrderModal={() => dispatch(clearOrder())}
      data-testid='burger-constructor'
    />
  );
};
