import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomepageMainComponent } from './admin-homepage-main.component';

describe('AdminHomepageMainComponent', () => {
  let component: AdminHomepageMainComponent;
  let fixture: ComponentFixture<AdminHomepageMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHomepageMainComponent]
    });
    fixture = TestBed.createComponent(AdminHomepageMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
