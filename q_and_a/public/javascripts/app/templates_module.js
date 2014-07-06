angular.module('ch.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('edit.html',
    "<div class=\"row\"><div class=\"col-sm-12\"><h4>Edit</h4></div></div>"
  );


  $templateCache.put('list.html',
    "<div class=\"row\"><div class=\"col-sm-12\"><h4>List</h4></div></div>"
  );


  $templateCache.put('nav.html',
    "<ul class=\"nav nav-tabs\"><li ch-nav=\"list\"><a ui-sref=\"list\">List</a></li><li ch-nav=\"edit\"><a ui-sref=\"edit\">Edit</a></li></ul>"
  );

}]);
