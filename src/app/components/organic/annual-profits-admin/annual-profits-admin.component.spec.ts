import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualProfitsAdminComponent } from './annual-profits-admin.component';

describe('AnnualProfitsAdminComponent', () => {
  let component: AnnualProfitsAdminComponent;
  let fixture: ComponentFixture<AnnualProfitsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnualProfitsAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualProfitsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
