import { Book } from './book';
import { Account } from './account';
export class Reviewbook {
  id!:number;
  rating!:number;
  description!:string;
  status!:any;
  reviewdate!:Date;
  objReviewBook!:Account;
  objBookReview!:Book;
}
