import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cake } from '../model/cake.model';
import { Message } from '../model/message.model';
import { User } from '../model/user.model';
import {Slide} from '../model/slide'
 
const cakeUrl = 'https://cakes-server.onrender.com/api/cakes'
const ingredientsUrl = 'https://cakes-server.onrender.com/api/ingredients'
const userUrl = 'https://cakes-server.onrender.com/api/user'
const messageUrl = 'https://cakes-server.onrender.com/api/messages'
const slideShowUrl = 'https://cakes-server.onrender.com/api/slideshow'


@Injectable({
  providedIn: 'root'
})


export class CakeService {

  constructor(private http: HttpClient) { }

  
    getCakes(params?: any): Observable<Cake[]> {
      let queryParams = {};
      if (params) {
        queryParams = {
          params: new HttpParams()
          .set('filter', params.filter && JSON.stringify(params.filter) || '')
          .set('sort', params.sort || '')
          .set('sortDirection', params.sortDirection || '')
        }
      }
      return this.http.get(`${cakeUrl}`, queryParams).pipe(map((data: any) => {
        return data && data.map((x: any) => new Cake(x))
      }))
    }


    getIngredients(): Observable<[]> {
      return this.http.get(ingredientsUrl).pipe(map((data: any) => {
        return data && data.map((elem: any) => new Array(elem)) || []
      }))
        
    }

    getDetails(cakeId: number): Observable<Cake> {
      return this.http.get(`${cakeUrl}/${cakeId}`).pipe(map((data: any) => {
        return new Cake(data)
      }))
    
  }

  getUser(): Observable<User[]> {
    return this.http.get(`${userUrl}`).pipe(map((data: any) => {
      return data && data.map((el: any) => new User(el))
    }))
  }

  putUser(userId: number, user: any): Observable<User> {
    return this.http.put(`${userUrl}/${userId}`, user).pipe(map((data: any) => new User(data)))
  }

  postMessage(msg: any): Observable<Message> {
    return this.http.post(`${messageUrl}`, msg).pipe(map((data: any) => new Message(data)))
    }

    getSlide(): Observable<Slide[]> {
      return this.http.get(`${slideShowUrl}`).pipe(map((data: any) => {
        return data && data.map((el: any) => new Slide(el))
      }))
    }

  }
    





