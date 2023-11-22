import { Injectable } from '@angular/core';
import { Observable, interval, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  getCurrentTime(): Observable<Date> {
    return interval(1000).pipe(
      map(() => {
        const currentTime = new Date();
        return currentTime;
      })
    );
  }
}
