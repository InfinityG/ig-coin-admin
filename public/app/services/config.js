/**
 * Created by grant on 15/09/2014.
 */
(function(){
    var value = {
        apiHost: 'http://localhost:8000'
    };

    angular.module('adminApp').value('config', value);
}());