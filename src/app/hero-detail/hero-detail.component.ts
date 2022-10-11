import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroService } from '../hero.service';
import { Hero } from '../heroes/hero.model'


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // @Input() hero?: Hero;
  // Observable is a generic Type and you have to define it here
  // hero?: Observable<Hero>;
  heroDetails?: Hero;
  constructor(     private location: Location, 
                   private route: ActivatedRoute,
                   private heroService: HeroService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.route.snapshot.paramMap.get('name'));
    const heroName =  this.route.snapshot.paramMap.get('name');
    const currentHeroName = heroName ? heroName.replace(/ /g, ""): ''
    console.log(currentHeroName);
    this.heroService.getHero(id, heroName)
      .subscribe(
        
        (recievedHero) => {this.heroDetails = recievedHero;
      }
      )
    console.log(this.heroDetails);
  }

  goBack(): void {
    this.location.back();
  }

}
 
   