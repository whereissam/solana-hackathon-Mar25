import { Dog, Landmark, LocateFixed, LucideProps, PersonStanding } from 'lucide-react'
import { FunctionComponent } from 'react'

export enum Category {
  LOCATE = 0,
  CAT1 = 1,
  CAT2 = 2,
  CAT3 = 3,
}

export interface MarkerCategoriesValues {
  name: string
  icon: FunctionComponent<LucideProps>
  color: string
  hideInMenu?: boolean
}

type MarkerCategoryType = {
  [key in Category]: MarkerCategoriesValues
}

const MarkerCategories: MarkerCategoryType = {
  [Category.LOCATE]: {
    name: 'User Location',
    icon: LocateFixed,
    color: '#4ade80', // green-400 equivalent
    hideInMenu: false,
  },
  [Category.CAT1]: {
    name: 'Category 1',
    icon: Landmark,
    color: '#60a5fa', // blue-400 equivalent
  },
  [Category.CAT2]: {
    name: 'Category 2',
    icon: PersonStanding,
    color: '#4ade80', // green-400 equivalent
  },
  [Category.CAT3]: {
    name: 'Category 3',
    icon: Dog,
    color: '#fb923c', // orange-400 equivalent
  },
}

export default MarkerCategories
