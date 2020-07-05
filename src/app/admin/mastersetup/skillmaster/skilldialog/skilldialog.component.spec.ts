import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkilldialogComponent } from './skilldialog.component';

describe('SkilldialogComponent', () => {
  let component: SkilldialogComponent;
  let fixture: ComponentFixture<SkilldialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkilldialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkilldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
