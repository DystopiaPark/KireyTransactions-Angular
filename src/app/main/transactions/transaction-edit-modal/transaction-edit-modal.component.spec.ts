import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionEditModalComponent } from './transaction-edit-modal.component';

describe('TransactionEditModalComponent', () => {
  let component: TransactionEditModalComponent;
  let fixture: ComponentFixture<TransactionEditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionEditModalComponent]
    });
    fixture = TestBed.createComponent(TransactionEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
