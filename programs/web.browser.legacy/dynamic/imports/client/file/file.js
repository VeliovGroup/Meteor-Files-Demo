function(e,t,i){var n,o,l,a,r,s;i.link("meteor/http",{HTTP:function(e){n=e}},0),i.link("meteor/meteor",{Meteor:function(e){o=e}},1),i.link("meteor/templating",{Template:function(e){l=e}},2),i.link("meteor/reactive-var",{ReactiveVar:function(e){a=e}},3),i.link("/imports/lib/core.js",{_app:function(e){r=e},Collections:function(e){s=e}},4),i.link("./file.jade");var f=!1,c=new a(!1),h=new a(!1),d=new a(!1),u=new a(!1),p=new a(!1),v=new a(!1);l.file.onRendered(function(){var e=this;if(v.set(!1),h.set(!1),this.data.file){if(this.data.file.isText||this.data.file.isJSON)this.data.file.size<65536?n.call("GET",this.data.file.link(),function(e,t){d.set(!0),e?console.error(e):~[500,404,400].indexOf(t.statusCode)||(t.content.length<65536?h.set(t.content):v.set(!0))}):v.set(!0);else if(this.data.file.isImage){var t=new Image,i;if(/png|jpe?g/i.test(this.data.file.type))t.onload=function(){d.set(!0)},t.onerror=function(){u.set(!0)},null!=this.data.file.versions&&null!=this.data.file.versions.preview&&this.data.file.versions.preview.extension?t.src=this.data.file.link("preview"):i=s.files.find(this.data.file._id).observeChanges({changed:function(n,o){null!=o&&null!=o.versions&&null!=o.versions.preview&&o.versions.preview.extension&&(t.src=e.data.file.link("preview"),i.stop())}});else t.onload=function(){c.set(!0)},t.onerror=function(){u.set(!0)},t.src=this.data.file.link()}else if(this.data.file.isVideo){var o=r.getElementFromView(this.view._domrange.parentElement,this.data.file._id);if(!o)return;if(o.canPlayType(this.data.file.type)){var l=o.play();("[object Promise]"===Object.prototype.toString.call(l)||"[object Object]"===Object.prototype.toString.call(l)&&l.then&&"[object Function]"===Object.prototype.toString.call(l.then))&&l.then(r.NOOP).catch(r.NOOP)}else u.set(!0)}else if(this.data.file.isAudio){var a=r.getElementFromView(this.view._domrange.parentElement,this.data.file._id);if(!a)return;if(a.canPlayType(this.data.file.type)){var f=a.play();("[object Promise]"===Object.prototype.toString.call(f)||"[object Object]"===Object.prototype.toString.call(f)&&f.then&&"[object Function]"===Object.prototype.toString.call(f.then))&&f.then(r.NOOP).catch(r.NOOP)}else u.set(!0)}window.IS_RENDERED=!0}else window.IS_RENDERED=!0}),l.file.helpers({warning:function(){return v.get()},getCode:function(){return this.type&&~this.type.indexOf("/")?this.type.split("/")[1]:""},isBlamed:function(){return!!~r.blamed.get().indexOf(this._id)},showInfo:function(){return p.get()},showError:function(){return u.get()},fetchedText:function(){return h.get()},showPreview:function(){return d.get()},showOriginal:function(){return c.get()}}),l.file.events({"click [data-blame]":function(e){e.preventDefault();var t=r.blamed.get();return~t.indexOf(this._id)?(t.splice(t.indexOf(this._id),1),r.blamed.set(t),o.call("unblame",this._id)):(t.push(this._id),r.blamed.set(t),o.call("blame",this._id)),!1},"click [data-show-info]":function(e){return e.preventDefault(),p.set(!p.get()),!1},"touchmove .file-overlay":function(e){return e.preventDefault(),!1},"touchmove .file":function(e,t){t.$(e.currentTarget).height()<t.$(".file-table").height()&&(t.$("a.show-info").hide(),t.$("h1.file-title").hide(),t.$("a.download-file").hide(),f&&o.clearTimeout(f),f=o.setTimeout(function(){t.$("a.show-info").show(),t.$("h1.file-title").show(),t.$("a.download-file").show()},768))}})}
