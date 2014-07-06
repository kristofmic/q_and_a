(function(ch) {

  var
    definitions;

  definitions = [
    '$http',
    subscription
  ];

  ch.main.factory('subscription', definitions);

  function subscription($http) {

    return {
      subscribe: function(show, user) {
        return $http.post('/api/subscribe', { showId: show._id, userId: user._id });
      },
      unsubscribe: function(show, user) {
        return $http.post('/api/unsubscribe', { showId: show._id, userId: user._id });
      }
    };

  }

})(ch);