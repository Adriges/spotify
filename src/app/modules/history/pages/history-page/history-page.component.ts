import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent {
  listResults$: Observable<any> = of([])
  constructor(private searchService: SearchService){

  }

  receiveData(event:string):void{
    //coges el term y solo se ejecuta con 3+ chars
    console.log('Estoy en el padre', event);
    this.listResults$ = this.searchService.searchTracks$(event)

  }
}
