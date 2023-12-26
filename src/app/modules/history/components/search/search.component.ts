import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Output() callbackData: EventEmitter<any> = new EventEmitter()

  src: string = ''

  callSearch(term: string): void{
    if(term.length >= 3){
      this.callbackData.emit(term)
    console.log('ADDSASDA', term)
    }
  }

}
