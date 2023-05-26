import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixaLivreComponent } from './caixa-livre.component';

describe('CaixaLivreComponent', () => {
  let component: CaixaLivreComponent;
  let fixture: ComponentFixture<CaixaLivreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaixaLivreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaixaLivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
