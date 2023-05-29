import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagenavComponent } from './homepagenav.component';

describe('HomepagenavComponent', () => {
  let component: HomepagenavComponent;
  let fixture: ComponentFixture<HomepagenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepagenavComponent]
    });
    fixture = TestBed.createComponent(HomepagenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
