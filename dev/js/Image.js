(function(keley,$,undefined){

	keley.Image = function(name, path){

		var self = this;
		var name = name;
		var path = "";

		this.getName = function(){
			return name;
		}
		this.getPath= function(){
			return path;
		}

		this.setName = function(n){
			name = n;
		}
		this.setPath= function(p){
			path = p;
		}
	}
});