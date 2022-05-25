import { Account } from "./account";
import { Coupon } from "./coupon";

export class Order {
  id!:number;
  subtotalprice!:number;
  orderdate!:Date;
  status!:any;
  note!:string;
  objAccountOrder!:Account;
  objOrderCoupon!:Coupon;
  name?:string;
  phone?:string;
  address?:string;
  updatedat!:Date;
}
