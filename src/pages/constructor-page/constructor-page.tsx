import { useSelector, useDispatch } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { ConstructorPageUI } from '../../components/ui/pages/constructor-page/constructor-page';
import { Preloader } from '../../components/ui';
import { useEffect, FC } from 'react';
import { fetchIngredients } from '../../services/slices/ingredients-slice';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  const { items, isLoading, hasError } = useSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (isLoading) return <Preloader />;
  if (hasError) return <p>Ошибка загрузки ингредиентов</p>;

  return (
    <main className={styles.containerMain}>
      <div className={`${styles.main} pl-5 pr-5`}>
        <ConstructorPageUI
          isIngredientsLoading={isLoading}
          ingredients={items}
        />
      </div>
    </main>
  );
};
