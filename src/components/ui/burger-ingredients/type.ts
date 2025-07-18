import React from 'react';
import { TIngredient, TTabMode } from '@utils-types';

export interface BurgerIngredientsUIProps {
  currentTab: TTabMode;
  buns: (TIngredient & { count: number })[];
  mains: (TIngredient & { count: number })[];
  sauces: (TIngredient & { count: number })[];
  titleBunRef: React.RefObject<HTMLHeadingElement>;
  titleMainRef: React.RefObject<HTMLHeadingElement>;
  titleSaucesRef: React.RefObject<HTMLHeadingElement>;
  bunsSectionRef: React.Ref<HTMLUListElement>;
  mainsSectionRef: React.Ref<HTMLUListElement>;
  saucesSectionRef: React.Ref<HTMLUListElement>;
  onTabClick: (tab: string) => void;
  onIngredientClick: (ingredient: TIngredient) => void;
}
