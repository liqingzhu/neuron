<style type="text/css">

#mvp-p-nav .pages:after{
	content: '\20'; display:block; clear:both; height:0;	
}




</style>


<!-- 

tech:

1. 集合式的页面handler


每一次点击分页，会载入 .content 的内容

-->

<div id="mvp-p-nav">

	<div class="pages">
		<a href="/page/1" class="page" data-page="1">1</a>
		<a href="/page/2" class="page" data-page="2">2</a>
		<a href="/page/3" class="page" data-page="3">3</a>
	</div>
	
	<div class="content">
		
	</div>
</div>


<script type="text/javascript">

KM.provide(

['mvp/presenter', 'mvp/model', 'mvp/router', 'mvp/history', 'event/live', 'io/ajax'],  function(K, 
Presenter, Model, Router, History, Live, Ajax){


var NaviModel = K.Class({
	Extends: Model,

	_read: function(callback){
		new Ajax({
			method: 'GET',
			url: '/unit-test/mvp/handler/navi.php',
			data: {
				page: this.fetch('page')
			}
			
		}).on({
			success: function(rt){
				callback(rt);
			}
			
		}).send();
	}
});


var NaviView = K.Class({
	
	Implements: 'attrs',

	initialize: function(){
		this.subject = $('#mvp-p-nav');
	},
	
	render: function(data){
		this.subject.one('.content').text(data.content);
	}
	
});

K.Class.setAttrs(NaviView, {
	subject: {
		getter: function(){
			return this.subject;
		}
	}
});

var NaviPresenter = K.Class({
	Extends: Presenter,
	
	model: NaviModel,
	
	events: {
		'.page': {
			click: 'pageClicked'
		}
	},
	
	pageClicked: function(e){
		e.prevent();
	
		History.push({}, '', this.href);
	}
});


var navi = new NaviPresenter({
	view: new NaviView()
});

var router = new Router();

router.add('/page/:page', function(data){
	navi.init(data);
});

function routeURL(e){
	router.route(location.href);
};


History.on({
	pushstate: routeURL,
	popstate: routeURL
});

History.start();

	
});

</script>