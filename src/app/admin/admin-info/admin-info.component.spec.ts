import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInfoComponent } from './admin-info.component';

describe('AdminInfoComponent', () => {
  let component: AdminInfoComponent;
  let fixture: ComponentFixture<AdminInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminInfoComponent]
    });
    fixture = TestBed.createComponent(AdminInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
