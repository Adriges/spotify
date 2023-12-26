import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy{
  tracksTrending:Array<TrackModel> = []
  tracksRandom:Array<TrackModel> = []

  listObservers$:Array<Subscription> = []

  constructor(private tracksService: TrackService){ }

  ngOnInit(): void { 
    this.loadDataAll()
    this.loadDataRandom()

  }

//Esta forma de hacerlo no contempla errores.  
/*   loadDataAll(): void{
    this.tracksService.getAllTracks$()
    .subscribe((response: TrackModel[]) => {
      this.tracksTrending = response
    })
  }
  loadDataRandom(): void{
    this.tracksService.getAllRandoms$()
    .subscribe((response: TrackModel[]) => {
      this.tracksRandom = response
    })
  }*/
  async loadDataAll(): Promise<any> {
    this.tracksTrending = await this.tracksService.getAllTracks$().toPromise()
  }
  
  loadDataRandom(): void {
    this.tracksService.getAllRandoms$()
    .subscribe((response: TrackModel[]) => (
      this.tracksRandom = response
    ))
  }

  ngOnDestroy(): void {
  }
}
