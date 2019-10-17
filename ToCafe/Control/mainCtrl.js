var app = angular.module('app', ['ngRoute','ngResource']); app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/main', { templateUrl: 'main.html',controller: 'homeCtrl'}).when('/menu', {templateUrl: 'menu.html'
  }).when('/menu/:id', {templateUrl: 'det-menu.html'}).when('/perfilcc', {templateUrl: 'perfilcc.html',controller: 'homeCtrlcc'
  }).when('/registro', {templateUrl: 'registro.html', controller: 'regCtrl'}).otherwise('/menu');  }]);
app.directive('randomNinja',[ function(){ return { restrict: 'E', scope: { restorans: '=', title: '=' }, templateUrl: 'random.html',
    transclude: true, replace: true, controller: function($scope) { $scope.random = Math.floor(Math.random() * 4); }};}]);
app.controller('mainCtrl', function($scope, $rootScope) { $rootScope.nro = Math.floor(Math.random() * 7); $scope.restorans = [];
$rootScope.aja = "";firebase.auth().onAuthStateChanged(function(user) { if (user) {  db.collection("Restoran").onSnapshot((Snap) => {  
      Snap.forEach((doc) => { $scope.restorans.push(doc.data()); }); $rootScope.aja = $scope.restorans[0].razon;
      $scope.$apply(); });  } else { window.location = 'login.html';  };}); $scope.salUsuario = function(){ firebase.auth().signOut().then(function(resultado){window.location = 'login.html' });};
$scope.verDatos = function(datos) { $rootScope.nro = Math.floor(Math.random() * 7); $rootScope.aja = datos.razon; window.location.href = '#!/menu'; };}); 
app.controller('regCtrl', function($scope, $rootScope) {$scope.restorans = [];firebase.auth().onAuthStateChanged(function(user) {
  if (user) { $scope.restorans = []; db.collection("Restoran").onSnapshot((Snap) => { Snap.forEach((doc) => { $scope.restorans.push(doc.data()); });
      $scope.$apply(); }); } else {window.location = 'login.html'; };}); $scope.Salir = () => { window.location.href = '#!/menu';}  
$scope.Grabar = () => { var razon = document.getElementById("razon").value; var direccion  = document.getElementById("direccion").value;
  var telefono  = document.getElementById("telefono").value; db.collection("Restoran").add({ razon: razon, direccion: direccion, telefono: telefono  })
  .then(function(docRef) { document.getElementById('razon').value = ''; document.getElementById('direccion').value = '';
   document.getElementById('telefono').value = ''; $scope.restorans = []; $scope.errReg = 'Se creo correctamente';
   $scope.$apply(); window.location.href = '';  window.location.href = '#!/menu'; }).catch(function(error) { console.log("Error", error); 
  });}}); // Fin regCtrl