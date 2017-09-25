import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Judge } from './judge.model';
import { JudgePopupService } from './judge-popup.service';
import { JudgeService } from './judge.service';

@Component({
    selector: 'jhi-judge-delete-dialog',
    templateUrl: './judge-delete-dialog.component.html'
})
export class JudgeDeleteDialogComponent {

    judge: Judge;

    constructor(
        private judgeService: JudgeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.judgeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'judgeListModification',
                content: 'Deleted an judge'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-judge-delete-popup',
    template: ''
})
export class JudgeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private judgePopupService: JudgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.judgePopupService
                .open(JudgeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
