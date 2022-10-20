import { Injectable } from '@angular/core';
import { ValueCache } from 'ag-grid-community';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject = new Subject<any>();

  sendClickEvent(){
    this.subject.next;
    this.getClickEvent()
    
  }

  getClickEvent():Observable<any>{
     return this.subject.asObservable();
     
  }


  private _listners =new Subject <any>();
  listen():Observable<any>{
    return this._listners.asObservable();
  }
  filter(filterBy:string ){
    this._listners.next(filterBy)
  }
}