function(e,t,n){var i,a,o,r,s,l;n.link("meteor/jquery",{$:function(e){i=e}},0),n.link("meteor/meteor",{Meteor:function(e){a=e}},1),n.link("meteor/momentjs:moment",{moment:function(e){o=e}},2),n.link("meteor/templating",{Template:function(e){r=e}},3),n.link("meteor/ostrio:flow-router-extra",{FlowRouter:function(e){s=e}},4),n.link("meteor/reactive-var",{ReactiveVar:function(e){l=e}},5),n.link("./listing-row.jade");var c=new l(!1);r.listingRow.onCreated(function(){var e=this;this.showPreview=function(){return!!(e.data.isImage&&/png|jpe?g/i.test(e.data.extension)&&e.data.versions.thumbnail40)}}),r.listingRow.helpers({removedIn:function(){return o(this.meta.expireAt).fromNow()},showPreview:function(){return r.instance().showPreview()},showSettings:function(){return c.get()===this._id}}),r.listingRow.events({"click [data-remove-file]":function(e){e.stopPropagation(),e.preventDefault();var t=i(e.currentTarget).find("i.la");t.removeClass("la-trash-o").addClass("la-circle-o-notch la-spin"),this.remove(function(e){e&&(console.log(e),t.addClass("la-trash-o").removeClass("la-circle-o-notch la-spin"))})},"click [data-change-access]":function(e){var t;e.stopPropagation(),e.preventDefault(),i(e.currentTarget).find("i.la").removeClass("la-eye-slash la-eye").addClass("la-circle-o-notch la-spin"),a.call("changeAccess",this._id,function(e){e&&console.log(e)})},"click [data-change-privacy]":function(e){var t;e.stopPropagation(),e.preventDefault(),i(e.currentTarget).find("i.la").removeClass("la-lock la-unlock").addClass("la-spin la-spinner"),a.call("changePrivacy",this._id,function(e){e&&console.log(e)})},"click [data-show-file]":function(e){return e.preventDefault(),s.go("file",{_id:this._id}),!1},"click [data-show-settings]":function(e){return e.stopPropagation(),e.preventDefault(),c.set(c.get()!==this._id&&this._id),!1},"click [data-close-settings]":function(e){return e.stopPropagation(),e.preventDefault(),c.set(!1),!1}})}

