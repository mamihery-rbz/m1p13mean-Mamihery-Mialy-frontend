import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityManagerAdminComponent } from './activity-manager-admin.component';

describe('ActivityManagerAdminComponent', () => {
  let component: ActivityManagerAdminComponent;
  let fixture: ComponentFixture<ActivityManagerAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityManagerAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityManagerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
