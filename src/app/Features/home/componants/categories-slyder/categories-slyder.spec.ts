import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSlyder } from './categories-slyder';

describe('CategoriesSlyder', () => {
  let component: CategoriesSlyder;
  let fixture: ComponentFixture<CategoriesSlyder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesSlyder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesSlyder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
