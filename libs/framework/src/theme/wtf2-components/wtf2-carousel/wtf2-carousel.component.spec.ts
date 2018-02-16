import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2CarouselComponent } from './Wtf2Carousel.component';

describe('Wtf2CarouselComponent', () => {
  let component: Wtf2CarouselComponent;
  let fixture: ComponentFixture<Wtf2CarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Wtf2CarouselComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
