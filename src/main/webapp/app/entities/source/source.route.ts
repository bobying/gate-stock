import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SourceComponent } from './source.component';
import { SourceDetailComponent } from './source-detail.component';
import { SourcePopupComponent } from './source-dialog.component';
import { SourceDeletePopupComponent } from './source-delete-dialog.component';

@Injectable()
export class SourceResolvePagingParams implements Resolve<any> {

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

export const sourceRoute: Routes = [
    {
        path: 'source',
        component: SourceComponent,
        resolve: {
            'pagingParams': SourceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.source.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'source/:id',
        component: SourceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.source.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sourcePopupRoute: Routes = [
    {
        path: 'source-new',
        component: SourcePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.source.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'source/:id/edit',
        component: SourcePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.source.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'source/:id/delete',
        component: SourceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.source.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
