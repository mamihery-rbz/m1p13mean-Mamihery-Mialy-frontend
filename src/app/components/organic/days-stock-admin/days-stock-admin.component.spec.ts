import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysStockAdminComponent } from './days-stock-admin.component';

describe('DaysStockAdminComponent', () => {
  let component: DaysStockAdminComponent;
  let fixture: ComponentFixture<DaysStockAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaysStockAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaysStockAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
