import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Info } from './info.model';
import { InfoPopupService } from './info-popup.service';
import { InfoService } from './info.service';
import { Source, SourceService } from '../source';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-info-dialog',
    templateUrl: './info-dialog.component.html'
})
export class InfoDialogComponent implements OnInit {

    info: Info;
    isSaving: boolean;

    sources: Source[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private alertService: JhiAlertService,
        private infoService: InfoService,
        private sourceService: SourceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.sourceService.query()
            .subscribe((res: ResponseWrapper) => { this.sources = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.info.id !== undefined) {
            this.subscribeToSaveResponse(
                this.infoService.update(this.info));
        } else {
            this.subscribeToSaveResponse(
                this.infoService.create(this.info));
        }
    }

    private subscribeToSaveResponse(result: Observable<Info>) {
        result.subscribe((res: Info) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Info) {
        this.eventManager.broadcast({ name: 'infoListModification', content: 'OK'});
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

    trackSourceById(index: number, item: Source) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-info-popup',
    template: ''
})
export class InfoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private infoPopupService: InfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.infoPopupService
                    .open(InfoDialogComponent as Component, params['id']);
            } else {
                this.infoPopupService
                    .open(InfoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
