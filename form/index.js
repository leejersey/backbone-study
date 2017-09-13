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
		_.bindAll(this,'validateForm','inputChange');

		this.render()
	},

	render:function(){
		//将模型转化为一个对象
		var modelData = this.model.toJSON();
		console.log(modelData);
		modelData.invalid = modelData.invalid.toJSON();

		//插入到DOM中
		this.$el.html(this.template(modelData));
	},

	validateForm:function(){
		//将模型转化为一个对象
		var data = this.model.toJSON();
		data.invalid = data.invalid.toJSON();

		//检测邮箱
		var emialRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

		if(data.email.length && data.email.match(emialRegex)){
			//将它添加到invalid模型中
			this.model.get('invalid').set('emial','请输入正确的邮箱');
		}else{
			//移除
			this.model.get('invalid').unset('emial');
		}

		if(data.password.length && data.passwordConf.length && data.password!=data.passwordConf){
			this.model.get('invalid').set('password','密码不正确');
			this.model.get('invalid').set('passwordConf','重复密码不正确');
		}else{
			this.model.get('invalid').unset('password');
			this.model.get('invalid').unset('passwordConf');
		}

		//如果有无效的输入域，返回false,否则返回true
		if(_.size(this.model.get('invalid').toJSON())){
			return false;
		}else{
			return true;
		}		
	},

	inputChange:function(e){
		var $input = $(e.target);

		//得到模型中键名
		var inputName = $input.attr('name');

		//在模型中设定新值
		this.model.set(inputName,$input.val());

		//检测表单是否有效
		if(!this.validateForm()) this.render();
	}

})

//创建视图新实例
var signupView = new SignupView({
	model:user
})