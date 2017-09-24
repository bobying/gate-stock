/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GateTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SourceDetailComponent } from '../../../../../../main/webapp/app/entities/source/source-detail.component';
import { SourceService } from '../../../../../../main/webapp/app/entities/source/source.service';
import { Source } from '../../../../../../main/webapp/app/entities/source/source.model';

describe('Component Tests', () => {

    describe('Source Management Detail Component', () => {
        let comp: SourceDetailComponent;
        let fixture: ComponentFixture<SourceDetailComponent>;
        let service: SourceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [SourceDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SourceService,
                    JhiEventManager
                ]
            }).overrideTemplate(SourceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SourceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SourceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Source(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.source).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
