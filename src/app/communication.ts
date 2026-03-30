import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Communication {

  //protected queueData: Subject<string> = new Subject<string>()
  protected queueData: BehaviorSubject<string> = new BehaviorSubject<string>('Pas de valeur reçue pour l\'instant')

  constructor() { }

  pushData(data: string) {
    this.queueData.next(data)
  }

  onData(): Observable<string> {
    return this.queueData.asObservable()
  }
}
