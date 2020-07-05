import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Angular System UI Module
import { RouterModule } from '@angular/router';
import { HomelinkComponent } from './homelink/homelink.component';
import { LocationdialogComponent } from './locationmaster/locationdialog/locationdialog.component';
import { LocationmasterComponent } from './locationmaster/locationmaster.component';
import { MasterRoutingModule } from './master-routing.module';
import { RatingdialogComponent } from './ratingmaster/ratingdialog/ratingdialog.component';
import { RatingmasterComponent } from './ratingmaster/ratingmaster.component';
import { RolldialogComponent } from './rollmaster/rolldialog/rolldialog.component';
import { RollmasterComponent } from './rollmaster/rollmaster.component';
import { SkilldialogComponent } from './skillmaster/skilldialog/skilldialog.component';
import { SkillmasterComponent } from './skillmaster/skillmaster.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UseraddDialogComponent } from './user-add/useradd-dialog/useradd-dialog.component';


@NgModule({
  declarations: [SkillmasterComponent, UserAddComponent, UseraddDialogComponent,
    LocationmasterComponent,
    LocationdialogComponent, RatingmasterComponent, RatingdialogComponent,
    SkilldialogComponent, RolldialogComponent, RollmasterComponent, HomelinkComponent],

  imports: [CommonModule, RouterModule, MatButtonModule, MatInputModule,
    MatCardModule, FormsModule, ReactiveFormsModule, MatPaginatorModule, MatTableModule,
    MatGridListModule, MatDialogModule, MatSelectModule, MatIconModule, MatSortModule,
    MatTooltipModule, MatToolbarModule, MatMenuModule, MatProgressSpinnerModule,
    MatAutocompleteModule, MatCheckboxModule, MasterRoutingModule, MatTabsModule],

  exports: [SkillmasterComponent, UserAddComponent, UseraddDialogComponent,
    LocationmasterComponent, LocationdialogComponent, RolldialogComponent,
    RollmasterComponent, RatingmasterComponent, RatingdialogComponent, HomelinkComponent],

  entryComponents: [
    UseraddDialogComponent
  ],
})
export class MastersetupModule { }
