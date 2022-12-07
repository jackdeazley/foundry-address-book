import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { of, takeUntil } from 'rxjs';
import { AppComponent } from './app.component';
import { ContactFormModalModule } from './components/contact-form-modal/contact-form-modal.module';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { ContactsListModule } from './components/contacts-list/contacts-list.module';
import { SearchContactsModule } from './components/search-contacts/search-contacts.module';
import { SelectedContactModule } from './components/selected-contact/selected-contact.module';
import { ContactService } from './services/contacts.service';
import { MOCK_DATA } from './services/data-service.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientTestingModule,
        FontAwesomeModule,
        SearchContactsModule,
        SelectedContactModule,
        ContactFormModalModule,
        ContactsListModule,
        CollapseModule,
        BrowserAnimationsModule,
        ModalModule.forRoot(),
      ],
      providers: [ContactService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('getHeroes', () => {
    it('AC001 - should get the default array from mock db', fakeAsync(() => {
      // arrange
      const contacts = MOCK_DATA;

      const spyOnGetContacts = spyOn(
        component.contactService,
        'getContacts'
      ).and.returnValue(of(contacts));

      // act
      component.getHeroes();
      tick(600);

      // assert
      expect(spyOnGetContacts).toHaveBeenCalled();
      expect(component.contacts).toEqual(contacts);
    }));

    it('AC002 - should filter the existing array', () => {
      // arrange

      const contactList = [
        {
          id: '1',
          firstName: 'Tony',
          lastName: 'Stark',
        },
        {
          id: '2',
          firstName: 'Steve',
          lastName: 'Rodgers',
        },
        {
          id: '3',
          firstName: 'Carol',
          lastName: 'Danvers',
        },
      ];

      component.contacts = contactList;

      component.contactList = {
        contacts: contactList,
      } as ContactsListComponent;

      // act
      component.getHeroes('Ca');

      // assert
      expect(component.contactList.contacts).toEqual([contactList[2]]);
    });
  });

  describe('ngOnInit', () => {
    it('AC003 - should call the getHeroes method', () => {
      // arrange
      const spyOnGetHeroes = spyOn(component, 'getHeroes');

      // act
      component.ngOnInit();

      // assert
      expect(spyOnGetHeroes).toHaveBeenCalled();
    });
  });
});
