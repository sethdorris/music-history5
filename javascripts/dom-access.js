define(['jquery'], function($) {
  var $maincontent = $('#main-content');

  return {
    getOutputElement: function() {
      return $maincontent;
    }
  };
});