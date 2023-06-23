import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgototpComponent } from './forgototp.component';

describe('ForgototpComponent', () => {
  let component: ForgototpComponent;
  let fixture: ComponentFixture<ForgototpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgototpComponent]
    });
    fixture = TestBed.createComponent(ForgototpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
