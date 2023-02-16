import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TypingQuoteComponent } from './typing-quote/typing-quote.component';
import { TypingIndexComponent } from './typing-index/typing-index.component';

@NgModule({
  declarations: [
    AppComponent,
    TypingQuoteComponent,
    TypingIndexComponent
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
