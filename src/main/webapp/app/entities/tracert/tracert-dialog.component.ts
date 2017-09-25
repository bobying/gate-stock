import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tracert } from './tracert.model';
import { TracertPopupService } from './tracert-popup.service';
import { TracertService } from './tracert.service';
import { Info, InfoService } from '../info';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tracert-dialog',
    templateUrl: './tracert-dialog.component.html'
})
export class TracertDialogComponent implements OnInit {

    tracert: Tracert;
    isSaving: boolean;

    infos: Info[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private tracertService: TracertService,
        private infoService: InfoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.infoService.query()
            .subscribe((res: ResponseWrapper) => { this.infos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tracert.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tracertService.update(this.tracert));
        } else {
            this.subscribeToSaveResponse(
                this.tracertService.create(this.tracert));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tracert>) {
        result.subscribe((res: Tracert) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Tracert) {
        this.eventManager.broadcast({ name: 'tracertListModification', content: 'OK'});
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
    selector: 'jhi-tracert-popup',
    template: ''
})
export class TracertPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tracertPopupService: TracertPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tracertPopupService
                    .open(TracertDialogComponent as Component, params['id']);
            } else {
                this.tracertPopupService
                    .open(TracertDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
