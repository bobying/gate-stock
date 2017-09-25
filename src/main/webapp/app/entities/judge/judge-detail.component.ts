import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Judge } from './judge.model';
import { JudgeService } from './judge.service';

@Component({
    selector: 'jhi-judge-detail',
    templateUrl: './judge-detail.component.html'
})
export class JudgeDetailComponent implements OnInit, OnDestroy {

    judge: Judge;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private judgeService: JudgeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJudges();
    }

    load(id) {
        this.judgeService.find(id).subscribe((judge) => {
            this.judge = judge;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJudges() {
        this.eventSubscriber = this.eventManager.subscribe(
            'judgeListModification',
            (response) => this.load(this.judge.id)
        );
    }
}
