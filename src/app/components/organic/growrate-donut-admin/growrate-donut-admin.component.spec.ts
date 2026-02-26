import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowrateDonutAdminComponent } from './growrate-donut-admin.component';

describe('GrowrateDonutAdminComponent', () => {
  let component: GrowrateDonutAdminComponent;
  let fixture: ComponentFixture<GrowrateDonutAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrowrateDonutAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrowrateDonutAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
