import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSlyder } from './main-slyder';

describe('MainSlyder', () => {
  let component: MainSlyder;
  let fixture: ComponentFixture<MainSlyder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSlyder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSlyder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
