(function(){
	var app = angular.module('adminApp', ['ngRoute', 'ngAnimate']);

	app.config(['$routeProvider', function ($routeProvider){
		var viewBase = 'app/views/';

		$routeProvider
			.when('/customers', {
				controller: 'CustomersController',
				templateUrl: viewBase + 'customers/customers.html'
			})
            .when('/customertransactions/:customerId', {
				controller: 'TransactionsController',
				templateUrl: viewBase + 'customers/transactions.html'
			})
			.otherwise({ redirectTo: '/customers' });

	}]);

	app.run();
	// app.run(['$rootScope', '$location', 
	// 	function($rootScope, $location){
	// 		$rootScope.$on("$rootChangeStart", function(event, next, current){

	// 		})
	// 	}])

}());