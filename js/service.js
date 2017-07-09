var App = angular.module('services', []);

App.factory('Reservations', function($http, API){
	var reservations = [{responsable: 'Test'},{responsable: 'Test Test'}];
	return {
		read: function(){
			return $http.get(API+'reservations');
		},
		create: function(item){
			return $http.post(API+'reservations', item);
		},
		profile: function(id){
			return $http.get(API+'reservation/'+id);	
		},
		update: function(item, id){
			return $http.put(API+'reservation/'+id, item);	
		},
		delete: function(id){
			return $http.delete(API+'reservation/'+id);
		}
	}
})