import { Http, Response, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DataService {
    
    public _baseUri: string;

    constructor( @Inject(Http) public http: Http) {

        // we need to derieve a class from Http and use it to inject the authentication token into the header
        // so we send it whenever we make a request to the server
        //this.http._defaultOptions.headers.set('__requestverificationtoken', document.getElementById('antiForgeryForm').childNodes[1].nodeValue.toString());
    }

    createAuthorizationHeader(headers: Headers) {
        var antiForgeryToken = document.getElementById('antiForgeryForm').childNodes[1].attributes.getNamedItem("value").nodeValue;
        console.log(antiForgeryToken);
        //headers.append('Authorization', 'Basic ' +
        //    btoa('username:password'));
    }

    set(baseUri: string): void {
        this._baseUri = baseUri;
    }

    get(data?: any) {
        return this.http.get(this._baseUri, data)
            //.do(this.logData)
            .map(response => {
                //console.log(response.json());
                return <Response>response.json();
            });
    }

    post(data: any) {
        return this.http.post(this._baseUri, data)
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractData);
    }

    delete(data: any) {
        return this.http.delete(this._baseUri, data)
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractData);
    }

    private extractData(res: Response) {
        if (res.headers.get('Content-Type') === 'text/html; charset=utf-8' && res.text()[0] == '<') {
            console.error('Response Invalid');
            console.error({
                Content_type: 'text/html; charset=utf-8',
                URI: this._baseUri,
                Response: res
            });
            return res;
        }
        else if (res.headers.get('Content-Type') === 'application/octet-stream')
        {
            return res.text();
        }
        let body = <any>res.json();
        return body || [];
    }

    private logData(data) {
        console.log('Response from post data.service.ts');
        console.log(data);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    /*
    private extractDatalist(res: Response) {
        if (res) {
            if (res.headers.get('Content-Type') === 'text/html; charset=utf-8' && res.text()[0] === '<') {
                console.log(res);
                console.error('Response Invalid');
                console.error({
                    Content_type: 'text/html; charset=utf-8',
                    URI: res.url,
                    Response: res
                });
                return res;
            }
            let body = <any[]>res.json();
            return body;
        }
        return null;
    }*/
}