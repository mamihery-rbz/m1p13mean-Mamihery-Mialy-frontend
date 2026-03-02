import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierPageClientComponent } from './panier-page-client.component';

describe('PanierPageClientComponent', () => {
  let component: PanierPageClientComponent;
  let fixture: ComponentFixture<PanierPageClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanierPageClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanierPageClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
