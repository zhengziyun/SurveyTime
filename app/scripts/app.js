'use strict'; 
 
 
 /** 
  * @ngdoc overview 
  * @name surveyTimeApp 
  * @description 
  * # surveyTimeApp 
  * 
  * Main module of the application. 
  */ 
 angular.module('surveyTimeApp', ["ui.router","chart.js","ngCookies","summernote"]) 
 .constant("url","http://47.90.20.200:1602/")
 .config(["$stateProvider","$urlRouterProvider",'$httpProvider',function($stateProvider,$urlRouterProvider,$httpProvider){ 
  $httpProvider.interceptors.push('httpInterceptor');
  $urlRouterProvider.when("","/login").otherwise("/404");
  $stateProvider.state("home",{ 
    url:"/home", 
       templateUrl:'views/home.html', 
       controller:"stsCon"
     }).state("home.news",{ 
    url:"/news", 
       templateUrl:'views/news.html', 
       controller:"news" 
     }).state("home.results",{ 
    url:"/results/:producerId", 
       templateUrl:'views/results.html', 
       controller:"czkCon" 
     }).state("home.topic",{ 
    url:"/topic", 
       templateUrl:'views/topic.html', 
       controller:"topic" 
     }).state("home.xt",{ 
    url:"/xt", 
       templateUrl:'views/xt.html', 
       controller:"sxt" 
     }).state("home.xt.dx",{ 
    url:"/dx", 
       templateUrl:'views/dx.html', 
       controller:"dx" 
     }).state("home.lists",{ 
       url:"/lists", 
       templateUrl:"views/lists.html", 
       controller:"zllCon"
     }).state("zhuce",{ 
       url:"/zhuce", 
       templateUrl:"views/zhuce.html", 
       controller:"zhuceCon" 
     }).state("login",{ 
       url:"/login", 
       templateUrl:"views/login.html", 
       controller:"loginCon" 
     }).state("zhuyemian",{ 
       url:"/zhuyemian", 
       templateUrl:"views/zhuyemian.html", 
       controller:"zhuyemianCon" 
     }).state("404",{ 
       url:"/404", 
       templateUrl:"404.html",
       controller:"404"
     }).state("offline",{ 
       url:"/offlinepage", 
       templateUrl:"offlinepage.html",
       controller:"404"
     }).state("home.xt.dxt",{
      url:"/dxt",
      templateUrl:'views/stsdxt.html',
      controller:"dx"
    }).state("home.xt.tk",{
      url:"/tk",
      templateUrl:'views/ststk.html',
      controller:"dx"
    }).state("home.xt.jd",{
      url:"/jd",
      templateUrl:'views/stsjd.html',
      controller:"dx"
    }).state("home.topic.ststotk",{
      url:"/ststotk",
      templateUrl:'views/ststotk.html',
      controller:"ststotk"
    }).state("questionaire",{
      url:"/questionaire:producerId",
      templateUrl:"views/questionaire.html",
      controller:"zjfCon"
    }).state("reset",{
      url:"/reset/:id",
      templateUrl:"views/reset.html",
      controller:"resetCon"
    })
 }])
 .controller("surveyTimeCon",["$scope",function($scope){
   $scope.$on("toHome",function(event,data){
      $scope.shareShow = data;
    });
  }])
 .controller("404",["$rootScope",function($rootScope){
  angular.element(".loadingbg").css("display","none");
  $scope.$emit("toHome",false);
 }])
 .factory('httpInterceptor', [ '$q', '$injector', '$rootScope', function($q, $injector, $rootScope){
  var httpInterceptor = {
      'request' : function(config) { 
        angular.element(".loadingbg").css("display","flex");
        return config || $q.when(config);
      },
      responseError : function(rejection) {
        angular.element(".loadingbg").css("display","none");
        location.href = "http://localhost:5000/#!/offlinepage";
        return $q.reject(rejection);
      }
    } 
  return httpInterceptor;
 }]);
