import { Book } from "./book";

export class Category {
  id!: number;
  name!: string;
  status!: any;
  listBooks!:[Book];
}
