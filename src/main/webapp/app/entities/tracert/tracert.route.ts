import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TracertComponent } from './tracert.component';
import { TracertDetailComponent } from './tracert-detail.component';
import { TracertPopupComponent } from './tracert-dialog.component';
import { TracertDeletePopupComponent } from './tracert-delete-dialog.component';

export const tracertRoute: Routes = [
    {
        path: 'tracert',
        component: TracertComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.tracert.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tracert/:id',
        component: TracertDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.tracert.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tracertPopupRoute: Routes = [
    {
        path: 'tracert-new',
        component: TracertPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.tracert.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tracert/:id/edit',
        component: TracertPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.tracert.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tracert/:id/delete',
        component: TracertDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.tracert.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
