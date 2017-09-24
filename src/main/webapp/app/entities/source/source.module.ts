import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from '../../shared';
import {
    SourceService,
    SourcePopupService,
    SourceComponent,
    SourceDetailComponent,
    SourceDialogComponent,
    SourcePopupComponent,
    SourceDeletePopupComponent,
    SourceDeleteDialogComponent,
    sourceRoute,
    sourcePopupRoute,
    SourceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...sourceRoute,
    ...sourcePopupRoute,
];

@NgModule({
    imports: [
        GateSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SourceComponent,
        SourceDetailComponent,
        SourceDialogComponent,
        SourceDeleteDialogComponent,
        SourcePopupComponent,
        SourceDeletePopupComponent,
    ],
    entryComponents: [
        SourceComponent,
        SourceDialogComponent,
        SourcePopupComponent,
        SourceDeleteDialogComponent,
        SourceDeletePopupComponent,
    ],
    providers: [
        SourceService,
        SourcePopupService,
        SourceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateSourceModule {}
