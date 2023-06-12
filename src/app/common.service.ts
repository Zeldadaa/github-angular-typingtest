import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { C_QUOTE, C_STORY, C_WORD, DataAdapter } from './common.class';


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
   * 取API資料-Quote
   * @return {*} 
   * @memberof CommonService
   */
  getQuoteData() {
    const url = 'https://api.quotable.io/random';

    //API取回資料，是Observable型態
    const apiDataArray = this.http.get<any>(url).pipe(shareReplay(1));
    //透過common.service.ts檔中的function將api資料轉換成自訂Class的資料
    const ret = apiDataArray.pipe(map((data) => {
      return this.dataAdapter.adpater(C_QUOTE, data);
    }));
    // ret.subscribe(s=>{
    //   console.log('DATA',s);
    // })

    return ret;
  }




  /**
   * stroy資料 - set；這個參數設定為null，就能重新取新資料
   * @type {(Observable<C_STORY> | null)}
   * @memberof CommonService
   */
  _storyData$: Observable<C_STORY> | null = null;
  
   /**
   * story資料 - get；讀取、顯示資料呼叫這個參數
   * @readonly
   * @memberof CommonService
   */
 get storyData$() {
   let ret = this._storyData$;
   if (!ret) {
    ret = this.getStoryData();
    this._storyData$ = ret;
  }
  return ret;
}

/**
 * 取API資料-Story
 * @return {*} 
 * @memberof CommonService
 */
getStoryData() {
  const url = 'https://shortstories-api.onrender.com/';

  //API取回資料，是Observable型態
  const apiDataArray = this.http.get<any>(url).pipe(shareReplay(1));
  //透過common.service.ts檔中的function將api資料轉換成自訂Class的資料
  const ret = apiDataArray.pipe(map((data) => {
    // console.log('StroyData:',data)
    return this.dataAdapter.adpater(C_STORY, data);
  }));


  return ret;
}


///

  /**
   * word資料 - set；這個參數設定為null，就能重新取新資料
   * @type {(Observable<C_WORD> | null)}
   * @memberof CommonService
   */
  _wordData$: Observable<C_WORD> | null = null;


  /**
   * story資料 - get；讀取、顯示資料呼叫這個參數
   * @readonly
   * @memberof CommonService
   */
  get wordData$() {
    let ret = this._wordData$;
    if (!ret) {
      ret = this.getWordData();
    }
    return ret;
  }


  /**
   * 取API資料-Word
   * @return {*} 
   * @memberof CommonService
   */
  getWordData() {
    const url = 'https://random-word-api.herokuapp.com/word?number=100';

    //API取回資料，是Observable型態
    const apiDataArray = this.http.get<any>(url).pipe(shareReplay(1));
    //透過common.service.ts檔中的function將api資料轉換成自訂Class的資料
    const ret = apiDataArray.pipe(map((data) => {
      return this.dataAdapter.adpater(C_WORD, data);
    }))

    return ret;
}




}
