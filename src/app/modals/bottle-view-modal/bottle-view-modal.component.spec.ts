import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottleViewModalComponent } from './bottle-view-modal.component';

describe('BottleViewModalComponent', () => {
  let component: BottleViewModalComponent;
  let fixture: ComponentFixture<BottleViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottleViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottleViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
