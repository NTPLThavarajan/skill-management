import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingmasterComponent } from './ratingmaster.component';

describe('RatingmasterComponent', () => {
  let component: RatingmasterComponent;
  let fixture: ComponentFixture<RatingmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
