import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPageAdminComponent } from './crud-page-admin.component';

describe('CrudPageAdminComponent', () => {
  let component: CrudPageAdminComponent;
  let fixture: ComponentFixture<CrudPageAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudPageAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudPageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
