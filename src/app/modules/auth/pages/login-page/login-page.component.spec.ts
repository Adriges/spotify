import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { LoginPageComponent } from './login-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [LoginPageComponent]
    });
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Debe asegurarse que el formulario sea invalido cuando ingrese datos erroneos

  it('Deberia de retornar invalido el formulario', () => {

    // Patrón AAA

    // Arrange
    const mockCredentials = {
      email: '0x0x0x0x0x0x0x0',
      password: '111111111111111111111111111'
    }

    const emailForm: any = component.formLogin.get('email')
    const passwordForm: any = component.formLogin.get('password')

    // Act

    emailForm.setValue(mockCredentials.email)
    passwordForm.setValue(mockCredentials.password)

    // Assert


    expect(component.formLogin.invalid).toEqual(true);
  });

  it('Deberia de retornar Valido el formulario', () => {

    // Patrón AAA

    // Arrange
    const mockCredentials = {
      email: 'test@test.com',
      password: '12345678'
    }

    const emailForm: any = component.formLogin.get('email')
    const passwordForm: any = component.formLogin.get('password')

    // Act

    emailForm.setValue(mockCredentials.email)
    passwordForm.setValue(mockCredentials.password)

    // Assert


    expect(component.formLogin.invalid).toEqual(false);
  });

  it('El boton debería tener la palabra "Iniciar Sesión"', () => {

    const elementRef = fixture.debugElement.query(By.css('.form-action button'))
    const getInnerText = elementRef.nativeElement.innerText

    expect(getInnerText).toEqual('Iniciar sesión')

  })

});
