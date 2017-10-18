(function(keley,$,undefined){

	keley.Product = function(name, price, weight, description, tags, category, images){

		var self = this;
		var name = name;
		var price = price;
		var weight = weight;
		var description = description;
		var tags = tags;
		var category = category;
		var images = images;

		//Methode public
		this.getName = function(){
			return name;
		}
		this.getPrice = function(){
			return price;
		}
		this.getWeight = function(){
			return weight;
		}
		this.getDescription = function(){
			return description;
		}
		this.getTags = function(){
			return tags;
		}
		this.getCategory = function(){
			return category;
		}
		this.getImages = function(){
			return images;
		}	

		this.setName = function(n){
			name = n;
		}
		this.setPrice = function(p){
			price = p;
		}
		this.setWeight = function(w){
			weight = w;
		}
		this.setDescription = function(d){
			description = d;
		}
		this.setTags = function(t){
			tags = t;
		}
		this.setCategory = function(c){
			category = c;
		}
		this.setImages = function(i){
			images = i;
		}	

		this.save = function(){

		}
		this.delete = function(){

		}
	}
});