<?php

class Product{
	private $name;
	private $price;
	private $weight;
	private $description;
	private $tags;
	private $category;
	private $images;

	public function __construct($name, $price, $weight, $description, $tags, $category, $images){
        $this->name = $name;
        $this->price = $price;
        $this->weight = $weight;
        $this->description = $description;
        $this->tags = $tags;
        $this->category = $category;
        $this->images = $images;
    }
}