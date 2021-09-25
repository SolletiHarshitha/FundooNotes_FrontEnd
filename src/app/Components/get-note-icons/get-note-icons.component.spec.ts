import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetNoteIconsComponent } from './get-note-icons.component';

describe('GetNoteIconsComponent', () => {
  let component: GetNoteIconsComponent;
  let fixture: ComponentFixture<GetNoteIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetNoteIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetNoteIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
