import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomelinkComponent } from './homelink/homelink.component';
import { LocationmasterComponent } from './locationmaster/locationmaster.component';
import { RatingmasterComponent } from './ratingmaster/ratingmaster.component';
import { RollmasterComponent } from './rollmaster/rollmaster.component';
import { SkillmasterComponent } from './skillmaster/skillmaster.component';
import { UserAddComponent } from './user-add/user-add.component';


const routes: Routes = [
  {
    path: '',
    component: HomelinkComponent,
    children: [
      {
        path: '',
        redirectTo: 'usermaster'
      },
      {
        path: 'usermaster',
        component: UserAddComponent
      },
      {
        path: 'locationmaster',
        component: LocationmasterComponent
      },
      {
        path: 'ratingmaster',
        component: RatingmasterComponent
      },
      {
        path: 'rollmaster',
        component: RollmasterComponent
      },
      {
        path: 'skillmaster',
        component: SkillmasterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MasterRoutingModule { }
