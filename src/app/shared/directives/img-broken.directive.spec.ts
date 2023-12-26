import { Component, ElementRef } from '@angular/core';
import { ImgBrokenDirective } from './img-broken.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';




//Componente de prueba
@Component({
  template:'<img class="testing-directive" appImgBroken [src]="srcMock" >'
})
class TestComponent {
  public srcMock:any = null
}
//La prueba
describe('ImgBrokenDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>
//Declaraciones previas para usar luego en las pruebas  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[
        TestComponent,
        ImgBrokenDirective
      ]
    })
    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })
//Prueba por defecto
  it('should create an instance', () => {
    const mockElement = new ElementRef('')
    const directive = new ImgBrokenDirective(mockElement);
    expect(directive).toBeTruthy();
  });
//Otras pruebas  
  it('TestComponent debería instanciarse correctamente',() => {
    expect(component).toBeTruthy();
  })

  it('Directiva debería cambiar la imagen',(done:DoneFn) => {
    //Arrange
    const beforeImgElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement
    const beforeImgSrc = beforeImgElement.src //URL antes de ser cambiada por la directiva
    component.srcMock = undefined
    
    setTimeout(() => {
    const afterImgElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement
    const afterImgSrc = beforeImgElement.src //URL despues de ser cambiada por la directiva
    
    expect(afterImgSrc).toMatch(/\bimg-broken.png\b/)
    done()
    }, 3000)

  })

});
