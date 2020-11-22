import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAddTasksComponent } from './basic-add-tasks.component';

describe('BasicAddTasksComponent', () => {
  let component: BasicAddTasksComponent;
  let fixture: ComponentFixture<BasicAddTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicAddTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicAddTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
