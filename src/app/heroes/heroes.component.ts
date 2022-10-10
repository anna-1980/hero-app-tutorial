import { Component, OnInit } from '@angular/core';
import { Hero } from './hero.model'
// import { HeroesList } from './listOfHeroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
// chosenHero:Hero;
// heroes = HeroesList; //redundant after adding service
heroes: Hero[] = [];
chosenHero?: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    console.log('on Init oif Heroes');
    console.log(this.heroes  )

    //from the service
    this.heroes = this.heroService.getHeroes();
  }

  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  onSelectHero(selectHero: Hero){
    this.chosenHero = selectHero
    console.log(selectHero.name)
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
