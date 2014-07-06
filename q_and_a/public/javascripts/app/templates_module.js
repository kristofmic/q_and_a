angular.module('ch.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('list.html',
    "<p>hello world</p>"
  );

}]);
