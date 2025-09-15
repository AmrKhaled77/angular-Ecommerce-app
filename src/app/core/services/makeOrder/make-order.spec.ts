import { TestBed } from '@angular/core/testing';

import { MakeOrder } from './make-order';

describe('MakeOrder', () => {
  let service: MakeOrder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakeOrder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
