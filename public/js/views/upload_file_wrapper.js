(function(window) {
  var root = window;
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
      _.bindAll(this, "fileSelected", "render", "renderOne", "renderPlaylists");
      this.listenTo(this.collection, "add", this.renderOne);
      this.listenTo(this.collection, "reset", this.render);
      this.$uploadForm = $("form#upload_music_form", this.$el);
      this.$uploadAudioFiles = $("input#upload_audio_files", this.$uploadForm);
      this.$uploadMusicList = $("ul#upload_music_list", this.$el);
      this.$uploadUserName = $("input#upload_user_id", this.$el);
      this.$targetPlaylistList = $("ul#target_playlist_list", this.$el);
      this.playlistCollection = root.playlistCollection;
      this.listenTo(this.playlistCollection, "add", this.renderOnePlaylist);
      this.listenTo(this.playlistCollection, "reset", this.renderPlaylists);
    },

    show: function() {
      if (this.visible) return;
      this.playlistCollection.each(function(model) {
        model.set("target_select", false);
      });
      this.visible = true;
    },

    render: function() {
      console.log("render upload file wrapper");
      this.collection.each(this.renderOne, this);
      return this;
    },

    renderPlaylists: function() {
      this.playlistCollection.each(this.renderOnePlaylist, this);
      return this;
    },

    renderOnePlaylist: function(playlist) {
      var playlistItemView = new App.Views.Playlist({
        model: playlist,
        type: App.Views.Playlist.PLAYLIST_TYPE.TARGET
      });
      this.$targetPlaylistList.append(playlistItemView.render().el);
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
      this.$uploadMusicList.append(uploadFileItemView.render().el);
      console.log("created uploadFileItemView");
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
      if (!user) return false;
      var targetPlaylists = this.playlistCollection.getTargetPlaylists();
      this.collection.chain().reject(function(model) {
        return model.get("complete") || function() {
          model.set("user", user);
          model.set("playlists", JSON.stringify(targetPlaylists));
          model.trigger("onStartUpload");
          return false;
        }();
      }).each(function(model) {
        model.save(null, {
          success: function(model) {
            model.set("complete", true);
          },
          error: function(error) {
            console.error(error);
          }
        })
      });

      return true;
    }
  });
})(this);