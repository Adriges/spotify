import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs'; //lo estamos usando para pasar valores de un ts a otro actualizándolo, así podemos cambiar de canción

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy{

  @ViewChild('progressBar') progressBar:ElementRef = new ElementRef('')
  listObservers$:Array<Subscription> = []
  state:string = 'paused'
  constructor(public multimediaService: MultimediaService){}
  ngOnInit(): void{

    const observer1$ = this.multimediaService.playerStatus$
    .subscribe(status => this.state = status)

    this.listObservers$ = [observer1$]

    /* const observer1$: Subscription = this.multimediaService.callback.subscribe(
      (response: TrackModel) => {
        console.log('Recibiendo canción: ', response);
      }
    )
    this.listObservers$ = [observer1$] */
    /* const Observable1$ = this.multimediaService.myObservable1$
    .subscribe(
      (responseOk) => {
        console.log('Funciona bien', responseOk);
      },
      (responseFail) => {
        console.log('Funciona mal', responseFail);
      }
    ) */
  /*       this.multimediaService.trackinfo$.subscribe(res => {
        console.log('Debo reproducir esta cancion...', res);

      }) */
  
      
  }
  ngOnDestroy(): void{
    this.listObservers$.forEach(u => u.unsubscribe())
  }

  handlePosition(event: MouseEvent):void{
   const elNative:HTMLElement = this.progressBar.nativeElement
   const {clientX} = event
   const {x, width} = elNative.getBoundingClientRect()
   const clickX = clientX - x
   const percentageFromX = (clickX * 100)/width
   // console.log(`Click(x): ${percentageFromX}`);
   this.multimediaService.seekAudio(percentageFromX)
  }

}
