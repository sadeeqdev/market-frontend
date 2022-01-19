import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DropEntryTwitterComponent } from './drop-entry-twitter.component';

describe('DropEntryTwitterComponent', () => {
  let component: DropEntryTwitterComponent;
  let fixture: ComponentFixture<DropEntryTwitterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DropEntryTwitterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DropEntryTwitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
