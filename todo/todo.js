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

		}
	})

	/**
	*Todo的一个集合，数据通过localStorage存储在本地。
	**/
	var TodoList = Backbone.Model.extend({
		model: Todo,

		locaStorage: new Backbone.locaStorage('todo')

	})

	
})(jQuery);