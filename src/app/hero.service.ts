import { Injectable } from '@angular/core';
import { Hero } from './heroes/hero.model';
import { HeroesList } from './heroes/listOfHeroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root' //with his declattion is available app wide
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    const asynchHeroesList = of(HeroesList);
    this.messageService.add('HeroService: fetched asynchHeroesList');
    return asynchHeroesList;
  }

  getHero(id: number, heroName?: string | null): Observable<Hero> {
    const syncHero = HeroesList.find(h => h.id === id)!;
    // const singleHeroName = HeroesList.find(n => n.name === heroName)!;
    this.messageService.add(` HeroService: fetched Single Hero ${id} "${heroName}" ${new Date().toString().slice(0, 20)}` );
    
    return of(syncHero); //as observable
  }

  getHerobyName(heroName?: string | null): Observable<Hero> {
    // const syncHeroname = HeroesList.find(n => n.name === n)!;
    const singleHeroName = HeroesList.find(n => n.name === heroName)!;
    return of(singleHeroName); //as observable
  }
}

