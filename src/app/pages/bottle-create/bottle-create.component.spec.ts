import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottleCreateComponent } from './bottle-create.component';

describe('BottleCreateComponent', () => {
  let component: BottleCreateComponent;
  let fixture: ComponentFixture<BottleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottleCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
