import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetNotesByLabelComponent } from './get-notes-by-label.component';

describe('GetNotesByLabelComponent', () => {
  let component: GetNotesByLabelComponent;
  let fixture: ComponentFixture<GetNotesByLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetNotesByLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetNotesByLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
