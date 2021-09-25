import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private dataSource = new BehaviorSubject(false);
  currentData = this.dataSource.asObservable();

  constructor() { }

  changeMessage(message: boolean) {
    this.dataSource.next(message)
  }
}
