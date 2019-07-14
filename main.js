var url = 'https://newsapi.org/v2/everything?q=cats&from=2019-01-01s&apiKey=21a6b9e98e4f49caa46879f6fc9a21b4';
var req = new Request(url);
var articles = [];

var articleComponent = {
    props: ['article', 'articles'],
    methods : {
        upVote : function(id){
            var art = this.articles.find(function(article){
                return article.id === id
            })
            art.votes += 1; 
        }
    },
    template: `<article class="media">
            <figure class="media-left">
                <img class="image is-64x64"
                v-bind:src="article.urlToImage">
            </figure>
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong>
                            <a v-bind:href="article.url"
                                class="has-text-info">{{article.title}}</a>
                            <span class="tag is-small">{{article.source.name}}</span>
                        </strong>
                        {{article.description}}   
                    </p>
                    <p class="is-clearfix">
                        <small class="is-size-7 is-pulled-left">
                            By: {{article.author}}
                        </small>
                        <small class="is-size-7 is-pulled-right">
                            {{article.publishedAt}}
                        </small>
                    </p>
                </div>
            </div>
            <div class="media-right">
                <div class="button is-small"
                        v-on:click="upVote(article.id)">
                    <span class="icon is-small">
                        <i class="fa fa-chevron-up"></i>
                    </span>
                    <strong class="has-text-info">{{article.votes}}</strong>
                </div>

            </div>
        </article>`
};

fetch(req)
    .then(function(response) {
        return response.json();
    }).then(function(resp){
        articles = resp.articles;
        articles.forEach(function(article, i) {
            article.votes = 0;
            article.id = i;
        });


        new Vue({
            el: '#app',
            data : {
                articles : articles
            },
            components : {
                articleComponent : articleComponent
            },
            computed: {
                sortedArticles : function(){
                    return this.articles.sort((a, b) => {
                        return b.votes - a.votes
                        });
                }
            }
        });
    
    });

