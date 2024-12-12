import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayorMenorrComponent } from './mayor-menorr.component';

describe('MayorMenorrComponent', () => {
  let component: MayorMenorrComponent;
  let fixture: ComponentFixture<MayorMenorrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MayorMenorrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayorMenorrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
