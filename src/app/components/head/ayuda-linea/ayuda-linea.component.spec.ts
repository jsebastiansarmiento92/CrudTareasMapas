import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaLineaComponent } from './ayuda-linea.component';

describe('AyudaLineaComponent', () => {
  let component: AyudaLineaComponent;
  let fixture: ComponentFixture<AyudaLineaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyudaLineaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyudaLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
