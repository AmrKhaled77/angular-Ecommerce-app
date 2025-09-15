import { TestBed } from '@angular/core/testing';

import { AdressesServices } from './adresses-services';

describe('AdressesServices', () => {
  let service: AdressesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdressesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
