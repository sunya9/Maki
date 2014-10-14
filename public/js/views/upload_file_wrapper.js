App.Views.UploadFileWrapper = Backbone.View.extend({
  el: "#upload_music_dialog",

  events: {
    "change input#upload_audio_files": "fileSelected",
    "reset form#upload_music_form": "resetForm",
    "submit form#upload_music_form": "upload"
  },

  initialize: function() {
    console.log("initialize upload file wrapper");
    this.collection = new App.Collections.UploadFile();
    _.bindAll(this, "fileSelected", "render", "renderOne");
    this.listenTo(this.collection, "add", this.renderOne);
    this.listenTo(this.collection, "reset", this.render);
    this.$uploadForm = $("form#upload_music_form", this.$el);
    this.$uploadAudioFiles = $("input#upload_audio_files", this.$uploadForm);
    this.$uploadMusicList = $("ul#upload_music_list", this.$el);
    this.$uploadUserName = $("input#upload_user_id", this.$el);
  },

  render: function() {
    console.log("render upload file wrapper");
    this.collection.each(this.renderOne, this);
    return this;
  },

  resetForm: function() {
    console.log("reset form", this.collection);
    // _.invoke(this.collection.models, 'destroy');
    _.chain(this.collection.map()).invoke("destroy");
    // this.collection.reset();
  },

  renderOne: function(uploadFile) {
    console.log("upload file wrapper renderOne.", uploadFile);
    var uploadFileItemView = new App.Views.UploadFile({
      model: uploadFile,
    });
    console.log("created uploadFileItemView");
    this.$uploadMusicList.append(uploadFileItemView.render().el);
  },

  resetFileButton: function() {
    var clone = this.$uploadAudioFiles.clone(true);
    this.$uploadAudioFiles.replaceWith(this.$uploadAudioFiles = clone);
  },

  fileSelected: function() {
    console.log("music selected", $("input#upload_audio_files").get()[0].files);
    // new files array
    var files = _.map($("input#upload_audio_files").get()[0].files, function(file) {
      return new App.Models.UploadFile({
        name: file.name,
        size: file.size,
        type: file.type,
        files: file
      });
    });
    this.resetFileButton();
    console.log("files", files);
    console.log("this.collection", this.collection);
    this.collection.add(files, {
      parse: true
    });
  },

  upload: function(e) {
    e.preventDefault();
    var user = this.$uploadUserName.val();
    if(!user) return false;
    this.collection.chain().reject(function(model) {
      model.set("user", user);
      model.trigger("onStartUpload");
      return model.get("complete")
    }).each(function(model){
      model.save(null, {
        success : function(model){
          model.set("complete", true);
        },
        error : function(error){
          console.error(error);
        }
      })
    });

    return true;
  }
});