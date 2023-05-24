import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosAddComponent } from './produtos-add.component';

describe('ProdutosAddComponent', () => {
  let component: ProdutosAddComponent;
  let fixture: ComponentFixture<ProdutosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
