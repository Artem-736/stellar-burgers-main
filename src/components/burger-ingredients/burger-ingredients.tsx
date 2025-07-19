import { useState, useRef, useEffect, FC } from 'react';
import { useSelector } from '../../services/store';
import { useInView } from 'react-intersection-observer';

import { TIngredient } from '@utils-types';
import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

import { useDispatch } from '../../services/store';
import { addBun, addIngredient } from '../../services/slices/constructor-slice';

export const BurgerIngredients: FC = () => {
  const { items } = useSelector((state) => state.ingredients);
  const { bun, ingredients = [] } = useSelector((state) => state.constructor);

  const buns = (items as TIngredient[]).filter((item) => item.type === 'bun');
  const mains = (items as TIngredient[]).filter((item) => item.type === 'main');
  const sauces = (items as TIngredient[]).filter(
    (item) => item.type === 'sauce'
  );

  const getCount = (id: string) => {
    if (bun && bun._id === id) {
      return 1;
    }
    if (!ingredients) return 0;
    return ingredients.filter((item) => item._id === id).length;
  };

  const bunsWithCount = buns.map((bun) => ({
    ...bun,
    count: getCount(bun._id)
  }));
  const mainsWithCount = mains.map((main) => ({
    ...main,
    count: getCount(main._id)
  }));
  const saucesWithCount = sauces.map((sauce) => ({
    ...sauce,
    count: getCount(sauce._id)
  }));

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewFilling] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewBuns) setCurrentTab('bun');
    else if (inViewSauces) setCurrentTab('sauce');
    else if (inViewFilling) setCurrentTab('main');
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const dispatch = useDispatch();

  const onIngredientClick = (ingredient: TIngredient) => {
    if (ingredient.type === 'bun') {
      dispatch(addBun({ ...ingredient }));
    } else {
      dispatch(addIngredient({ ...ingredient }));
    }
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={bunsWithCount}
      mains={mainsWithCount}
      sauces={saucesWithCount}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsSectionRef={bunsRef as React.Ref<HTMLUListElement>}
      mainsSectionRef={mainsRef as React.Ref<HTMLUListElement>}
      saucesSectionRef={saucesRef as React.Ref<HTMLUListElement>}
      onTabClick={onTabClick}
      onIngredientClick={onIngredientClick}
      data-testid='burger-ingredients'
    />
  );
};
