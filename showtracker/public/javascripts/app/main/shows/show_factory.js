(function(ch) {

  var
    definitions;

  definitions = [
    '$resource',
    show
  ];

  ch.main.factory('show', definitions);

  function show($resource) {

    return $resource('/api/shows/:_id');

  }

})(ch);