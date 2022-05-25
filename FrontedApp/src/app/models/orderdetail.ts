import { Book } from "./book";
import { Order } from "./order";

export class Orderdetail {
  id!:number;
  objBookOrder!:Book;
  objOrder!:Order;
  price!:number;
  quantity!:number;
}
