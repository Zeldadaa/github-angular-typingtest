import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { C_QUOTE, DataAdapter } from './common.class';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, private dataAdapter: DataAdapter) { }

  /**
   * quote資料 - set；這個參數設定為null，就能重新取新資料
   * @type {(Observable<C_QUOTE>| null)}
   * @memberof CommonService
   */
  _quoteData$: Observable<C_QUOTE>| null = null;

  /**
   * quote資料 - get；讀取、顯示資料呼叫這個參數
   * @readonly
   * @memberof CommonService
   */
  get quoteData$() {
    let ret = this._quoteData$;
    if (!ret) {
      ret = this.getQuoteData();
      this._quoteData$ = ret;
    }
    return ret;
  }

  /**
   * API取得Quote資料
   * @return {*} 
   * @memberof CommonService
   */
  getQuoteData() {
    const url = 'https://api.quotable.io/random';

    //API取回資料，是Observable型態
    const apiDataArray = this.http.get<any>(url).pipe(shareReplay(1));
    //透過model.ts檔中的function將api資料轉換成自訂Class的資料
    const ret = apiDataArray.pipe(map((data) => {
      return this.dataAdapter.adpater(C_QUOTE, data);
    }));
    // ret.subscribe(s=>{
    //   console.log('DATA',s);
    // })

    return ret;
  }







}
