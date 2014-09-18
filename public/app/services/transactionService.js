(function () {

    var injectParams = ['config', '$http'];

    var transactionFactory = function (config, $http) {
        var serviceBase = config.apiHost, factory = {};

        factory.createDeposit = function (deposit) {
            return $http.post(serviceBase + '/deposits', deposit).then(function (response) {
                var deposit = response.data;
                return {
                    results: deposit
                };
            });
        };

        factory.createWithdrawal = function (withdrawal) {
            return $http.post(serviceBase + '/withdrawals', withdrawal).then(function (response) {
                var withdrawal = response.data;
                return {
                    results: withdrawal
                };
            });
        };

        return factory;
    };

    transactionFactory.$inject = injectParams;

    angular.module('adminApp').factory('transactionService', transactionFactory);

}());