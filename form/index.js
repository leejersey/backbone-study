var User = Backbone.Model.extend({
	defaults:{
		name:'',
		email:'',
		username:'',
		password:'',
		passwordConf:''
	},

	initialize:function(){
		//配一个子模型存放无效的输入域
		this.set('invalid', new Invalid);
	}
})

var user = new User()

var SignupView = Backbone.View.extend({
	el:'#signup-form-wrapper',

	template:_.template($('#form-template').html()),

	events:{
		'change input':'inputChange'
	},

	initialize:function(){
		//绑定this上下文
		_bindAll(this,'inputChange');

		this.render()
	},

	render:function(){
		//将模型转化为一个对象
		var modelData = this.model.toJSON();

		modelData.invalid = data.invalid.toJSON();

		//插入到DOM中
		this.$el.html(this.template(modelData));
	},

	inputChange:function(e){
		var $input = $(e.target);

		//得到模型中键名
		var inputName = $input.attr('name');

		//在模型中设定新值
		this.model.set(inputName,$input.val());
	}

})

//创建视图新实例
var signupView = new SignupView({
	model:user
})