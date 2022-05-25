import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdertrackingComponent } from './ordertracking.component';

describe('OrdertrackingComponent', () => {
  let component: OrdertrackingComponent;
  let fixture: ComponentFixture<OrdertrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdertrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdertrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
