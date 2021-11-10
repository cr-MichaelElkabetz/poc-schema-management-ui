import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetReleaseComponent } from './get-release.component';

describe('GetReleaseComponent', () => {
  let component: GetReleaseComponent;
  let fixture: ComponentFixture<GetReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetReleaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
