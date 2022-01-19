import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DropEntryCheddaXpComponent } from './drop-entry-chedda-xp.component';

describe('DropEntryCheddaXpComponent', () => {
  let component: DropEntryCheddaXpComponent;
  let fixture: ComponentFixture<DropEntryCheddaXpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DropEntryCheddaXpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DropEntryCheddaXpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
