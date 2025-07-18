import { TIngredient } from '@utils-types';

export type TIngredientsCategoryUIProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement>;
  ingredients: (TIngredient & { count?: number })[];
  onIngredientClick: (ingredient: TIngredient) => void;
};
