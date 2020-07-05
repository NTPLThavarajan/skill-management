import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollmasterComponent } from './rollmaster.component';

describe('RollmasterComponent', () => {
  let component: RollmasterComponent;
  let fixture: ComponentFixture<RollmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
