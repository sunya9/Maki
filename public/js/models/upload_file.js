App.Models.UploadFile = Backbone.Model.extend({
  // idAttribute: "name",

  defaults: {
    name: "",
    size: 0,
    complete: false,
    progress: 0,
    duplicate: false,
    files : null,
    type: "",
  },

  onProgress: function(currentProgress) {
    this.set('progress', currentProgress);
  },

  sync: function(method, model, options) {

    if (method === "create") {
      var formData = new FormData();
      console.log("create", model.attributes);
      _.each(model.attributes, function(value, key) {
        formData.append(key, value);
      });
      var self = this;
      _.defaults(options || (options = {}), {
        data: formData,
        processData: false,
        contentType: false,
        xhr: function() {
          var xhr = $.ajaxSettings.xhr();
          xhr.upload.onprogress = function(event) {
            if (event.lengthComputable) {
              model.trigger("progress", event.loaded / event.total);
            }
          };
          xhr.upload.onload = function() {
            model.trigger("progress", 1);
          };
          xhr.onerror = function(err) {
            console.error(err);
          }
          return xhr;
        },
      });
    }
    return Backbone.sync.call(this, method, model, options);
  },

  initialize: function(attrs, options) {
    this.on("progress", this.onProgress, this);
  },

  parse: function(model) {
    if (model.error) {
      console.error(model.error.message);
      return null;
    } else {
      console.log("upload file parse", model);
      return model;
    }
  },

  validate: function(attrs, options) {
    if (attrs.name === "") {
      console.error("title must be not empty.");
    }
    if (attrs.type.indexOf("audio/") != 0) {
      console.error("file must be audio type.");
    }
  },
});