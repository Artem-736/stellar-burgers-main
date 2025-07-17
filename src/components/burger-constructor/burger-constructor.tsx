import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import { sendOrder } from '../../services/slices/order-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const { bun, ingredients = [] } = useSelector((state) => state.constructor);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const otherIngredients: TConstructorIngredient[] = ingredients
    .filter((item: TIngredient) => item.type !== 'bun')
    .map((item: TIngredient) => ({ ...item, id: uuidv4() }));

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum: number, item: TIngredient) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const onOrderClick = () => {
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

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={false}
      constructorItems={{
        bun: bun ?? null,
        ingredients: ingredients ?? []
      }}
      orderModalData={null}
      onOrderClick={onOrderClick}
      closeOrderModal={() => {}}
    />
  );
};
