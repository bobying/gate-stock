import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tracert } from './tracert.model';
import { TracertService } from './tracert.service';

@Component({
    selector: 'jhi-tracert-detail',
    templateUrl: './tracert-detail.component.html'
})
export class TracertDetailComponent implements OnInit, OnDestroy {

    tracert: Tracert;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tracertService: TracertService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTracerts();
    }

    load(id) {
        this.tracertService.find(id).subscribe((tracert) => {
            this.tracert = tracert;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTracerts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tracertListModification',
            (response) => this.load(this.tracert.id)
        );
    }
}
