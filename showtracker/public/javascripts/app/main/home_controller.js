(function(ch) {

  var
    definitions;

  definitions = [
    '$scope',
    'show',
    HomeController
  ];

  ch.main.controller('HomeController', definitions);

  function HomeController($scope, show) {
    $scope.alphabet = ['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
      'Y', 'Z'];

    $scope.genres = ['Action', 'Adventure', 'Animation', 'Children', 'Comedy',
      'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Food',
      'Home and Garden', 'Horror', 'Mini-Series', 'Mystery', 'News', 'Reality',
      'Romance', 'Sci-Fi', 'Sport', 'Suspense', 'Talk Show', 'Thriller',
      'Travel'];

    $scope.headingTitle = 'Top 12 Shows';

    $scope.shows = show.query();

    $scope.filterByGenre = filterByGenre;

    $scope.filterByAlphabet = filterByAlphabet;

    function filterByGenre(genre) {
      $scope.shows = show.query({ genre: genre });
      $scope.headingTitle = genre;
    }

    function filterByAlphabet(char) {
      $scope.shows = show.query({ alphabet: char });
      $scope.headingTitle = char;
    };
  }

})(ch);