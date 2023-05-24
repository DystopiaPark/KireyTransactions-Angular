import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUprouteComponent } from './sign-uproute.component';

describe('SignUprouteComponent', () => {
  let component: SignUprouteComponent;
  let fixture: ComponentFixture<SignUprouteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUprouteComponent]
    });
    fixture = TestBed.createComponent(SignUprouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
