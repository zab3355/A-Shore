import { Injectable, isDevMode } from '@angular/core';
//import { Http, RequestOptions, Headers, Response } from '@angular/http'; // yucky deprecated stuff
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http'; // yummy not-deprecated stuff
import { Observable, Subject, throwError } from 'rxjs';
import { } from 'rxjs/add/operator/map';
import {  } from 'rxjs/add/operator/catch';

@Injectable()

export class NetworkService {

  constructor(private http: HttpClient) { }

  // Sets header for requests
    getRequestHeader() {
      return new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
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
      .catch((error: HttpResponse<any>) => {
        // Error in response - Response status code other than 200
        const error_json = error;

        // If the response has message property, just return it
        // Else return a generic error message and log the actual error if the app is running in dev mode
        if (error_json.hasOwnProperty('message')) {
          return throwError(error_json['message']);
        } else {
          if (isDevMode()) {
            console.error({
              request_url: url,
              request_headers: this.getRequestHeader(),
              request_method: 'GET',
              error: error_json
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
  httpPost(url: string, request_body: any) {
    return this.http.post(url, request_body, { headers: this.getRequestHeader() })
      .map((response: HttpResponse<any>) => {
        // Response without any issues.. return as it is
        return response as any;
      })
      .catch((error: HttpResponse<any>) => {
        // Error in response - Response status code other than 200
        const error_json = error;

        // If the response has message property, just return it
        // Else return a generic error message and log the actual error if the app is running in dev mode
        if (error_json.hasOwnProperty('message')) {
          return throwError(error_json['message']);
        } else {
          if (isDevMode()) {
            console.error({
              request_url: url,
              request_headers: this.getRequestHeader(),
              request_method: 'POST',
              request_body: request_body,
              error: error_json
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
  httpPut(url: string, request_body: any) {
    return this.http.put(url, request_body, { headers: this.getRequestHeader() })
      .map((response: HttpResponse<any>) => {
        // Response without any issues.. return as it is
        return response as any;
      })
      .catch((error: HttpResponse<any>) => {
        // Error in response - Response status code other than 200
        const error_json = error;

        // If the response has message property, just return it
        // Else return a generic error message and log the actual error if the app is running in dev mode
        if (error_json.hasOwnProperty('message')) {
          return throwError(error_json['message']);
        } else {
          if (isDevMode()) {
            console.error({
              request_url: url,
              request_headers: this.getRequestHeader(),
              request_method: 'PUT',
              request_body: request_body,
              error: error_json
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
  httpDelete(url: string, request_body: any) {
    return this.http.request('delete', url, { headers: this.getRequestHeader(), body: request_body })
      .map((response: HttpResponse<any>) => {
        // Response without any issues.. return as it is
        return response as any;
      })
      .catch((error: HttpResponse<any>) => {
        // Error in response - Response status code other than 200
        const error_json = error;

        // If the response has message property, just return it
        // Else return a generic error message and log the actual error if the app is running in dev mode
        if (error_json.hasOwnProperty('message')) {
          return throwError(error_json['message']);
        } else {
          if (isDevMode()) {
            console.error({
              request_url: url,
              request_headers: this.getRequestHeader(),
              request_method: 'DELETE',
              request_body: request_body,
              error: error_json
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
      .catch((error: HttpResponse<any>) => {
        // Error in response - Response status code other than 200
        const error_json = error;

        // If the response has message property, just return it
        // Else return a generic error message and log the actual error if the app is running in dev mode
        if (error_json.hasOwnProperty('message')) {
          return throwError(error_json['message']);
        } else {
          if (isDevMode()) {
            console.error({
              request_url: url,
              request_headers: this.getRequestHeader(),
              request_method: 'GET',
              error: error_json
            });
          }
          return throwError('Something went wrong. Kindly contact Admin.');
        }
      });
  }
}
