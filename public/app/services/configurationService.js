(function () {

    var injectParams = ['config', '$http'];

    var configurationFactory = function (config, $http) {
        var serviceBase = config.apiHost + '/config', factory = {};

        factory.getApiConfiguration = function () {
            return $http.get(serviceBase).then(function (response) {
                var configuration = response.data;
                return {
                    results: configuration
                };
            });
        };

        return factory;
    };

    configurationFactory.$inject = injectParams;

    angular.module('adminApp').factory('configurationService', configurationFactory);

}());