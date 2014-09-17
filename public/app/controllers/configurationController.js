(function(){

    var injectParams = ['$scope', '$window', 'dataService'];

    var ConfigurationController = function($scope, $window, dataService){

        $scope.apiConfig = null;

        function init(){
            getApiConfiguration();
        }

        function getApiConfiguration() {
            dataService.configuration.getApiConfiguration()
                .then(function(data){
                    $scope.apiConfig = data.results;
                }, function(error){
                    $window.alert('An error occurred: ' + error);
                });
        }

        init();
    };

    ConfigurationController.$inject = injectParams;

    angular.module('adminApp').controller('ConfigurationController', ConfigurationController);

}());