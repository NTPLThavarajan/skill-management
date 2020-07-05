import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolldialogComponent } from './rolldialog.component';

describe('RolldialogComponent', () => {
  let component: RolldialogComponent;
  let fixture: ComponentFixture<RolldialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolldialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
