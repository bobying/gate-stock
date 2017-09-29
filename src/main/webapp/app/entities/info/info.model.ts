import { BaseEntity } from './../../shared';

export class Info implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public title?: string,
        public desc?: any,
        public stock?: string,
        public sourceId?: number,
        public judgeId?: number,
        public increaseDays?: number,
        public increaseTotal?: string,
        public judgeScore?: number,
    ) {
    }
}
