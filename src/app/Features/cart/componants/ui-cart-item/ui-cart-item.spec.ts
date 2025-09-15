import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCartItem } from './ui-cart-item';

describe('UiCartItem', () => {
  let component: UiCartItem;
  let fixture: ComponentFixture<UiCartItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCartItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiCartItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
