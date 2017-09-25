import { BaseEntity } from './../../shared';

export class Info implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public title?: string,
        public desc?: any,
        public stock?: string,
        public sourceId?: number,
    ) {
    }
}
