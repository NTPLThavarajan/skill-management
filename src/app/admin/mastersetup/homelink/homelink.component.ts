import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homelink',
  templateUrl: './homelink.component.html',
  styleUrls: ['./homelink.component.scss']
})
export class HomelinkComponent implements OnInit {
  masNavLink: MasNavLink[] = [];
  constructor() {}
  ngOnInit() {
    this.masNavLink = [
      new MasNavLink('usermaster', 'UserAddComponent'),
      new MasNavLink('locationmaster', 'LocationmasterComponent'),
      new MasNavLink('ratingmaster', 'RatingmasterComponent'),
      new MasNavLink('rollmaster', 'RollmasterComponent'),
      new MasNavLink('skillmaster', 'SkillMaster')
    ];
  }
}
class MasNavLink {
  constructor(public path: string, public label: string) {}
}
