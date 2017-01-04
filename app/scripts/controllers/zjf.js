'use strict';

/**
 * @ngdoc function
 * @name surveyTimeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the surveyTimeApp
 */




angular.module('surveyTimeApp')
.controller('zjfCon', ["$scope","$http","url","$location",function($scope,$http,url,$location){
	angular.element(".loadingbg").css("display","none");
	$scope.$emit("toHome",true);
	var title = '', uid = '', zjfoption = [], id='';
	id = $location.url().split("=")[1];
	uid = localStorage.uid;
	angular.element(".bdsharebox").css("opacity",0).css("bottom",0);
	$scope.judgeShare = true;
  $scope.options = {
    height: 100,
    focus: true,
    airMode: false,
    toolbar: [
      ['edit',[]],
      ['headline', []],
      ['style', ['bold','clear']],
      ['fontface', []],
      ['textsize', ['fontsize']],
      ['fontclr', ['color']],
      ['alignment', []],
      ['height', []],
      ['table', []],
      ['insert', []],
      ['view', []]
  	]
  };
	$scope.opindex = 0;
	$scope.zjfArr = null;
	$scope.$on('to-parent', function(event,data) {
		$scope.zjfArr = data;
	});
	$scope.changeBool = true;
  $http({
  	method: "get",
  	url: url + 'item/' + id
  }).then(function(e){
  	title = e.data.title;
  	$scope.index1 = 0;
  	$scope.index2 = 0;
  	$scope.index3 = 0;
  	$scope.maxIndex = e.data.option.length;
  	for(var i=0; i<e.data.option.length; i++){
  		if(e.data.option[i].type == 0){
  			$scope.index1 ++;
  		}else if(e.data.option[i].type == 1){
  			$scope.index2 ++;
  		}else if(e.data.option[i].type == 2){
  			$scope.index3 ++;
  		}
  	}
  	$scope.zjfdata = e.data;
  	$scope.changeQes = function(){
  		if($scope.zjfArr == null){
  			if($scope.changeBool == true){
  				$scope.changeBool = false;
  				angular.element(".zjfWain").css("bottom","-4rem").css("opacity",1);
	 				angular.element(".zjfWain").animate({"bottom":"6rem"},300,function(){
	 					angular.element(".zjfWain").delay(600).animate({"opacity":0},function(){
	 						$scope.changeBool = true;
	 					});
	 				})
	 			}
  		}else{
  			if($scope.opindex < $scope.maxIndex -1){
  				if($scope.zjfArr[0].type == 0){
  					$scope.zjfArr[0].opt[$scope.zjfArr[1]].num = $scope.zjfArr[2];
  					zjfoption.push($scope.zjfArr[0]);
  					$scope.zjfArr = null;
  					$scope.opindex ++;
  				}else if($scope.zjfArr[0].type == 1){
  					zjfoption.push($scope.zjfArr[0]);
  					$scope.zjfArr = null;
  					$scope.opindex ++;
  				}else if($scope.zjfArr[0].type == 2){
  					$scope.zjfArr[0].oop.push($scope.zjfArr[1]);
  					zjfoption.push($scope.zjfArr[0]);
  					$scope.zjfArr = null;
  					$scope.opindex ++;
  				}else if($scope.zjfArr[0].type == 3){
  					$scope.zjfArr[0].oop.push($scope.zjfArr[1]);
  					zjfoption.push($scope.zjfArr[0]);
  					$scope.zjfArr = null;
  					$scope.opindex ++;
  				}
  				if($scope.opindex == $scope.maxIndex -1){
  					angular.element(".questionaire_submit").text("提交问卷");
  				}
  			}else if($scope.opindex == $scope.maxIndex -1){
  				if($scope.zjfArr[0].type == 0){
  					$scope.zjfArr[0].opt[$scope.zjfArr[1]].num = $scope.zjfArr[2];
  					zjfoption.push($scope.zjfArr[0]);
  					$scope.zjfArr = null;
  				}else if($scope.zjfArr[0].type == 1){
  					zjfoption.push($scope.zjfArr[0]);
  					$scope.zjfArr = null;
  				}else if($scope.zjfArr[0].type == 2){
  					$scope.zjfArr[0].oop.push($scope.zjfArr[1]);
  					zjfoption.push($scope.zjfArr[0]);
  					$scope.zjfArr = null;
  				}else if($scope.zjfArr[0].type == 3){
  					$scope.zjfArr[0].oop.push($scope.zjfArr[1]);
  					zjfoption.push($scope.zjfArr[0]);
  					$scope.zjfArr = null;
  				}
  				$http({
  					url: url+"item/"+id,
						method: "put",
						data: {
							"uid": uid,
							"title": title,
							"option": zjfoption
						}
  				}).then(function(e){
  					zjfoption = [];
  					title = ''; 
  					uid = '';
  					id='';
  					angular.element(".tjsuccess").css("display","flex");
  				},function(){
  					alert("问卷提交失败！");
  				})
  			}
  		}
  	}
  	angular.element(".loadingbg").css("display","none");
  	angular.element("#shareUrl").on("click",function(){
  		if(!angular.element(".bdsharebox").is(":animated")){
  			if($scope.judgeShare == true){
  				$scope.judgeShare = false;
	 			angular.element(".bdsharebox").animate({"bottom":"12rem","opacity":1},300);
  			}else{
  				$scope.judgeShare = true;
  				angular.element(".bdsharebox").animate({"bottom":0,"opacity":0},300);
  			}
  		}
  		
  	})
  	



  },function(){alert("error!");})

}])
.directive("zjfoptionone",function(){
	return {
		restrict: "EACM",
		scope: {"zjfdataone":"=zjfd","options":"=options"},
		template: function(ele,attrs){	
			if(attrs.type == 0){
				return '<div class="questionaire_question"><div class="question_title">{{zjfdataone.title | addqstmark}}</div><div class="zjf_options"><div ng-repeat="opo in zjfdataone.opt" class="opts"><span class="zjf_state" ng-class="{zjf_bgactive:$index == i}" ng-click="changeState($index)"></span><span class="optCont" ng-class="{zjf_colactive:$index == i}">{{opo.op}}</span><div></div>';
			}else if(attrs.type == 1){ 
				return '<div class="questionaire_question"><div class="question_title">{{zjfdataone.title | addqstmark}}</div><div class="zjf_options"><div ng-repeat="opo in zjfdataone.opt" class="opts"><span class="zjf_state" bool="false" ng-click="changeState($index)"></span><span class="optCont">{{opo.op}}</span><div></div>';
			}else if(attrs.type == 2){ 
				return '<div class="questionaire_question"><div class="question_title">{{zjfdataone.title | addqstmark}}</div><div class="zjf_options"><input type="text" class="form-control formpos" placeholder="请填写答案" ng-blur="addFill()"></div></div>';
			}else if(attrs.type == 3){
				return '<div class="questionaire_question"><div class="question_title">{{zjfdataone.title | addqstmark}}</div><div class="zjf_options"><summernote config="options" ng-model="areaTxt" on-blur="addNote()"></summernote></div></div>';
			}
		},
		link: function(scope,ele,attrs){
			var obj = scope.zjfdataone;
			scope.changeState = function(i){
				if(attrs.type == 0){
					var arr = [];
					scope.i = i;
					var num = Number(obj.opt[i].num) + 1;
					arr.push(obj);
					arr.push(i);
					arr.push(num);
					scope.$emit('to-parent', arr);
				}else if(attrs.type == 1){
					var arr = [];
					var bool = ele.find(".zjf_state").eq(i).attr("bool");
					if(bool == "false"){
						ele.find(".zjf_state").eq(i).attr("bool","true");
						ele.find(".zjf_state").eq(i).addClass("zjf_bgactive");
						ele.find(".optCont").eq(i).addClass("zjf_colactive");
						obj.opt[i].num = Number(obj.opt[i].num) + 1;
						arr.push(obj);
						scope.$emit('to-parent', arr);
					}else{
						ele.find(".zjf_state").eq(i).attr("bool","false");
						ele.find(".zjf_state").eq(i).removeClass("zjf_bgactive");
						ele.find(".optCont").eq(i).removeClass("zjf_colactive");
						obj.opt[i].num = Number(obj.opt[i].num) - 1;
						arr.push(obj);
						var bool2 = false;
						for(var i=0; i<ele.find(".zjf_state").length; i++){
							if(ele.find(".zjf_state").eq(i).attr("bool") == "true"){
								bool2 = true;
							}
						}
						if(bool2 == true){
							scope.$emit('to-parent', arr);
						}else{
							scope.$emit('to-parent', null);
						}
					}
				}
			}
			scope.addFill = function(){
				var arr = [];
				var answer = angular.element(".formpos").val();
				if(answer == "" || answer == null){
					return;
				}else{
					arr.push(obj);
					arr.push(answer);
					scope.$emit('to-parent', arr);
				}
			}
			scope.addNote = function(){
				var arr = [];
				var answer = scope.areaTxt;
				if(answer == undefined || answer == ""){
					return;
				}else{
					arr.push(obj);
					arr.push(answer);
					scope.$emit('to-parent', arr);
				}
			}
		}
	}
})
.filter("addqstmark",function(){
	return function(str){
	 	if(str != null){
			if(str[str.length-1] != "?"&&str[str.length-1] != "？"){
				return str + "？";
			}else{
				return str;
			}
		}
	}
})
.filter("pgmType",function(){
	return function(arr,types){
		if(arr != null){
			var newArr = [];
			if(types == 0){
				for(var i=0; i<arr.length; i++){
					if(arr[i].type == 0){
						newArr.push(arr[i]);
					}
				}
				return newArr;
			}else if(types == 1){
				for(var i=0; i<arr.length; i++){
					if(arr[i].type == 1){
						newArr.push(arr[i]);
					}
				}
				return newArr;
			}else if(types == 2){
				for(var i=0; i<arr.length; i++){
					if(arr[i].type == 2){
						newArr.push(arr[i]);
					}
				}
				return newArr;
			}else if(types == 3){
				for(var i=0; i<arr.length; i++){
					if(arr[i].type == 3){
						newArr.push(arr[i]);
					}
				}
				return newArr;
			}
		}
	}
})









