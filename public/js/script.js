// Compatibility for '$' variable.
(function($) {
  Backbone.emulateHTTP = true;

  /**
   * Post Model
   */
  var Post = Backbone.Model.extend({
    
    // Default attributes.
    defaults: {
      body: 'Empty post...'
    },
    
    // Ensure that each post has content.
    initialize: function() {
      if (!this.has('body')) {
        this.set({'body': this.defaults.content}); 
      }
    }
    
  });
  
  /**
   * Post Collection
   */
  var PostCollection = Backbone.Collection.extend({
    model: Post,
    url: '/posts'
  });
  
  /**
   * Post View
   */
  var PostView = Backbone.View.extend({
    tagName: 'li',
    className: 'post',
    
    events: {
      'click .remove': 'removePost'
    },
    
    initialize: function() {
      // Bind method scope.
      _.bindAll(this, 'render', 'removePost');
    },
    
    render: function() {
      // @todo: Replace with template logic.
      var postHtml = this.model.get('body');
      if (authenticated) {
        postHtml += '<a href="#" class="remove">Remove</a>';
      }
      $(this.el).html(postHtml);
      // For chainability.
      return this;
    },
    
    removePost: function(e) {
      e.preventDefault();
      this.model.destroy();
      $(this.el).fadeOut();
    }
  });
  
  /**
   * Application View
   */
  var AppView = Backbone.View.extend({
    el: $('body'),
    
    // Setup events.
    events: {
      'submit form#post': 'createPost'
    },
    
    // Initialize the application and render the existing posts.
    initialize: function() {
      var app = this;
      
      // Bind method scope.
      _.bindAll(this, 'createPost');
      
      // Store common jquery objects.
      app.bodyInput = $('form#post input[name="body"]');
      
      // Create a posts list.
      app.posts = new PostCollection();
      
      // Render posts added to the list.
      app.posts.bind('add', function(post) {
        var postView = new PostView({model: post});
        $('#posts ul').prepend(postView.render().el);
      });
      
      app.posts.bind('destroy', function(post) {
        app.posts.remove(post);
      });
      
      // Pull initial posts from the server.
      $.getJSON('/posts.json', function(response) {
        $.each(response, function(i, data) {
          var post = new Post({ 
            id: data._id,
            body: data.body,
            isodate: data.updatedAt
          });
          app.posts.add(post);
        });
      });
    },
    
    // Create a post from the form data.
    createPost: function(e) {
      e.preventDefault();
      var app = this;
      var date = new Date();          
      var post = new Post({
        body: app.bodyInput.val(),
        isodate: date.toISOString()
      });
      app.posts.add(post);
      app.bodyInput.val('');
      post.save();
    }
    
  });
  
  // Output dates in ISO.
  Date.prototype.toISOString = function() {
    var d = this;
    function pad(n){
        return (n < 10) ? ('0' + n) : n;
    }
    return d.getUTCFullYear() + '-' + 
    pad(d.getUTCMonth()+1) + '-' +
    pad(d.getUTCDate()) + 'T' +
    pad(d.getUTCHours()) + ':' +
    pad(d.getUTCMinutes()) + ':' +
    pad(d.getUTCSeconds()) + 'Z'
  };
  
  // When the DOM is ready, instatiate the application.
  $(function() {
    var appView = new AppView();
  });

})(jQuery);