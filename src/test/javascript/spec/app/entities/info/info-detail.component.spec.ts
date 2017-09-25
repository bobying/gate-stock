/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GateTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { InfoDetailComponent } from '../../../../../../main/webapp/app/entities/info/info-detail.component';
import { InfoService } from '../../../../../../main/webapp/app/entities/info/info.service';
import { Info } from '../../../../../../main/webapp/app/entities/info/info.model';

describe('Component Tests', () => {

    describe('Info Management Detail Component', () => {
        let comp: InfoDetailComponent;
        let fixture: ComponentFixture<InfoDetailComponent>;
        let service: InfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [InfoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    InfoService,
                    JhiEventManager
                ]
            }).overrideTemplate(InfoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InfoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Info(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.info).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
