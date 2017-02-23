var gruvslide = gruvslide || {};
var exports = exports || {};

(function() {
  "use strict";

  gruvslide.current = 0;
  gruvslide.maxSlides = 0;
  gruvslide.slideCache = null;

  gruvslide.cachedHead = null;
  // gruvslide.CSS_ENTRY = '/css/main.css';
  gruvslide.JS_ENTRY = '/js/main.js';
  gruvslide.CSS_FILE = 'gruvslide.min.css';
  gruvslide.fullPath = null;

  gruvslide.init = function() {
    // cache the slides
    gruvslide.slideCache = gruvslide.slides();
    // and the length
    gruvslide.maxSlides = gruvslide.slideCache.length;
    // and the path to this script
    gruvslide.fullPath = gruvslide.scriptPath(document.getElementsByTagName("script"));

    gruvslide.changeSlide(0);
    gruvslide.current = 0;

    // Add some meta headers that org-mode export doesn't do
    gruvslide.writeMeta({ 'charset': 'utf-8' });
    gruvslide.writeMeta({ 'http-equiv': 'X-UA-Compatible', 'content': "IE=edge,chrome=1" });
    gruvslide.writeMeta({ 'name': "viewport", 'content': "width=device-width, initial-scale=1" });

  };

  gruvslide.isLocalPath = function(path) {
    if (path.toString().match(/^http/) || path.toString().match(/^file/)) {
      return false;
    }
    return true;
  };

  gruvslide.scriptPath = function(scriptsArray) {
    if (gruvslide.fullPath) {
      return gruvslide.fullPath;
    }
    var givenPath = scriptsArray[scriptsArray.length - 1].src;
    var parts = givenPath.split('/');
    parts.pop();
    var newPath = parts.join("/");
    return newPath + '/';
  };

  gruvslide.writeStyle = function(path) {
    gruvslide.cachedHead = gruvslide.cachedHead || document.getElementsByTagName("head")[0];
    var link = document.createElement('link');
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", path);
    gruvslide.cachedHead.appendChild(link);
  };

  gruvslide.writeScript = function(path) {
    gruvslide.cachedHead = gruvslide.cachedHead || document.getElementsByTagName("head")[0];
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", path);
    gruvslide.cachedHead.appendChild(script);
  };

  gruvslide.writeMeta = function(settings) {
    gruvslide.cachedHead = gruvslide.cachedHead || document.getElementsByTagName("head")[0];
    var meta = document.createElement('meta');

    for (var k in settings) {
      meta.setAttribute(k, settings[k]);
    }

    gruvslide.cachedHead.appendChild(meta);
  };

  gruvslide.findThemePath = function() {
    var metas = document.getElementsByTagName("meta");
    var mlen = metas.length;
    for (var x = 0; x < mlen; x++) {
      var metaName = metas[x].getAttribute('name');
      if (metaName === 'gruvslide-theme') {
        return metas[x].getAttribute('value');
      }
    }
  };

  gruvslide.slides = function() {
    if (gruvslide.slideCache) {
      return gruvslide.slideCache;
    }
    return document.getElementsByClassName('outline-2');
  };

  gruvslide.changeSlide = function(to) {
    if (to >= gruvslide.maxSlides || to < 0) {
      return;
    }
    var current = document.getElementsByClassName('current');
    var previous = document.getElementsByClassName('previous');

    if (previous[0]) {
      gruvslide.removeClass(previous[0], 'previous');
    }

    if (current[0]) {
      gruvslide.replaceClass(current[0], 'current', 'previous');
    }

    gruvslide.slides()[to].className += ' current';
    gruvslide.current = to;
  };

  gruvslide.nextSlide = function() {
    gruvslide.changeSlide(gruvslide.current + 1);
  };

  gruvslide.previousSlide = function() {
    gruvslide.changeSlide(gruvslide.current - 1);
  };

  gruvslide.removeClass = function(element, theClass) {
    var re = new RegExp(theClass, "g");
    element.className = element.className.replace(re, '');
  };

  gruvslide.replaceClass = function(element, origClass, newClass) {
    var re = new RegExp(origClass, "g");
    element.className = element.className.replace(re, newClass);
  };

  gruvslide.handleKeyDown = function(e) {
    if (e.keyCode === 40 || e.keyCode === 39 | e.keyCode === 32 | e.keyCode === 74) {
      gruvslide.nextSlide();
      e.preventDefault();
      return false;
    } else if (e.keyCode === 38 || e.keyCode === 37 || e.keyCode === 8 || e.keyCode === 75) {
      gruvslide.previousSlide();
      e.preventDefault();
      return fals;
    }
    return false;
  };

  gruvslide.register = function() {
    if (typeof(window) !== 'undefined') {
      // Register our listeners
      window.addEventListener("load", gruvslide.init);
      // document.addEventListener("click", gruvslide.handleClick);
      window.addEventListener("keydown", gruvslide.handleKeyDown);
    }
  };
})();

gruvslide.register();

exports.gruvslide = gruvslide;
