import { BaseEntity } from './../../shared';

export class Tracert implements BaseEntity {
    constructor(
        public id?: number,
        public days?: number,
        public increase_day?: number,
        public increase_total?: number,
        public sourceId?: number,
    ) {
    }
}
