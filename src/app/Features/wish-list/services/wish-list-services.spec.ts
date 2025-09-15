import { TestBed } from '@angular/core/testing';

import { WishListServices } from './wish-list-services';

describe('WishListServices', () => {
  let service: WishListServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishListServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
