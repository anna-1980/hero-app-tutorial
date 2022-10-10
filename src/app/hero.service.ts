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
}
