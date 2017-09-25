import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tracert } from './tracert.model';
import { TracertPopupService } from './tracert-popup.service';
import { TracertService } from './tracert.service';

@Component({
    selector: 'jhi-tracert-delete-dialog',
    templateUrl: './tracert-delete-dialog.component.html'
})
export class TracertDeleteDialogComponent {

    tracert: Tracert;

    constructor(
        private tracertService: TracertService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tracertService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tracertListModification',
                content: 'Deleted an tracert'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tracert-delete-popup',
    template: ''
})
export class TracertDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tracertPopupService: TracertPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tracertPopupService
                .open(TracertDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
