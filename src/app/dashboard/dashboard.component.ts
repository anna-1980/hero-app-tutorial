import { Component, OnInit } from '@angular/core';
import { Hero } from '../heroes/hero.model';
import { HeroService } from '../hero.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  heroName?: Hero;
 

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getHeroes();

  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(0, 3));
  }

  getOneHeroDetails(){
    const heroName =  this.route.snapshot.paramMap.get('name');
    // console.log(`from dashboard: ${this.route.snapshot}`);
 
    this.heroService.getHerobyName(heroName)
      .subscribe(
        (recievedHero) => {this.heroName = recievedHero;
          // console.log(recievedHero)
      })
    // console.log(`from dashboard retrieved from paramMap: ${this.heroName}`);
  }
  
}