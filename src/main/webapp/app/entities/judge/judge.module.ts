import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from '../../shared';
import {
    JudgeService,
    JudgePopupService,
    JudgeComponent,
    JudgeDetailComponent,
    JudgeDialogComponent,
    JudgePopupComponent,
    JudgeDeletePopupComponent,
    JudgeDeleteDialogComponent,
    judgeRoute,
    judgePopupRoute,
    JudgeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...judgeRoute,
    ...judgePopupRoute,
];

@NgModule({
    imports: [
        GateSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        JudgeComponent,
        JudgeDetailComponent,
        JudgeDialogComponent,
        JudgeDeleteDialogComponent,
        JudgePopupComponent,
        JudgeDeletePopupComponent,
    ],
    entryComponents: [
        JudgeComponent,
        JudgeDialogComponent,
        JudgePopupComponent,
        JudgeDeleteDialogComponent,
        JudgeDeletePopupComponent,
    ],
    providers: [
        JudgeService,
        JudgePopupService,
        JudgeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateJudgeModule {}
