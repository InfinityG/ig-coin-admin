(function(){

    var injectParams = ['$scope', '$location', '$routeParams', 'config', 'dataService'];

    var TransactionsController = function($scope, $location, $routeParams, config, dataService){

        var customerId = ($routeParams.customerId) ? parseInt($routeParams.customerId) : 0;

        $scope.balance = null;
        $scope.transactions = [];
        $scope.customerId = customerId;
        $scope.customer = null;

        function init(){
            getCustomerBalance(customerId);
            getCustomerTransactions(customerId);
            getCustomerById(customerId);
        }

        function getCustomerTransactions(id) {
            dataService.getCustomerTransactions(id)
                .then(function(data){
                    $scope.transactions = data.results;
                }, function(error){
                    $window.alert('An error occurred: ' + error);
                });
        }

        function getCustomerBalance(id) {
            dataService.getCustomerBalance(id)
                .then(function(data){
                    $scope.balance = data.results;
                }, function(error){
                    $window.alert('An error occurred: ' + error);
                });
        }

        function getCustomerById(id) {
            dataService.getCustomerById(id)
                .then(function(data){
                    $scope.customer = data.results;
                }, function(error){
                    $window.alert('An error occurred: ' + error);
                });
        }

        init();
    };

    TransactionsController.$inject = injectParams;

    angular.module('adminApp').controller('TransactionsController', TransactionsController);

}());