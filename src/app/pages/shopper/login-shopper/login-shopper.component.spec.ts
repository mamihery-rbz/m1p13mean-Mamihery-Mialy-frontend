import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginShopperComponent } from './login-shopper.component';

describe('LoginShopperComponent', () => {
  let component: LoginShopperComponent;
  let fixture: ComponentFixture<LoginShopperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginShopperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginShopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
