import { Component, OnInit } from '@angular/core';
import { Hero } from './hero.model';
// import { HeroesList } from './listOfHeroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  // chosenHero:Hero;
  // heroes = HeroesList; //redundant after adding service
  heroes: Hero[] = [];
  chosenHero?: Hero;

  constructor(private heroService: HeroService, 
    private messageService: MessageService) {}

  ngOnInit(): void {
    console.log('on Init oif Heroes');
    console.log(this.heroes);

    //from the service
    // this.heroes = this.heroService.getHeroes()
//------------the asynch HTTP method Observable------------//
      this.heroService.getHeroes()
        .subscribe( (stillHeroes) => this.heroes = stillHeroes)
    
    // This approach won't work in a real application that uses asynchronous calls.
    // It works now because your service synchronously returns mock heroes.
  }

  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  onSelectHero(selectHero: Hero) {
  
    this.chosenHero = selectHero;
    console.log(selectHero.name);
    this.messageService.add(`HeroesComponent: Selected hero name=${selectHero.name}  -- on ${ new Date().toString().slice(0, 25)}`);
  }
  //adding heroes List from services
}

// heroes: Hero = [
//   {id: 1,
//   name: ' Sir Gregory ',
//   power: ' fighter ⚔️',
//   },
//   {id: 2,
//     name: ' Ice Queen ',
//     power: ' freeze ❄️',
//     },
//   {id: 3,
//     name: ' Voltan ',
//     power: ' electricity ⚡',
//     },
//   {id: 4,
//       name: ' Eon ',
//       power: ' time stop ⏳',
//       },
// ]
