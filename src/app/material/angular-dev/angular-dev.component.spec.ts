import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularDevComponent } from './angular-dev.component';

describe('AngularDevComponent', () => {
  let component: AngularDevComponent;
  let fixture: ComponentFixture<AngularDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularDevComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
