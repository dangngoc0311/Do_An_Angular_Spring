import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercouponComponent } from './usercoupon.component';

describe('UsercouponComponent', () => {
  let component: UsercouponComponent;
  let fixture: ComponentFixture<UsercouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsercouponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
