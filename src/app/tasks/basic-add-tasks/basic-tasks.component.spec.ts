import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTasksComponent } from './basic-tasks.component';

describe('BasicAddTasksComponent', () => {
  let component: BasicTasksComponent;
  let fixture: ComponentFixture<BasicTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
