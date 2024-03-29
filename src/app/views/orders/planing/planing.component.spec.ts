/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlaningComponent } from './planing.component';

describe('PlaningComponent', () => {
  let component: PlaningComponent;
  let fixture: ComponentFixture<PlaningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
