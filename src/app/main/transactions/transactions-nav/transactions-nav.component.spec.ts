import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsNavComponent } from './transactions-nav.component';

describe('TransactionsNavComponent', () => {
  let component: TransactionsNavComponent;
  let fixture: ComponentFixture<TransactionsNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsNavComponent]
    });
    fixture = TestBed.createComponent(TransactionsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
