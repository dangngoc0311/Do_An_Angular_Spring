import { Orderdetail } from './../../../../models/orderdetail';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderdetailService } from 'src/app/service/orderdetail.service';
import { OrderService } from 'src/app/service/order.service';
import { Order } from 'src/app/models/order';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css'],
})
export class OrderdetailComponent implements OnInit {
  id: any;
  listOrderDetail?: Orderdetail[];
  order: Order = new Order();
  constructor(
    private route: ActivatedRoute,
    private orderDetailService: OrderdetailService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.orderDetailService.findOrderdetailByOrder(this.id).subscribe((res) => {
      this.listOrderDetail = res;
    });
    this.orderService.findOrderById(this.id).subscribe((data) => {
      this.order = data;
    });
  }
  getFilterDetails(locations: any) {
    this.orderService.findOrderById(this.id).subscribe((data) => {
      this.order = data;
      this.order.status = locations;
      this.orderService.updateOrder(this.id, this.order).subscribe(
        (data) => {
          this.toastr.success(this.translate.instant(`successUpdate`));
        },
        (err) =>  this.toastr.error(this.translate.instant(`errUpdate`))
      );
    });
  }
}
