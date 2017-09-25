import { BaseEntity } from './../../shared';

export class Judge implements BaseEntity {
    constructor(
        public id?: number,
        public score?: number,
        public increase_total?: number,
        public increase_days?: number,
        public infoId?: number,
    ) {
    }
}
