import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFromComponent } from './public-from.component';

describe('PublicFromComponent', () => {
  let component: PublicFromComponent;
  let fixture: ComponentFixture<PublicFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicFromComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
