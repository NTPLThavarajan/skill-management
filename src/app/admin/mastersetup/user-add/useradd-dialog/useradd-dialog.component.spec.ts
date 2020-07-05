import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraddDialogComponent } from './useradd-dialog.component';

describe('UseraddDialogComponent', () => {
  let component: UseraddDialogComponent;
  let fixture: ComponentFixture<UseraddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseraddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
