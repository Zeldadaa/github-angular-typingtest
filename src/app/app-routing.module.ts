import { TypingStoryComponent } from './typing-story/typing-story.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypingIndexComponent } from './typing-index/typing-index.component';
import { TypingQuoteComponent } from './typing-quote/typing-quote.component';
import { TypingWordComponent } from './typing-word/typing-word.component';

const routes: Routes = [
  //path為空白時，要導向哪個path
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  //設定各個參數要導向的Component
  { path: 'index', component: TypingIndexComponent },
  { path: 'quote', component: TypingQuoteComponent },
  { path: 'story', component: TypingStoryComponent },
  { path: 'word', component: TypingWordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
