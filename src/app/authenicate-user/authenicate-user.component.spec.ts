import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenicateUserComponent } from './authenicate-user.component';

describe('AuthenicateUserComponent', () => {
  let component: AuthenicateUserComponent;
  let fixture: ComponentFixture<AuthenicateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenicateUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenicateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
