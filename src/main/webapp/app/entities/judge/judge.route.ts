import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { JudgeComponent } from './judge.component';
import { JudgeDetailComponent } from './judge-detail.component';
import { JudgePopupComponent } from './judge-dialog.component';
import { JudgeDeletePopupComponent } from './judge-delete-dialog.component';

@Injectable()
export class JudgeResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const judgeRoute: Routes = [
    {
        path: 'judge',
        component: JudgeComponent,
        resolve: {
            'pagingParams': JudgeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.judge.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'judge/:id',
        component: JudgeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.judge.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const judgePopupRoute: Routes = [
    {
        path: 'judge-new',
        component: JudgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.judge.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'judge/:id/edit',
        component: JudgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.judge.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'judge/:id/delete',
        component: JudgeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.judge.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
