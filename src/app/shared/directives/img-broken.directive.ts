import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  //Esto es para pasar imagenes personalizas por el evento de error
  @Input() customImg: string | boolean = false
  //Esto es para pasar la imagen preestablecida por el evento de error
  @HostListener('error') handleError(): void{
    const elNative = this.elHost.nativeElement
    //elNative.src = '../../../assets/images/img-broken.png'
    if (this.customImg){
      elNative.src = this.customImg
    }else{
      elNative.src = '../../../assets/images/img-broken.png'
    }

  }

  constructor(private elHost:ElementRef) {

   }

}
