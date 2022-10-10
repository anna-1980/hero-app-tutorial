import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroesList } from './listOfHeroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
//adding properties
heroes: Hero[] = HeroesList

  constructor() { }

  ngOnInit(): void {
    console.log('on Init oif Heroes');
    console.log(this.heroes  )
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
