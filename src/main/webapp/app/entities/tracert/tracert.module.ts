import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from '../../shared';
import {
    TracertService,
    TracertPopupService,
    TracertComponent,
    TracertDetailComponent,
    TracertDialogComponent,
    TracertPopupComponent,
    TracertDeletePopupComponent,
    TracertDeleteDialogComponent,
    tracertRoute,
    tracertPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tracertRoute,
    ...tracertPopupRoute,
];

@NgModule({
    imports: [
        GateSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TracertComponent,
        TracertDetailComponent,
        TracertDialogComponent,
        TracertDeleteDialogComponent,
        TracertPopupComponent,
        TracertDeletePopupComponent,
    ],
    entryComponents: [
        TracertComponent,
        TracertDialogComponent,
        TracertPopupComponent,
        TracertDeleteDialogComponent,
        TracertDeletePopupComponent,
    ],
    providers: [
        TracertService,
        TracertPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateTracertModule {}
