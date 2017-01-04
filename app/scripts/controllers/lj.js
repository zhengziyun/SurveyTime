'use strict';

/**
 * @ngdoc function
 * @name surveyTimeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the surveyTimeApp
 */

angular.module('surveyTimeApp')
  .controller('loginCon', ["$scope","$http","url","$state","$rootScope","$cookies",function ($scope,$http,url,$state,$rootScope,$cookies) {
  	angular.element(".loadingbg").css("display","none");
    $scope.$emit("toHome",false);
    $scope.user="";
    $scope.password="";
  	$scope.user=$rootScope.user
    $scope.password=$rootScope.password
    var ele2=angular.element(".lj-search_pass_link1")
    var ele3=angular.element(".lj-jizhu1")
    if($cookies.get("myuser")){
      $scope.lijiang=true;
      ele2.attr("index","true");
      $state.go("home.lists");
    }
    if($cookies.get("myuser1")){
      $scope.user=$cookies.get("myuser1");
      $scope.password=$cookies.get("mypassword");
      $scope.lijiang1=true;
      ele3.attr("index","true")
    }
  	$scope.userBlur=function(){
      if($scope.user){
        if(!$scope.user.match(/^[1][34578](\d{9})$/)){
          $scope.user="手机格式错误";
          $scope.className="lj-red";
        } 
      }  
  				 
  	}
    $scope.userFocus=function(){      
      if($scope.className!="lj-black"){
        $scope.user="";
        $scope.className="lj-black";
      }
    }
    $scope.pasFocus=function(){
      if($scope.className1!="lj-black"){
        $scope.password="";
        $scope.className1="lj-black";
        angular.element(".lj-passwords").attr("type","password");
      }
      
    }
    $scope.login=function(){
      if(!$scope.user){
        $scope.className="lj-red"
        $scope.user="手机号不能为空"
      }
      if(!$scope.password){
        $scope.className1="lj-red"
        angular.element(".lj-passwords").attr("type","text")
        $scope.password="密码不能为空";
      }
      if($scope.user.match(/^[1][34578](\d{9})$/)){
        $http({
            method:"post",
            url:url+"users/login",
            data:{"username":$scope.user,"password":$scope.password}
          }).then(function(reponse){
              $scope.uid=reponse.data.uid;
              localStorage.user=$scope.user;
              localStorage.uid=reponse.data.uid;
              localStorage.id=reponse.data.id;
              if(ele2.attr("index")=="true"){
                if(!$cookies.get("myuser")){
                  var expireDate = new Date();
                  expireDate.setDate(expireDate.getDate() + 7);
                  $cookies.put("myuser",$scope.user,{expires:expireDate})
                }
              }else{
                $cookies.remove("myuser");
              }
              if(ele3.attr("index")=="true"){
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 7);
                $cookies.put("myuser1",$scope.user,{expires:expireDate})
                $cookies.put("mypassword",$scope.password,{expires:expireDate})
              }else{
                $cookies.remove("myuser1");
                $cookies.remove("mypassword");
              }
              $state.go("home.lists");
          },function(reponse){
              var ele1 = angular.element(".lj-user-password");
              ele1.css("bottom","0");
              ele1.stop().animate({"bottom":"8%","opacity":"1"},400,function(){
              ele1.delay(1000).animate({"opacity":"0","bottom":"0rem"});
          });
          })
      }
    }
    $scope.zhuce=function(){
      $state.go("zhuce");
    }
    
    $scope.zidong=function(){
      if(ele2.attr("index")=="false"){
        ele2.attr("index","true")
        $scope.lijiang=true
      }else{
        ele2.attr("index","false")
        $scope.lijiang=false
      }   
    }    
    $scope.zidong1=function(){
      if(ele2.attr("index")=="false"){
        ele2.attr("index","true")
        $scope.lijiang=true
      }else{
        ele2.attr("index","false")
        $scope.lijiang=false
      }
    }  

    $scope.zidongy=function(){
      if(ele3.attr("index")=="false"){
        ele3.attr("index","true")
        $scope.lijiang1=true
      }else{
        ele3.attr("index","false")
        $scope.lijiang1=false
      }   
    }    
    $scope.zidongy1=function(){
      if(ele3.attr("index")=="false"){
        ele3.attr("index","true")
        $scope.lijiang1=true
      }else{
        ele3.attr("index","false")
        $scope.lijiang1=false
      }
    }
  	$scope.yan=function(){
      if(angular.element(".lj-passwords").attr("type")=="text"){
        angular.element(".lj-passwords").attr("type","password");
      }else{
        angular.element(".lj-passwords").attr("type","text");
      }
    }
  }])

  .controller('zhuceCon',  ["$scope","$http","url","$timeout","$location","$state","$rootScope",function ($scope,$http,url,$timeout,$location,$state,$rootScope) {
    angular.element(".loadingbg").css("display","none");
    $scope.$emit("toHome",false);
    $scope.user="";
    $scope.password="";
    $scope.password1="";

    $scope.userBlur=function(){
      if($scope.user){
        if(!$scope.user.match(/^[1][34578](\d{9})$/)){
          $scope.user="手机格式错误";
          $scope.className="lj-red"
        }
      }     
    }  
    $scope.userFocus=function(){

      if($scope.className!="lj-black"){
        $scope.user="";
        $scope.className="lj-black"
      }
    }
  	$scope.pasBlur=function(){
      if($scope.password){
        if($scope.password.length>6 && $scope.password.length<18){
          
        }else{
          $scope.password="密码格式错误";
          $scope.className1="lj-red";
          angular.element("#pwd").attr("type","text");
        }
      }
             
    }
    $scope.pasFocus=function(){      
      if($scope.className1!="lj-black"){
        $scope.password="";
        $scope.className1="lj-black"
        angular.element("#pwd").attr("type","password");
      }
    }

    $scope.pas1Blur=function(){
      if($scope.password1){
        if($scope.password1==$scope.password){
          
        }else{
          $scope.password1="密码不一致";
          $scope.className2="lj-red";
          angular.element("#pwd2").attr("type","text");
        }
      }
             
    }
    $scope.pas1Focus=function(){      
      if($scope.className2!="lj-black"){
        $scope.password1="";
        $scope.className2="lj-black"
        angular.element("#pwd2").attr("type","password");
      }
    }

    $scope.zhuce=function(){
      if(!$scope.user){
        $scope.user="手机号不能为空"
        $scope.className="lj-red";
      }
      if(!$scope.password){
        $scope.password="密码不能为空"
        $scope.className1="lj-red";
        angular.element("#pwd").attr("type","text");
      }
      if(!$scope.password1){
        $scope.password1="请再次输入密码"
        $scope.className2="lj-red";
        angular.element("#pwd2").attr("type","text");
      }
      angular.element(".lj-hide").css("bottom","0");
      if($scope.user.match(/^[1][34578](\d{9})$/) && $scope.password.length>6 && $scope.password.length<18 && $scope.password==$scope.password1){
        
        $http({
            method:"post",
            url:url+"users",
            data:{"username":$scope.user,"password":$scope.password}
            // headers:{'Content-Type':'application/x-www-form-urlencoded'}
          }).then(function(reponse){
              $location.path("/login")
              $rootScope.user=$scope.user;
              $rootScope.password=$scope.password;
          },function(){
              var ele = angular.element(".lj-hide");
              ele.animate({"bottom":"6rem","opacity":1},400,function(){
                ele.delay(1000).animate({"opacity":0,"bottom":"0rem"});
              });
          })
      }
    }
  }])
  .controller('resetCon', ["$scope","$http","url",function ($scope,$http,url) {
    angular.element(".loadingbg").css("display","none");
    $scope.$emit("toHome",false);
    $scope.pasBlur=function(){
      if($scope.password){
        if($scope.password.length>6 && $scope.password.length<18){
       
        }else{
          $scope.password="密码格式错误";
          $scope.className1="lj-red";
          angular.element(".lj-pas").attr("type","text");
        }
      }   
    }
    $scope.pasFocus=function(){      
      if($scope.className1!="lj-black"){
        $scope.password="";
        $scope.className1="lj-black"
        angular.element(".lj-pas").attr("type","password");
      }
    }

    $scope.pas1Blur=function(){
      if($scope.password1){
        if($scope.password1==$scope.password){
          
        }else{
          $scope.password1="密码不一致";
          $scope.className2="lj-red";
          angular.element(".lj-pas1").attr("type","text");
        }
      }
             
    }
    $scope.pas1Focus=function(){      
      if($scope.className2!="lj-black"){
        $scope.password1="";
        $scope.className2="lj-black"
        angular.element(".lj-pas1").attr("type","password");
      }
    }
    $scope.tijiao=function(){
      if(!$scope.password){
        $scope.password="密码不能为空"
        $scope.className1="lj-red";
        angular.element(".lj-pas").attr("type","text");
      }
      if(!$scope.password1){
        $scope.password1="请再次输入密码"
        $scope.className2="lj-red";
        angular.element(".lj-pas1").attr("type","text");
      }
      if($scope.password.length>6 && $scope.password.length<18 && $scope.password1==$scope.password){
        $http({
            method:"put",
            url:url+"users/"+localStorage.getItem("uid"),
            data:{"username":localStorage.getItem("id"),"password":$scope.password}
          }).then(function(reponse){
              if(reponse.status==200){
                // var expireDate = new Date();
                // expireDate.setDate(expireDate.getDate() + 7);
                // $cookies.put("mypassword",$scope.password,{expires:expireDate})
                var ele4 = angular.element(".lj-xiugai");
                ele4.animate({"bottom":"14rem","opacity":1},400,function(){
                  ele4.delay(1000).animate({"opacity":0,"bottom":"0rem"});
                });
              }
          },function(){})
      }
      
    }
        
  }]);

