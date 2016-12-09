//(function($){
	var Band={};

	//创建模型
	Band.Member = Backbone.Model.extend({});

	//创建集合
	Band.Members = Backbone.Collection.extend({
		model : Band.Member
	});

	//组装集合
	var band = new Band.Members([
		{name : 'lee'},
		{name : 'jersey'},
		{name : 'pall'},
		{name : 'john'}
	]);

	//为每个乐队成员创建一个视图
	Band.Member.View = Backbone.View.extend({
		tagName :'li',

		render : function(){
			//把姓名加到列表条目中
			this.$el.text(this.model.get('name'));

			//将新的列表追加到父视图的列表中
			//console.log(this.parentView);
			console.log(this);
			this.parentView.$el.append(this.$el);

			return this;
		}
	});

	//为乐队创建一个视图
	Band.Members.View = Backbone.View.extend({
		el : '#band-wraper',

		initialize : function(){
			//console.log(this);
			//跟踪渲染函数分享"this"上下文
			_.bindAll(this,'render');

			//为集合添加各种事件
			this.collection.on('change',this.render);
			this.collection.on('add',this.render);
			this.collection.on('remove',this.render);

			this.render();

		},

		render : function(){

			//清空视图元素
			this.$el.empty();

			//进入循环前保留this
			var thisView = this;

			//循环所有元素，为每个元素创建一个视图
			this.collection.each(function(bandMember){
				var bandMemberView = new Band.Member.View({
					model : bandMember
				});

				//每个子视图内保存对这个视图的引用
				bandMemberView.parentView = thisView;

				//渲染
				bandMemberView.render();
			})

			return this;
		}
	});

	//创建乐队视图实例
	var bandView = new Band.Members.View({
		collection : band
	});

//})(jQuery)