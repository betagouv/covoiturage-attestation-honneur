import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfidentialitePageComponent } from './confidentialite-page.component';

describe('ConfidentialitePageComponent', () => {
  let component: ConfidentialitePageComponent;
  let fixture: ComponentFixture<ConfidentialitePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfidentialitePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfidentialitePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
