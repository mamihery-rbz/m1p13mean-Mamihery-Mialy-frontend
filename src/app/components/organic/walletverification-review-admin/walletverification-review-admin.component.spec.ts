import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletverificationReviewAdminComponent } from './walletverification-review-admin.component';

describe('WalletverificationReviewAdminComponent', () => {
  let component: WalletverificationReviewAdminComponent;
  let fixture: ComponentFixture<WalletverificationReviewAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletverificationReviewAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletverificationReviewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
