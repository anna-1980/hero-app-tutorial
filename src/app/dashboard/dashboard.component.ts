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
  displayHeroDetails?: Hero;
  parameters?: any;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getHeroes();

    this.route.params
      .subscribe(
      (params: Params) => {
        let parameters;
        console.log(`Subscribing to Params ${params['id']}`)
        this.parameters = params;
        console.log(`2 Subscribing to Params ${this.route.snapshot.params}`)
        
      }
    )

  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(0, 3));
  }

  getOneHeroDetails(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(`from dashboard: ${this.route.snapshot}`);
    this.heroService.getHero(id)
      .subscribe(
        (recievedHero) => {this.displayHeroDetails = recievedHero;
          console.log(recievedHero)
      })
    console.log(this.displayHeroDetails);
    console.log(`3 Subscribing to Params ${this.route.snapshot.params}`)
  }
  
}