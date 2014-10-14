App.Views.UploadFile = Backbone.View.extend({
  tagName: "li",
  template: _.template($("#upload_file-template").html()),

  events: {
    "click a.cancel_upload_file": "cancel",
  },

  initialize: function() {
    console.log("initialize upload file view.");
    _.bindAll(this, "render");
    this.listenTo(this.model, "destroy remove reset", this.remove);
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "onStartUpload", this.onStartUpload);
    console.log(this.$el);
  },

  onStartUpload: function() {
    console.log("onStart Upload.");
    $("a.cancel_upload_file").fadeOut("fast");
  },

  cancel: function() {
    console.log("upload cancel");
    this.model.destroy();
  },

  render: function() {
    console.log("render");
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },


});