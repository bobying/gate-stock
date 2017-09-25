import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Info } from './info.model';
import { InfoService } from './info.service';

@Component({
    selector: 'jhi-info-detail',
    templateUrl: './info-detail.component.html'
})
export class InfoDetailComponent implements OnInit, OnDestroy {

    info: Info;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private infoService: InfoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInfos();
    }

    load(id) {
        this.infoService.find(id).subscribe((info) => {
            this.info = info;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInfos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'infoListModification',
            (response) => this.load(this.info.id)
        );
    }
}
