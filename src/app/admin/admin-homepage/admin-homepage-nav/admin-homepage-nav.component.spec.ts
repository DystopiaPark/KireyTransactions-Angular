import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomepageNavComponent } from './admin-homepage-nav.component';

describe('AdminHomepageNavComponent', () => {
  let component: AdminHomepageNavComponent;
  let fixture: ComponentFixture<AdminHomepageNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHomepageNavComponent]
    });
    fixture = TestBed.createComponent(AdminHomepageNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
