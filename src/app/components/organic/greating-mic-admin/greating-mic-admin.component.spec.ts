import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreatingMicAdminComponent } from './greating-mic-admin.component';

describe('GreatingMicAdminComponent', () => {
  let component: GreatingMicAdminComponent;
  let fixture: ComponentFixture<GreatingMicAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreatingMicAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreatingMicAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
