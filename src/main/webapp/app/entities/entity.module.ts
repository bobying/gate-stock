import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GateSourceModule } from './source/source.module';
import { GateTracertModule } from './tracert/tracert.module';
import { GateJudgeModule } from './judge/judge.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GateSourceModule,
        GateTracertModule,
        GateJudgeModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateEntityModule {}
