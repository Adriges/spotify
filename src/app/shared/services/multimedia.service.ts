import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback:EventEmitter<any> = new EventEmitter<any>()

  public trackinfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)

  public audio!:HTMLAudioElement //! es para no inicializarlo

  public timeElapsed$:BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining$:BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$:BehaviorSubject<string> = new BehaviorSubject('paused')
  public playerPercentage$:BehaviorSubject<number> = new BehaviorSubject(0)

 /*      myObservable1$: BehaviorSubject<any> = new BehaviorSubject('AAA')
 */
   /*  myObservable1$: Subject<any> = new Subject() */
//Subject es como un observable y un observer a la vez

/*   myObservable1$:Observable<any> = new Observable() */

  constructor() {
    this.audio = new Audio()
    
    this.trackinfo$.subscribe(responseOK => {
      if(responseOK){
      this.setAudio(responseOK)
    }
    })

    this.listenAllEvents()

/*     setTimeout(() => {
      this.myObservable1$.next('AAA')
    }, 1000)

    setTimeout(() => {
      this.myObservable1$.error('FFF')
    }, 3000)
 */
    /* this.myObservable1$ = new Observable(
      (observer: Observer<any>) => {
        observer.next('AAAA')

        setTimeout(() =>{
          observer.complete()
        }, 1000)

        setTimeout(() =>{
          observer.next('S')
        }, 2500)

        setTimeout(() =>{
          observer.error('F')
        }, 3500)
      }
    ) */
   }

   private listenAllEvents(): void{
    this.audio.addEventListener('timeupdate', this.calculateTime, false)
    this.audio.addEventListener('playing', this.setPlayerStatus, false)
    this.audio.addEventListener('play', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('ended', this.setPlayerStatus, false)
   }

   private setPlayerStatus = (state: any) => {
    //console.log('**', state);
    switch(state.type){
      case 'play':
        this.playerStatus$.next('play')
        break
      case 'playing':
        this.playerStatus$.next('playing')
        break
      case 'ended':
        this.playerStatus$.next('ended')
        break
      default:
        this.playerStatus$.next('paused')
        break
    }
   }

   private calculateTime = () => {
    //console.log('Disparando evento')
    const { duration, currentTime } = this.audio
    //console.table([duration, currentTime])
    this.setTimeElapsed(currentTime)
    this.setTimeRemaining(currentTime, duration)
    this.setPercentage(currentTime, duration)
   }
   private setPercentage(currentTime:number, duration: number): void{
    let percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage)
   }

   private setTimeElapsed(currentTime: number): void{
    let seconds = Math.floor(currentTime % 60)
    let minutes = Math.floor((currentTime / 60) % 60)
    const displaySeconds = (seconds<10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes<10) ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat)
  }
  private setTimeRemaining(currentTime: number, duration: number): void{
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60)
    let minutes = Math.floor((timeLeft / 60) % 60)
    const displaySeconds = (seconds<10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes<10) ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)
  }
   public setAudio(track:TrackModel): void{
   // console.log('UwU', track)
    this.audio.src = track.url
    this.audio.play()
  }
   public togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
   }
   
   public seekAudio(percentage:number):void{
    const {duration} = this.audio
   // console.log(`Duration: ${duration}, Percentage: ${percentage}`);
    const percentageToSecond = (percentage * duration)/100
   // console.log(ppercentageToSecond);
    this.audio.currentTime = percentageToSecond
   }

}
