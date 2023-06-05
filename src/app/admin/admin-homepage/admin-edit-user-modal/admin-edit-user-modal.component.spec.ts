import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditUserModalComponent } from './admin-edit-user-modal.component';

describe('AdminEditUserModalComponent', () => {
  let component: AdminEditUserModalComponent;
  let fixture: ComponentFixture<AdminEditUserModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditUserModalComponent]
    });
    fixture = TestBed.createComponent(AdminEditUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
