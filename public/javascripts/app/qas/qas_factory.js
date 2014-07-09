(function(qas) {

  var
    definitions;

  definitions = [
    '$http',
    qasFactory
  ];

  qas.factory('qasFactory', definitions);

  function qasFactory($http) {

    return {
      create: create,
      index: index
    };

    function create(qa) {
      var
        httpPromise;

      httpPromise = $http.post('/qas', qa)
        .catch(logError);

      return httpPromise;
    }

    function index() {
      var
        httpPromise;

      httpPromise = $http.get('/qas')
        .then(function(res) {
          return res.data;
        })
        .catch(logError);

      return httpPromise;
    }

    function logError(err) {
      console.log('There was an error...');
      console.log('Status: ' + err.status);
      console.log('Message: ' + err.statusText);
      console.log(err.config);
    }
  }

})(window.ch.qas);