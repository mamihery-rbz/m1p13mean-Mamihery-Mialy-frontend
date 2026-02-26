import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomePaidAdminComponent } from './income-paid-admin.component';

describe('IncomePaidAdminComponent', () => {
  let component: IncomePaidAdminComponent;
  let fixture: ComponentFixture<IncomePaidAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomePaidAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomePaidAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
