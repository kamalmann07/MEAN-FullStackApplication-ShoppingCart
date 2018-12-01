import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthenticatedComponent } from './user-authenticated.component';

describe('UserAuthenticatedComponent', () => {
  let component: UserAuthenticatedComponent;
  let fixture: ComponentFixture<UserAuthenticatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAuthenticatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
