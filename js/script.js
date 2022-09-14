// Backbone Model

let Blog = Backbone.Model.extend({
  defaults: {
    author: "",
    title: "",
    url: "",
  },
});

// Back bone collections

let Blogs = Backbone.Collection.extend({});

// instantiate two blogs
let blog1 = new Blog({
  author: "Michael",
  title: "Michael's blog",
  url: "http://michaelblog.com",
});

let blog2 = new Blog({
  author: "John",
  title: "Johns Blog",
  url: "http://johnblog.com",
});

// Instantiate a Collection
let blogs = new Blogs([blog1, blog2]);

// Backbone Views one blog

let BlogView = Backbone.View.extend({
    model : new Blog(),
    tagName : 'tr',
    initialize: function(){
        this.template = _.template($('.blogs-list-template').html())
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()))
    }

});


// Backbone Views for all blogs

let BlogsView = Backbone.View.extend({
    model: blogs,
    el: $('blogs-list'),
    initialize: function(){
        this.model.on('add',this.render,this)
    },
    render: function(){
        let self = this;
        this.$el.html('');
        _each(this.model.toArray(), function(blog){
            self.$el.append((new BlogView({model:blog})).render().$el)
        })
    }

});

let blogsView = new BlogsView();

$(document).ready(function(){
    $('.add-blog').on('click' ,function(){
        let blog = new Blog({
            author: $('.author-input').val(),
            title : $('.title-input').val(),
            url: $('.url-input').val()
        });
        console.log(blog.toJSON());
        blogs.add(blog);

    })
})


