import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RozarPayComponent } from './rozar-pay.component';

describe('RozarPayComponent', () => {
  let component: RozarPayComponent;
  let fixture: ComponentFixture<RozarPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RozarPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RozarPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
