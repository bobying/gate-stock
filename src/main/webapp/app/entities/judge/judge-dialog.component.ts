import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Judge } from './judge.model';
import { JudgePopupService } from './judge-popup.service';
import { JudgeService } from './judge.service';
import { Info, InfoService } from '../info';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-judge-dialog',
    templateUrl: './judge-dialog.component.html'
})
export class JudgeDialogComponent implements OnInit {

    judge: Judge;
    isSaving: boolean;

    infos: Info[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private judgeService: JudgeService,
        private infoService: InfoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.infoService
            .query({filter: 'judge-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.judge.infoId) {
                    this.infos = res.json;
                } else {
                    this.infoService
                        .find(this.judge.infoId)
                        .subscribe((subRes: Info) => {
                            this.infos = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.judge.id !== undefined) {
            this.subscribeToSaveResponse(
                this.judgeService.update(this.judge));
        } else {
            this.subscribeToSaveResponse(
                this.judgeService.create(this.judge));
        }
    }

    private subscribeToSaveResponse(result: Observable<Judge>) {
        result.subscribe((res: Judge) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Judge) {
        this.eventManager.broadcast({ name: 'judgeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackInfoById(index: number, item: Info) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-judge-popup',
    template: ''
})
export class JudgePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private judgePopupService: JudgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.judgePopupService
                    .open(JudgeDialogComponent as Component, params['id']);
            } else {
                this.judgePopupService
                    .open(JudgeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
