import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { CommonService } from '../common.service';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable, map } from 'rxjs';
import { C_WORD } from '../common.class';

@Component({
  selector: 'app-typing-word',
  templateUrl: './typing-word.component.html',
  styleUrls: ['./typing-word.component.scss']
})
export class TypingWordComponent implements OnInit {


  /**
   * 目前題目Index
   * @private
   * @memberof TypingWordComponent
   */
  private currentTypingWordIndex = 0;


  /**
   * 讀取Words資料
   * @readonly
   * @type {Observable<C_WORD>}
   * @memberof TypingWordComponent
   */
  get dataWords$(): Observable<C_WORD>{
    let ret = this.service._wordData$;
    //_wordData$資料是否null
    if (!ret) {
      ret = this.service.wordData$;
    }
    return ret;
  }


  /**
   * 題目陣列
   * @memberof TypingWordComponent
   */
  wordsSpanArray = this.dataWords$.pipe(map(m => m._words));
  




  constructor(private service: CommonService) {
    //參數設定為null，讓每次進到頁面都重新抓取新的API資料
    service._wordData$ = null;
  }

  ngOnInit(): void {
    //重設Index
    this.currentTypingWordIndex = 0;
    // document.querySelector("typingInput")?.addEventListener('input', (event) => { this.onInput(event); });
    // document.getElementById('typingInput')?.addEventListener('input', (event) => { this.onInput(event); });
  
   


  }

  
  public onStart() {
    
    let wordElementArray = document.querySelectorAll('.words-chars');
    let wordArray = Array.from(wordElementArray);
    let charElement = wordArray.at(0) as HTMLElement;
    charElement.classList.add('highlight');

    let inputElement = document.getElementById('typingInput') as HTMLInputElement;
    inputElement.focus();
    

}


  public onSpace(event: any) {
    let targetElement = event?.target as HTMLInputElement;
    //移除空白格
    let targetValue = targetElement.value.trim();

    let wordsElementArray = document.querySelectorAll('.words-chars');
    let wordsArray = Array.from(wordsElementArray);

    let wordElement = wordsArray.at(this.currentTypingWordIndex) as HTMLElement;
    // console.log(`題目：${wordElement.innerText}`);
    // console.log(`輸入：${targetElement.value}`);

    if (wordElement.innerText == targetValue) {
      console.log(wordElement.innerText == targetValue);

      //成功的Class
      // wordElement.classList.add('success');
      wordElement.classList.replace('highlight', 'success');

      //currentTypeIndex加一
      this.currentTypingWordIndex++;
      //input清空
      let typingInputElement = document.getElementById('typingInput') as HTMLInputElement;
      typingInputElement.value = '';

      let nextWord = wordsArray.at(this.currentTypingWordIndex) as HTMLElement;
      nextWord.classList.add('highlight');
      

    }



    

    // let highlightElement = document.getElementsByClassName('.highlight')[0] as HTMLElement;
    // highlightElement

    let wordDivElement = document.getElementById('wordDiv')as HTMLHtmlElement;
    wordDivElement.scrollTop = wordDivElement.scrollTop + 1;



  }





}
