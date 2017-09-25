/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GateTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TracertDetailComponent } from '../../../../../../main/webapp/app/entities/tracert/tracert-detail.component';
import { TracertService } from '../../../../../../main/webapp/app/entities/tracert/tracert.service';
import { Tracert } from '../../../../../../main/webapp/app/entities/tracert/tracert.model';

describe('Component Tests', () => {

    describe('Tracert Management Detail Component', () => {
        let comp: TracertDetailComponent;
        let fixture: ComponentFixture<TracertDetailComponent>;
        let service: TracertService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [TracertDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TracertService,
                    JhiEventManager
                ]
            }).overrideTemplate(TracertDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TracertDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TracertService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tracert(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tracert).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
