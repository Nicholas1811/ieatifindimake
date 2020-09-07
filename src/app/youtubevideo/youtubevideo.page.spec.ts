import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YoutubevideoPage } from './youtubevideo.page';

describe('YoutubevideoPage', () => {
  let component: YoutubevideoPage;
  let fixture: ComponentFixture<YoutubevideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubevideoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YoutubevideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
