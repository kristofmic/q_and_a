(function(ch) {

  var
    definitions;

  definitions = [
    '$scope',
    '$rootScope',
    '$stateParams',
    'show',
    'subscription',
    DetailController
  ];

  ch.main.controller('DetailController', definitions);

  function DetailController($scope, $rootScope, $stateParams, show, subscription) {
    show.get({ _id: $stateParams.id }, onAfterGet);

    function onAfterGet(show) {
      $scope.show = show;

      $scope.isSubscribed = function() {
        return $scope.show.subscribers.indexOf($rootScope.currentUser._id) !== -1;
      };

      $scope.subscribe = function() {
        subscription.subscribe(show, $rootScope.currentUser).success(function() {
          $scope.show.subscribers.push($rootScope.currentUser._id);
        });
      };

      $scope.unsubscribe = function() {
        subscription.unsubscribe(show, $rootScope.currentUser).success(function() {
          var index = $scope.show.subscribers.indexOf($rootScope.currentUser._id);
          $scope.show.subscribers.splice(index, 1);
        });
      };

      $scope.nextEpisode = show.episodes.filter(function(episode) {
        return new Date(episode.firstAired) > new Date();
      })[0];
    }
  }

})(ch);