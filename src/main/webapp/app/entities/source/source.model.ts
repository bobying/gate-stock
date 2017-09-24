import { BaseEntity } from './../../shared';

export class Source implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public title?: string,
        public desc?: any,
        public media?: string,
        public url?: string,
        public stock?: string,
    ) {
    }
}
