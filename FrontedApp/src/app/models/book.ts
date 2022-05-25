import { Category } from './category';
import { Reviewbook } from './reviewbook';

export class Book {
  id!: number;
  name!: string;
  author!: string;
  publisher!: string;
  price!: number;
  saleprice!: number;
  typesale!: any;
  description!: string;
  image!: string;
  quantity!: number;
  objCategory!: Category;
  hot!: any;
  status!: any;
  qty!: any;
}
