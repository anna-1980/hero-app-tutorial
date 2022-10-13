import { Component, OnInit } from '@angular/core';
import { Hero } from './hero.model';
// import { HeroesList } from './listOfHeroes';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  
})
export class HeroesComponent implements OnInit {
  // chosenHero:Hero;
  // heroes = HeroesList; //redundant after adding service
  heroes: Hero[] = [];
  // chosenHero?: Hero;
  /// alternative  chosenHero: Hero | undefined;

  constructor(
      private heroService: HeroService, 
      private location: Location, 
      private route: ActivatedRoute,
    // private messageService: MessageService
    ) {}

  ngOnInit(): void {
    console.log('on Init of Heroes');
    console.log(this.heroes);

    //from the service

    // this.heroes = this.heroService.getHeroes()
//------------the asynch HTTP method Observable------------//
      this.heroService.getHeroes()
        .subscribe( (stillHeroes) => this.heroes = stillHeroes)
      console.log(this.route.snapshot )
    //-------extracting ID from the url------//
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

//-----xxxxx-----after adding router this code was redundant ------xxxx-------//
  // onSelectHero(selectHero: Hero) {
  
  //   this.chosenHero = selectHero;
  //   console.log(selectHero.name);
  //   this.messageService.add(`HeroesComponent: Selected hero name=${selectHero.name}  -- on ${ new Date().toString().slice(0, 25)}`);
  // }
  //adding heroes List from services
//-----xxxxx-----after adding router this code was redundant ------xxxx-------//
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
