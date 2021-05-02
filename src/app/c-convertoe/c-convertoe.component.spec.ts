import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CConvertoeComponent } from './c-convertoe.component';

describe('CConvertoeComponent', () => {
  let component: CConvertoeComponent;
  let fixture: ComponentFixture<CConvertoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CConvertoeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CConvertoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
