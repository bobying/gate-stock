import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from '../../shared';
import {
    InfoService,
    InfoPopupService,
    InfoComponent,
    InfoDetailComponent,
    InfoDialogComponent,
    InfoPopupComponent,
    InfoDeletePopupComponent,
    InfoDeleteDialogComponent,
    infoRoute,
    infoPopupRoute,
    InfoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...infoRoute,
    ...infoPopupRoute,
];

@NgModule({
    imports: [
        GateSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        InfoComponent,
        InfoDetailComponent,
        InfoDialogComponent,
        InfoDeleteDialogComponent,
        InfoPopupComponent,
        InfoDeletePopupComponent,
    ],
    entryComponents: [
        InfoComponent,
        InfoDialogComponent,
        InfoPopupComponent,
        InfoDeleteDialogComponent,
        InfoDeletePopupComponent,
    ],
    providers: [
        InfoService,
        InfoPopupService,
        InfoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateInfoModule {}
