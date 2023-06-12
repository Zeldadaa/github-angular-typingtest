import { C_STORY } from './../common.class';
import { Observable, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-typing-story',
  templateUrl: './typing-story.component.html',
  styleUrls: ['./typing-story.component.scss']
})
export class TypingStoryComponent implements OnInit{


  /**
   * 讀取Story資料
   * @readonly
   * @type {Observable<C_STORY>}
   * @memberof TypingStoryComponent
   */
  get dataStory$():Observable<C_STORY> {
    let ret = this.service._storyData$;
    if (!ret) {
      ret = this.service.storyData$;
    }
    // this.splitStoryProcess(ret);
    return ret;
  }

  storySpanArray$: Observable<string[]> = this.dataStory$.pipe(map((m) => {
    const storyArray = m._story.split('');
    return storyArray;
  }));

//   storySpanArray$: Observable<string[]> = new Observable();

//   private splitStoryProcess(targetData:Observable<C_STORY>) {
//     let obStoryArray = targetData.pipe(map((m) => {
//       const storyArray = m._story.split('');
//       return storyArray;
//     }));
//     this.storySpanArray$ = obStoryArray;
// }


  constructor(private service:CommonService) {
    service._storyData$ = null;
  }


  ngOnInit(): void {
    this.dataStory$;
  }










}
