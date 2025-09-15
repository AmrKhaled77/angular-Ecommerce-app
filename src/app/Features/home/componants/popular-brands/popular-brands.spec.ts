import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularBrands } from './popular-brands';

describe('PopularBrands', () => {
  let component: PopularBrands;
  let fixture: ComponentFixture<PopularBrands>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularBrands]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularBrands);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
