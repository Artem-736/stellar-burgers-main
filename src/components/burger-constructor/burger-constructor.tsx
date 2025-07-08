import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

interface Props {
  ingredients: TIngredient[];
}

export const BurgerConstructor: FC<Props> = ({ ingredients }) => {
  const bun = ingredients.find((item) => item.type === 'bun');

  const otherIngredients = ingredients.filter((item) => item.type !== 'bun');

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = otherIngredients.reduce(
      (sum, item) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, otherIngredients]);

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
      constructorItems={{ bun: bun ?? null, ingredients: otherIngredients }}
      orderModalData={null}
      onOrderClick={onOrderClick}
      closeOrderModal={() => {}}
    />
  );
};
