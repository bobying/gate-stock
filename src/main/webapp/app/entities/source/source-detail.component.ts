import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Source } from './source.model';
import { SourceService } from './source.service';

@Component({
    selector: 'jhi-source-detail',
    templateUrl: './source-detail.component.html'
})
export class SourceDetailComponent implements OnInit, OnDestroy {

    source: Source;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private sourceService: SourceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSources();
    }

    load(id) {
        this.sourceService.find(id).subscribe((source) => {
            this.source = source;
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

    registerChangeInSources() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sourceListModification',
            (response) => this.load(this.source.id)
        );
    }
}
