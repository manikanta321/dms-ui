import { EventEmitter, Injectable } from '@angular/core';
import { ValueCache } from 'ag-grid-community';
import moment from 'moment';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject = new Subject<any>();

  ReloadaddOrg: EventEmitter<void> = new EventEmitter<void>();
  deletepromo():void{
    this.ReloadaddOrg.emit()
  }
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

  dateformat(value,requireddateFormat=' DD  MMM  YYYY  ')
  
  // MMM D, YYYY'
  // DD-MMM-YY
  {
    return moment(value).format(requireddateFormat);

  }
}