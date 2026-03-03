import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarShopperComponent } from './sidebar-shopper.component';

describe('SidebarShopperComponent', () => {
  let component: SidebarShopperComponent;
  let fixture: ComponentFixture<SidebarShopperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarShopperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarShopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
