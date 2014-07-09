angular.module('ch.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('edit.html',
    "<div class=\"row\"><div class=\"col-sm-12\"><form role=\"form\" name=\"editor\" ng-submit=\"submit()\"><div class=\"form-group\"><label for=\"question\">Question</label><input type=\"text\" class=\"form-control\" id=\"question\" placeholder=\"A question\" ng-required=\"true\" ng-model=\"question\"></div><div class=\"form-group\"><label for=\"answer\">Answer</label><textarea class=\"form-control\" id=\"answer\" placeholder=\"The answer\" ng-required=\"true\" rows=\"6\" ng-model=\"answer\"></textarea></div><button type=\"submit\" class=\"btn btn-default\">Save</button></form></div></div>"
  );


  $templateCache.put('list.html',
    "<div class=\"row\"><div class=\"col-sm-12\"><div class=\"panel panel-default\" ng-repeat=\"qa in qas\"><div class=\"panel-heading\"><h3 class=\"panel-title\">{{qa.question}}</h3></div><div class=\"panel-body\">{{qa.answer}}</div></div></div></div>"
  );


  $templateCache.put('nav.html',
    "<ul class=\"nav nav-tabs\"><li ch-nav=\"list\"><a ui-sref=\"list\">List</a></li><li ch-nav=\"edit\"><a ui-sref=\"edit\">Edit</a></li></ul>"
  );

}]);
