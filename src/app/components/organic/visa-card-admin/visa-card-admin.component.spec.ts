import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaCardAdminComponent } from './visa-card-admin.component';

describe('VisaCardAdminComponent', () => {
  let component: VisaCardAdminComponent;
  let fixture: ComponentFixture<VisaCardAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisaCardAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisaCardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
