import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserupdatePage } from './userupdate.page';

describe('UserupdatePage', () => {
  let component: UserupdatePage;
  let fixture: ComponentFixture<UserupdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserupdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserupdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
