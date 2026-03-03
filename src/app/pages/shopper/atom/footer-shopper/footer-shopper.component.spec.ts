import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterShopperComponent } from './footer-shopper.component';

describe('FooterShopperComponent', () => {
  let component: FooterShopperComponent;
  let fixture: ComponentFixture<FooterShopperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterShopperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterShopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
