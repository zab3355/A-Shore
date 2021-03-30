import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottleViewComponent } from './bottle-view.component';

describe('BottleViewComponent', () => {
  let component: BottleViewComponent;
  let fixture: ComponentFixture<BottleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottleViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
