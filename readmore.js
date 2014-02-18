/*global jQuery */
/*
 * Readmore plugin for jQuery
 * Creator: Jesper Christiansen
 * Project home: https://github.com/jespr/readmore
 * Licensed under the Apache license
 */

;(function($) {

  var defaults = {
    limit: 100,
    moreLinkText: 'Read more',
    lessLinkText: 'Read less',
    ellipsis: '&hellip;'
  };

  function Readmore(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);

    this.init();
  }

  Readmore.prototype = {

    init: function() {
      var $this = this;

      $(this.element).each(function() {
        var element = $(this);

        if (element.html().length > $this.options.limit) {
          $this.truncate(element);
          $this.setupReadMoreLink(element);
          $this.setupReadLessLink(element);
        }
      });
    },

    truncate: function(element) {
      var truncatedText = $.trim(element.html().substring(0,this.options.limit));
      var hiddenText = this.hideHiddenText(element);
      var readMoreLink = ' <a href="#" class="read-more">' +
        this.options.moreLinkText +
        '</a>';

      element.html(truncatedText + '<span class="read-more-hellip">' +
          this.options.ellipsis +
          '</span>');
      element.append(readMoreLink);
      element.append(hiddenText);
    },

    hideHiddenText: function(element) {
      var readLessLink = '<a href="#" class="read-less">' +
        this.options.lessLinkText +
        '</a>';
      var hiddenContainer = '<span class="read-more-hidden" style="display: none;">' +
        element.html().substring(this.options.limit, element.html().length) +
        " " +
        readLessLink + "</span>";

      return hiddenContainer;
    },

    setupReadMoreLink: function(element) {
      var that = this;
      element.find('.read-more').on('click', function(e) {
        e.preventDefault();
        that.showFullText(element, $(this));
      });
    },

    setupReadLessLink: function(element) {
      var that = this;
      element.find('.read-less').on('click', function(e) {
        e.preventDefault();
        that.hideFullText(element);
      });
    },

    showFullText: function(container, readMoreLink) {
      var ellipsis = container.find('.read-more-hellip');
      var hiddenTextContainer = container.find('.read-more-hidden');

      readMoreLink.hide();
      ellipsis.hide();
      hiddenTextContainer.show();
    },

    hideFullText: function(container) {
      var readMoreLink = container.find('.read-more');
      var ellipsis = container.find('.read-more-hellip');
      var hiddenTextContainer = container.find('.read-more-hidden');

      readMoreLink.show();
      ellipsis.show();
      hiddenTextContainer.hide();
    }
  };

  $.fn.readmore = function(options) {
    new Readmore(this, options);
  };
}(jQuery));
