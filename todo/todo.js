(function ($) {
	/**
	 * 基本todo模型属性：title,order,done
	 */
	var Todo = Backbone.Model.extend({
		default:{
			title:"请输入",
			order:Todo.nextOrder(),
			done:false
		},
		//设置任务完成状态
		toggle:function(){
			this.save({done:!this.get("done")});
		}
	});

	/**
	*Todo的一个集合，数据通过localStorage存储在本地。
	**/
	var TodoList = Backbone.Model.extend({
		model: Todo,

		locaStorage: new Backbone.locaStorage('todo'),

		//获取所有已经完成的任务数组
		done:function(){
			return this.where({done:true});
		},

		//获取未完成的任务数组
		remaining:function(){
			return this.where({done:false});
		},

		//获取下一个任务的排序序号，通过数据库中的记录数加1实现
		nextOrder:function(){
			if(!this.length){
				return 1;
			}

			//last获取collection中的最后一个元素
			return this.last().get('order') + 1;
		},

		//backbone内置属性,指明collection的排序规则
		comparator:'order'

	});

	//创建一个全局的Todo的collection对象
	var Todos = new TodoList;

	//列表view
	var TodoView = Backbone.View.extend({

		tagName :'li',

		template:_.template($('#item-template').html()),

		events:{
			"click .toggle" : "toggleDone",
			"dblclick .view" : "edit",
			"click a.destroy" : "clear",
			"keypress .edit" : "updateOnEnter",
			"blur .edit" : "close"
		},

		//在初始化时设置对model的change事件的监听
    	//设置对model的destroy的监听，保证页面数据和model数据一致
    	initialize:function(){
    		this.listenTo(this.model,'change',this.render);
    		//这个remove是view的中的方法，用来清除页面中的dom
    		this.listenTo(this.model,'destroy',this.remove);
    	},

    	render:function(){
    		//this.$el 当前的li
    		this.$el.html(this.template(this.model.toJSON()));
    		this.$el.toggleClass('done',this.model.get('done'));
    		this.input = this.$('.edit');
    		return this;
    	},

    	toggleDone:function(){
    		this.model.toggle();
    	},

    	edit:function(){

    	},

    	clear:function(){

    	},

    	updateOnEnter:function(){

    	},

    	close:function(){
    		
    	}
	});

	var AppView = Backbone.View.extend({

		//el:
	})

	
})(jQuery);