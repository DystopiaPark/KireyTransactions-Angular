import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionnavComponent } from './transactionnav.component';

describe('TransactionnavComponent', () => {
  let component: TransactionnavComponent;
  let fixture: ComponentFixture<TransactionnavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionnavComponent]
    });
    fixture = TestBed.createComponent(TransactionnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
