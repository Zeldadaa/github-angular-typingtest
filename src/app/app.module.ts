import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TypingQuoteComponent } from './typing-quote/typing-quote.component';
import { TypingIndexComponent } from './typing-index/typing-index.component';
import { TypingWordComponent } from './typing-word/typing-word.component';
import { TypingStoryComponent } from './typing-story/typing-story.component';

@NgModule({
  declarations: [
    AppComponent,
    TypingQuoteComponent,
    TypingIndexComponent,
    TypingWordComponent,
    TypingStoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
