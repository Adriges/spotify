1111111111111111111111111/* import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sessionGuard } from './session.guard';

describe('sessionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sessionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
}); */
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SessionGuard } from './session.guard';

//TODO:🔴🔴 Es el nombre de la prueba "Examen del Session Guard"
describe('Testing of Session Guard 👍', () => {
  let guard: SessionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ]
    });
    guard = TestBed.inject(SessionGuard);
  });

  //TODO La primera pregunta de ese gran examen!
  it('should be created', () => {
    expect(guard).toBeTruthy(); //TODO 🤬🤬🤬
  });

});