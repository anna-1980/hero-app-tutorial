import { Injectable } from '@angular/core';
import { Hero } from './heroes/hero.model';
import { HeroesList } from './heroes/listOfHeroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', //with his declattion is available app wide
})
export class HeroService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'api/heroes'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  getHeroes(): Observable<Hero[]> {
    const asynchHeroesList = of(HeroesList);
    this.messageService.add('HeroService: fetched asynchHeroesList');
    return asynchHeroesList;

    //SERVER
    // return this.http.get<Hero[]>(this.heroesUrl)
    // .pipe(
    //   tap(_ => this.log('fetched heroes')),
    //   catchError(this.handleError<Hero[]>('getHeroes', []))
    // );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // SERVER
  // getHero(id: number, heroName?: string | null): Observable<Hero> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.get<Hero>(url).pipe(
  //     tap(_ => this.log(`fetched hero id=${id}`)),
  //     catchError(this.handleError<Hero>(`getHero id=${id}`))
  //   );
  // }

  getHero(id: number, heroName?: string | null): Observable<Hero> {
    const syncHero = HeroesList.find((h) => h.id === id)!;
    this.messageService.add(
      ` HeroService: fetched Single Hero ${id} "${heroName}" ${new Date()
        .toString()
        .slice(0, 21)}`
    );
    return of(syncHero); //as observable
  }

  getHerobyName(heroName?: string | null): Observable<Hero> {
    // const syncHeroname = HeroesList.find(n => n.name === n)!;
    const singleHeroName = HeroesList.find((n) => n.name === heroName)!;
    return of(singleHeroName); //as observable
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
}

// before server ------------------------------//

// import { Injectable } from '@angular/core';
// import { Hero } from './heroes/hero.model';
// import { HeroesList } from './heroes/listOfHeroes';
// import { Observable, of } from 'rxjs';
// import { MessageService } from './message.service';

// @Injectable({
//   providedIn: 'root' //with his declattion is available app wide
// })
// export class HeroService {

//   constructor(private messageService: MessageService) { }

//   getHeroes(): Observable<Hero[]> {
//     const asynchHeroesList = of(HeroesList);
//     this.messageService.add('HeroService: fetched asynchHeroesList');
//     return asynchHeroesList;
//   }

//   getHero(id: number, heroName?: string | null): Observable<Hero> {
//     const syncHero = HeroesList.find(h => h.id === id)!;
//     // const singleHeroName = HeroesList.find(n => n.name === heroName)!;
//     this.messageService.add(` HeroService: fetched Single Hero ${id} "${heroName}" ${new Date().toString().slice(0, 20)}` );
    
//     return of(syncHero); //as observable
//   }

//   getHerobyName(heroName?: string | null): Observable<Hero> {
//     // const syncHeroname = HeroesList.find(n => n.name === n)!;
//     const singleHeroName = HeroesList.find(n => n.name === heroName)!;
//     return of(singleHeroName); //as observable
//   }
// }