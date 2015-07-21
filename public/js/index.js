var app = angular.module('redditusers', []);

app.factory('Users', function($http) {
    return {
        list: function() {
            return $http.get('/api/users');
        }
    }
});

app.controller('UserList', function($scope, Users){
    Users.list().then(function(result) {
        $scope.users = result.data;
    });
});
