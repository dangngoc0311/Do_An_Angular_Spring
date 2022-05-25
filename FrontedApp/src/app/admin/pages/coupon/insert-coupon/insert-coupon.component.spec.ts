import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCouponComponent } from './insert-coupon.component';

describe('InsertCouponComponent', () => {
  let component: InsertCouponComponent;
  let fixture: ComponentFixture<InsertCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertCouponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
