function(e,t,n){var i,o,r;n.link("meteor/momentjs:moment",{moment:function(e){i=e}},0),n.link("meteor/mrt:filesize",{filesize:function(e){o=e}},1),n.link("meteor/templating",{Template:function(e){r=e}},2),n.link("./upload-row.jade"),r.uploadRow.helpers({estimateBitrate:function(){return o(this.estimateSpeed.get(),{bits:!0})+"/s"},getProgressClass:function(){var e=5*Math.ceil(this.progress.get()/5);return e>100&&(e=100),e},estimateDuration:function(){var e=i.duration(this.estimateTime.get()),t=""+e.hours();t.length<=1&&(t="0"+t);var n=""+e.minutes();n.length<=1&&(n="0"+n);var o=""+e.seconds();return o.length<=1&&(o="0"+o),t+":"+n+":"+o}}),r.uploadRow.events({"click [data-toggle-upload]":function(e){return e.preventDefault(),this.toggle(),!1}})}
