import { Injectable } from '@angular/core';
import { Hero } from './heroes/hero.model';
import { HeroesList } from './heroes/listOfHeroes';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root' //with his declattion is available app wide
})
export class HeroService {

  constructor() { }


  getHeroes(): Observable<Hero[]> {
    const asynchHeroesList = of(HeroesList);
    return asynchHeroesList;
  }
}
