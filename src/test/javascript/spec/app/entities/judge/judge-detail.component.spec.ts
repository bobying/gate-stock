/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GateTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { JudgeDetailComponent } from '../../../../../../main/webapp/app/entities/judge/judge-detail.component';
import { JudgeService } from '../../../../../../main/webapp/app/entities/judge/judge.service';
import { Judge } from '../../../../../../main/webapp/app/entities/judge/judge.model';

describe('Component Tests', () => {

    describe('Judge Management Detail Component', () => {
        let comp: JudgeDetailComponent;
        let fixture: ComponentFixture<JudgeDetailComponent>;
        let service: JudgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [JudgeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    JudgeService,
                    JhiEventManager
                ]
            }).overrideTemplate(JudgeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JudgeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JudgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Judge(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.judge).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
