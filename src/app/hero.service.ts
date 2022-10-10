import { Injectable } from '@angular/core';
import { Hero } from './heroes/hero.model';
import { HeroesList } from './heroes/listOfHeroes';

@Injectable({
  providedIn: 'root' //with his declattion is available app wide
})
export class HeroService {

  constructor() { }


  getHeroes(): Hero[] {
    return HeroesList;
  }
}
