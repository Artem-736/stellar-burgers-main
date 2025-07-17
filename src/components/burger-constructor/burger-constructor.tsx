import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export const BurgerConstructor: FC = () => {
  const { bun, ingredients = [] } = useSelector((state) => state.constructor);

  const otherIngredients: TConstructorIngredient[] = ingredients
    ? ingredients
        .filter((item: TIngredient) => item.type !== 'bun')
        .map((item: TIngredient) => ({ ...item, id: uuidv4() }))
    : [];

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = Array.isArray(ingredients)
      ? ingredients.reduce(
          (sum: number, item: TIngredient) => sum + item.price,
          0
        )
      : 0;
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const onOrderClick = () => {
    if (!bun) {
      alert('Выберите булку для заказа');
      return;
    }
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
