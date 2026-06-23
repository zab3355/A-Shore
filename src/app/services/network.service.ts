import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class NetworkService {

  constructor(private http: HttpClient) { }

  // Sets header for requests
    getRequestHeader() {
      return new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
    }

  /**
   * @description GET Request - Returns a response json object if status code is 200. Else returns a message
   * @paFram url Request URL
   */
  httpGet(url: string) {
    return this.http.get(url, { headers: this.getRequestHeader() })
      .map((response: HttpResponse<any>) => {
        // Response without any issues.. return as it is
        return response as any;
      })
      .catch((error: any) => {
        // Error in response - Response status code other than 200
        const errorJson = error;

        // If the response has message property, just return it
        // Else return a generic error message and log the actual error if the app is running in dev mode
        if (errorJson.hasOwnProperty('message')) {
          return throwError(errorJson.message);
        } else {
          if (isDevMode()) {
            console.error({
              request_url: url,
              request_headers: this.getRequestHeader(),
              request_method: 'GET',
              error: errorJson
            });
          }
          return throwError('Something went wrong. Kindly contact Admin.');
        }
      });
  }

  /**
   * @description POST Request - Returns a response json object if status code is 200. Else returns a message
   * @param url Request URL
   */
  httpPost(url: string, requestBody: any) {
    return this.http.post(url, requestBody, { headers: this.getRequestHeader() })
      .map((response: HttpResponse<any>) => {
        // Response without any issues.. return as it is
        return response as any;
      })
      .catch((error: any) => {
        // Error in response - Response status code other than 200
        const errorJson = error;

        // If the response has message property, just return it
        // Else return a generic error message and log the actual error if the app is running in dev mode
        if (errorJson.hasOwnProperty('message')) {
          return throwError(errorJson.message);
        } else {
          if (isDevMode()) {
            console.error({
              request_url: url,
              request_headers: this.getRequestHeader(),
              request_method: 'POST',
              requestBody,
              error: errorJson
            });
          }
          return throwError('Something went wrong. Kindly contact Admin.');
        }
      });
  }

  /**
   * @description PUT Request - Returns a response json object if status code is 200. Else returns a message
   * @param url Request URL
   */
  httpPut(url: string, requestBody: any) {
    return this.http.put(url, requestBody, { headers: this.getRequestHeader() })
      .map((response: HttpResponse<any>) => {
        // Response without any issues.. return as it is
        return response as any;
      })
      .catch((error: any) => {
        // Error in response - Response status code other than 200
        const errorJson = error;

        // If the response has message property, just return it
        // Else return a generic error message and log the actual error if the app is running in dev mode
        if (errorJson.hasOwnProperty('message')) {
          return throwError(errorJson.message);
        } else {
          if (isDevMode()) {
            console.error({
              request_url: url,
              request_headers: this.getRequestHeader(),
              request_method: 'PUT',
              requestBody,
              error: errorJson
            });
          }
          return throwError('Something went wrong. Kindly contact Admin.');
        }
      });
  }

  /**
   * @description DELETE Request - Returns a response json object if status code is 200. Else returns a message
   * @param url Request URL
   */
  httpDelete(url: string, requestBody: any) {
    return this.http.request('delete', url, { headers: this.getRequestHeader(), body: requestBody })
      .map((response: HttpResponse<any>) => {
        // Response without any issues.. return as it is
        return response as any;
      })
      .catch((error: any) => {
        // Error in response - Response status code other than 200
        const errorJson = error;

        // If the response has message property, just return it
        // Else return a generic error message and log the actual error if the app is running in dev mode
        if (errorJson.hasOwnProperty('message')) {
          return throwError(errorJson.message);
        } else {
          if (isDevMode()) {
            console.error({
              request_url: url,
              request_headers: this.getRequestHeader(),
              request_method: 'DELETE',
              requestBody,
              error: errorJson
            });
          }
          return throwError('Something went wrong. Kindly contact Admin.');
        }
      });
  }

  /**
   * @description GET Request without a header - Returns a response json object if status code is 200. Else returns a message
   * @param url Request URL
   */
  httpHeaderlessGet(url) {
    return this.http.get(url)
      .map((response: HttpResponse<any>) => {
        // Response without any issues.. return as it is
        return response as any;
      })
      .catch((error: any) => {
        // Error in response - Response status code other than 200
        const errorJson = error;

        // If the response has message property, just return it
        // Else return a generic error message and log the actual error if the app is running in dev mode
        if (errorJson.hasOwnProperty('message')) {
          return throwError(errorJson.message);
        } else {
          if (isDevMode()) {
            console.error({
              request_url: url,
              request_headers: this.getRequestHeader(),
              request_method: 'GET',
              error: errorJson
            });
          }
          return throwError('Something went wrong. Kindly contact Admin.');
        }
      });
  }
}
