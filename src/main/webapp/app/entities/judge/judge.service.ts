import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Judge } from './judge.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class JudgeService {

    private resourceUrl = 'source/api/judges';
    private resourceSearchUrl = 'source/api/_search/judges';

    constructor(private http: Http) { }

    create(judge: Judge): Observable<Judge> {
        const copy = this.convert(judge);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(judge: Judge): Observable<Judge> {
        const copy = this.convert(judge);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Judge> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(judge: Judge): Judge {
        const copy: Judge = Object.assign({}, judge);
        return copy;
    }
}
