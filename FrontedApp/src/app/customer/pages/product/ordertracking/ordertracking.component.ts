import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-ordertracking',
  templateUrl: './ordertracking.component.html',
  styleUrls: ['./ordertracking.component.css'],
})
export class OrdertrackingComponent implements OnInit {
  acc: any = localStorage.getItem('user');
  account: any = JSON.parse(this.acc);
  listOrderTracking: any = [];
  order: Order = new Order();
  constructor(
    private orderService: OrderService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getListOrdertracking();
  }
  getListOrdertracking() {
    this.orderService.findOrderByCustomer(this.account.id).subscribe((data) => {
      this.listOrderTracking = data;
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
