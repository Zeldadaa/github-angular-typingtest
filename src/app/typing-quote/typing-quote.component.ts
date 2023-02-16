import { CommonService } from './../common.service';
import { Component, OnInit } from '@angular/core';
import { Observable, map} from 'rxjs';
import { C_QUOTE } from '../common.class';

@Component({
  selector: 'app-typing-quote',
  templateUrl: './typing-quote.component.html',
  styleUrls: ['./typing-quote.component.scss']
})
export class TypingQuoteComponent implements OnInit {


  mistakeCount: number = 0;
  accuracy: number = 0;


  _startClick: boolean = false;

  _ResultShow: boolean = false;


  quotecharArray$: Observable<string[]> = new Observable();


  /**
   * 目前打字Index
   * @private
   * @memberof TypingQuoteComponent
   */
  private currentTypeIndex = 0;

  /**
   * 呼叫參數就能
   * @readonly
   * @type {Observable<C_QUOTE>}
   * @memberof TypingQuoteComponent
   */
  get dataQuote$(): Observable<C_QUOTE> {

    let ret = this.service._quoteData$;

    if (!ret) {
      console.log('null');
      ret = this.service.quoteData$;
    }

    this.splitContentProcess(ret);
    return ret;
  }



  /**
   * 「按下Enter鍵開始」 區塊 顯示字
   * @return {*}  {string}
   * @memberof TypingQuoteComponent
   */
  enterString(): string {
    let ret = 'Press Enter to Start!';
    if (this._ResultShow) {
      ret = 'Press Enter to Restart';
    }
    return ret;
  }




  constructor(private service: CommonService) {
    //參數設定為null，讓每次進到頁面都從quote API重新抓取新的quote資料
    this.service._quoteData$ = null;
  }

  ngOnInit(): void {

    document.body.addEventListener("keydown", (event) => { this.onKeyPress(event); });
    //呼叫參數
    // this.dataQuote$;
    // this.dataQuote$.subscribe(s => {
    //   console.log('quoteData', s);
    // });
  }


  /**
   * 字串拆分過程
   * @memberof TypingQuoteComponent
   */
  private splitContentProcess(targetData: Observable<C_QUOTE>) {
    //將一句名言，依字母拆分成陣列
    let obContentArray = targetData.pipe(map((m) => {
      console.log('LENGTH:', m._length);
      const quoteArray = m._content.split('');
      return quoteArray;
    }));
    this.quotecharArray$ = obContentArray;
  }



  private onKeyPress(event: KeyboardEvent) {
    //按下「Enter」鍵開始打字
    if (!this._startClick && !this._ResultShow && event.key == 'Enter') {
      this._startClick = !this._startClick;
      this.currentTypeIndex = 0;
    }
    //按「Enter」鍵重新開始
    else if (this._ResultShow && event.key == 'Enter') {
      this.service._quoteData$ = null;
      this.dataQuote$;
      this._ResultShow = !this._ResultShow;
      this.mistakeCount = 0;
    }
    //驗證打字
    else if (this._startClick) {
      this.typingValidProcess(event);
    }
  }



  private typingValidProcess(event: KeyboardEvent) {
    //取得名言的一個個字母，放進陣列中
    let quoteElementArray = document.querySelectorAll('.quote-chars');
    let quoteArray = Array.from(quoteElementArray);

    //依照index取得字母陣列中特定的值
    let charElement = quoteArray.at(this.currentTypeIndex) as HTMLElement;

    //對比字母跟打字輸入的是否一樣
    if (charElement.innerText == event.key) {
      //對比成功，加上class
      charElement.classList.add('success');
      // console.log(charElement.innerText);
      this.currentTypeIndex++;
    }
    else if (event.key.length == 1) {
      this.mistakeCount++;
    }

    //檢查全部是否都正確輸入
    let checkFinish = quoteArray.every((ele) => {
      return ele.classList.contains("success");
    });

    if (checkFinish) {
      console.log('Finished');
      this._startClick = !this._startClick;
      this._ResultShow = !this._ResultShow;

      //計算打字正確率
      this.accuracy = Math.round(((this.currentTypeIndex - this.mistakeCount) / this.currentTypeIndex) * 100);
    }
  }


  /**
   * EventHandler - 儲存成圖片
   * @param {MouseEvent} event
   * @memberof TypingQuoteComponent
   */
  public saveQuoteProcess(event: MouseEvent) {
    console.log('save click');

  }
















}
