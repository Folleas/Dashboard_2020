import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthserviceComponent } from './oauthservice.component';

describe('OauthserviceComponent', () => {
  let component: OauthserviceComponent;
  let fixture: ComponentFixture<OauthserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OauthserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
