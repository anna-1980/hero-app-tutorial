import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../heroes/hero.model';
import { HeroService } from '../hero.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit, DoCheck {
  // @ViewChild('ServerContentInput', {static: true}) ServerContentInput: ElementRef;

  heroes: Hero[] = [];
  heroName?: Hero;
  toggleHeroCard?:boolean= false;
  whichDetailCard?: string;
  sameCardCheck?: boolean = false;
  splitUrl?: string;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getHeroes();

    // this.getOneHeroDetails()

    console.log(`Dashboard router ${this.router.url}`);
  
  }

  ngDoCheck(): void{
    // console.log(`Dashboard DoCheck router ${this.router.url}`);
    // console.log(` Dashboard  paramMap DoCheck: ${this.route.snapshot.paramMap.get('name')}`)
    // console.log(`Dashboard Location ---DoCheck---  ${this.location.path()}`)
    this.whichDetailCard = this.location.path().toString().split('/').at(-1)
    console.log(`Dashboard whichDetailCard >>DoChange<<  ${this.whichDetailCard}`)
    console.log(`this.splitUrl === this.whichDetailCard ${ this.splitUrl === this.whichDetailCard}`)
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(0, 3));
  }

  getOneHeroDetails(checkValue: HTMLAnchorElement){
    const heroName =  this.route.snapshot.paramMap.get('name');
    // console.log(`from dashboard heroName: ${this.heroName}`);
    // this.toggleHeroCard = !this.toggleHeroCard
    // console.log(`Dashboard >>CLICK<< router ${this.router.url}`);
    // console.log(`>>>>CLICK<<<< ${checkValue}`);
    this.splitUrl = checkValue.toString().split('/').at(-1);
    console.log(`>>>>CLICK SLICED<<<< ${this.splitUrl}`);
    console.log(`>>>>>>${this.splitUrl === this.whichDetailCard}`)
    this.sameCardCheck = this.splitUrl === this.whichDetailCard
    
    // this.route.params.subscribe((params: Params) => {
      // console.log(`Subscribing to Params - get Name ${params['name']}`);
      // this.heroName = params['name'];
      // console.log(`Dashboard logging params ${params['name']}`);
      // console.log(`Dashboard logging params ${Object.values(params)}`);
      
    // })
  
    // this.heroService.getHerobyName(heroName)
    //   .subscribe(
        // (recievedHero) => {this.heroName = recievedHero;
          // console.log(recievedHero)
          // console.log(`toggle card ${this.toggleHeroCard}`)
          // console.log(`DashboardheroName ${recievedHero}`)
          // console.log(`event${event}`)
          // console.log(`route of Dashboard : ${this.route.snapshot.paramMap.get('name')}`)
          
      // })
    // console.log(`from dashboard retrieved from paramMap: ${this.heroName}`);
  }
  
}