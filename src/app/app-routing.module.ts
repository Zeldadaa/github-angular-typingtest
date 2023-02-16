import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypingQuoteComponent } from './typing-quote/typing-quote.component';

const routes: Routes = [
  //path為空白時，要導向哪個path
  { path: '', redirectTo: 'quote', pathMatch: 'full' },
  //設定各個參數要導向的Component
  { path: 'quote', component: TypingQuoteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
