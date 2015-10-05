$(function() {
  if (/mobile|tablet/i.test(navigator.userAgent.toLowerCase())){
    window.location.replace("https://hypelist.typeform.com/to/zGLp4N");}
  else{
    (function() {
      var qs, js, q, s, d = document,
        gi = d.getElementById,
        ce = d.createElement,
        gt = d.getElementsByTagName,
        id = 'typef_orm',
        b = 'https://s3-eu-west-1.amazonaws.com/share.typeform.com/';
      if (!gi.call(d, id)) {
        js = ce.call(d, 'script');
        js.id = id;
        js.src = b + 'widget.js';
        q = gt.call(d, 'script')[0];
        q.parentNode.insertBefore(js, q)
      }
    })()}
});
