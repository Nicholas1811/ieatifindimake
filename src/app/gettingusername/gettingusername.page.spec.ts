import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GettingusernamePage } from './gettingusername.page';

describe('GettingusernamePage', () => {
  let component: GettingusernamePage;
  let fixture: ComponentFixture<GettingusernamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GettingusernamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GettingusernamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
