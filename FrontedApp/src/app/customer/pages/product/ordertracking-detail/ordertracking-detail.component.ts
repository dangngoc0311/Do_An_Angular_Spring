import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/service/order.service';
import { OrderdetailService } from 'src/app/service/orderdetail.service';

@Component({
  selector: 'app-ordertracking-detail',
  templateUrl: './ordertracking-detail.component.html',
  styleUrls: ['./ordertracking-detail.component.css'],
})
export class OrdertrackingDetailComponent implements OnInit {
  id: any = '';
  ordertracking: Order = new Order();
  listOrderDetail: any = [];
  host: string = 'http://localhost:8081/admin/book';
  order: Order = new Order();
  beforeDate:any =  new Date();
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private orderDetailService: OrderdetailService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.orderService.findOrderById(this.id).subscribe((order) => {
      this.ordertracking = order;
      this.beforeDate.setDate(new Date(order.updatedat).getDate()+7);
      console.log(this.beforeDate);
    });
    this.orderDetailService
      .findOrderdetailByOrder(this.id)
      .subscribe((orderdetail) => {
        this.listOrderDetail = orderdetail;
      });
  }
  successDelivery(id: any) {
    this.orderService.findOrderById(id).subscribe((data) => {
      this.order = data;
      this.order.status = 3;
      this.orderService.updateOrder(id, this.order).subscribe(
        (data) => {
          this.toastr.success(this.translate.instant(`successUpdate`));
          this.ngOnInit();
        },
        (err) => this.toastr.error(this.translate.instant(`errUpdate`))
      );
    });
  }
}
