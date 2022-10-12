import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../heroes/hero.model';
import { HeroService } from '../hero.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, DoCheck {
  heroes: Hero[] = [];
  heroName?: Hero;
  // toggleHeroCard?:boolean= false;
  whichDetailCard?: string;
  sameCardCheck?: boolean = false;
  splitUrl?: string;

  classToggle = '';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getHeroes();
    console.log(`Dashboard router ${this.router.url}`);
  }

  ngDoCheck(): void {
    console.log(`Dashboard DoCheck router ${this.router.url}`);
    console.log(
      ` Dashboard  paramMap DoCheck: ${this.route.snapshot.paramMap.get(
        'name'
      )}`
    );
    console.log(`Dashboard Location ---DoCheck---  ${this.location.path()}`);
    this.whichDetailCard = this.location.path().toString().split('/').at(-1);
    console.log(
      `Dashboard whichDetailCard >>DoChange<<  ${this.whichDetailCard}`
    );
    console.log(
      `this.splitUrl === this.whichDetailCard ${
        this.splitUrl === this.whichDetailCard
      }`
    );
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(0, 3)));
  }

  toggleDetailsCard(toggleDiv: HTMLDivElement) {
    console.log(toggleDiv);
    if (toggleDiv.classList.contains('hidden') === false && this.sameCardCheck === true) {
      toggleDiv.classList.add('hidden');
    } else if (
      toggleDiv.classList.contains('hidden') === true && this.sameCardCheck === true) {
      toggleDiv.classList.remove('hidden');
    }else{
      toggleDiv.classList.remove('hidden');
    }
  }

  getOneHeroDetails(checkValue: HTMLAnchorElement) {
    const heroName = this.route.snapshot.paramMap.get('name');

    this.splitUrl = checkValue.toString().split('/').at(-1);
    console.log(`>>>>CLICK SLICED<<<< ${this.splitUrl}`);
    console.log(`>>>>>>${this.splitUrl === this.whichDetailCard}`);
    this.sameCardCheck = this.splitUrl === this.whichDetailCard;
  }
}