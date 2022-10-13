import { Location } from '@angular/common';
import { Component, OnInit, Input, OnDestroy, DoCheck } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroService } from '../hero.service';
import { Hero } from '../heroes/hero.model'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit, OnDestroy, DoCheck {
  // @Input() hero?: Hero;
  // Observable is a generic Type and you have to define it here
  // hero?: Observable<Hero>;
  heroDetails?: Hero;
  heroName?: string;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    console.log('>>>Hero Detail  onInit')
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // console.log(
    //   `name from this.route.snapshot.paramMap = ${this.route.snapshot.paramMap.get(
    //     'name'
    //   )}`
    // );
    const heroNameforMsgService = this.route.snapshot.paramMap.get('name');
    // const currentHeroName = heroNameforMsg ? heroNameforMsg.replace(/ /g, ""): ''
    // console.log(currentHeroName);
    this.heroService
      .getHero(id, heroNameforMsgService)
      .subscribe((recievedHero) => {
        this.heroDetails = recievedHero;
      });
    // console.log(this.heroDetails);
    // console.log(`from hero details ${this.route.snapshot.paramMap.get('id')}`);

    this.route.params.subscribe((params: Params) => {
        console.log(`Subscribing to Params - get Name ${params['name']}`);
        this.heroName = params['name'];
        // console.log(`2 logging params ${this.route.params}`);
        this.heroService
          .getHerobyName(this.heroName)
          .subscribe((recievedHero) => {
            this.heroDetails = recievedHero;
          });
       });
  }

  ngOnDestroy(){
    console.log('XXX---Hero Detail  onDestroy')
  }

  ngDoCheck(): void {
    console.log('-----ngDoCheck')
  }

  save(): void {
    if (this.heroDetails) {
      this.heroService.updateHero(this.heroDetails)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
 
   