import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderShopperComponent } from './header-shopper.component';

describe('HeaderShopperComponent', () => {
  let component: HeaderShopperComponent;
  let fixture: ComponentFixture<HeaderShopperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderShopperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderShopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
