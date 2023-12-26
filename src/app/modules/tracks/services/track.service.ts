import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import { map, mergeMap, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) {
   }

   private skipById(listTracks: TrackModel[], id: number):Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter(a=>a._id !== id)
      resolve(listTmp)
    })
  }

  getAllTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`,{
      headers: new HttpHeaders({ authorization: 'Bearer TOKEN' })
    })
    .pipe(
      map(({data}: any) => {
        return data
      })
    )
  }
  getAllRandoms$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
    .pipe(
      tap(data => /* console.log('sin filtrar', */data/* ) */),
      mergeMap(({data}: any) => this.skipById(data, 1)),
/*       map((dataRevertida) => {  //Filtramos
        return dataRevertida.filter((track:TrackModel) => track._id !== 1)
      }) */
      tap(data => /* console.log('filtrado', */data/* ) */),
      catchError((err) => {
        const { status, statusText } = err;
        console.log('Algo pasó, revísame', [status, statusText]);
        return of([])
      })
    )
  }


}
