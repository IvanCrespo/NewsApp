import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/index';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild( IonInfiniteScroll ) infiniteScroll: IonInfiniteScroll;

  public articles: Article[] = [];

  constructor(
    private newService: NewsService
  ) { }

  ngOnInit(): void {
    /* 1er forma para traer datos del Observable */
    /* this.newService.getTopHeadLines().subscribe(articles => this.articles.push(...articles)); */
    this.newService.getTopHeadLines().subscribe(articles => {
      /* console.log(articles); */
      /* 2nd forma */
      /* this.articles = [...articles, ...this.articles]; */
      this.articles = articles;
    })
  }

  loadData() {
    this.newService.getTopHeadLinesByCategory('business', true)
      .subscribe(articles => {
        if(articles.length === this.articles.length){
          this.infiniteScroll.disabled = true;
          return;
        }
        this.articles = articles;
        this.infiniteScroll.complete();
      })
  }
}
