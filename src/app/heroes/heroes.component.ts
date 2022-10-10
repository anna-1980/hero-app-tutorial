import { Component, OnInit } from '@angular/core';
import { Hero } from './hero.model'
import { HeroesList } from './listOfHeroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
// chosenHero:Hero;
heroes = HeroesList;
chosenHero?: Hero;

  constructor() { }

  ngOnInit(): void {
    console.log('on Init oif Heroes');
    console.log(this.heroes  )
  }

  onSelectHero(selectHero: Hero){
    this.chosenHero = selectHero
    console.log(selectHero.name)
  }

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
