import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdertrackingDetailComponent } from './ordertracking-detail.component';

describe('OrdertrackingDetailComponent', () => {
  let component: OrdertrackingDetailComponent;
  let fixture: ComponentFixture<OrdertrackingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdertrackingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdertrackingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
