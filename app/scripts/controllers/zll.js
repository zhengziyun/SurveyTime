'use strict';

/**
 * @ngdoc function
 * @name surveyTimeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the surveyTimeApp
 */
angular.module('surveyTimeApp')
	.controller('zllCon', ["$scope", "$http", "url", "$state", "$stateParams", "$rootScope", function($scope, $http, url, $state, $stateParams, $rootScope) {
		angular.element(".loadingbg").css("display","none");
		$scope.$emit("toHome",false);
		$scope.searchStr = "";
		$scope.pagerShow = true;
		$scope.as2 = false;
		$scope.$emit("toparent",1);
		$rootScope.navindex = 1;
		$scope.kw=localStorage.uid
		$scope.id = $stateParams.id;
		$scope.ll = false;
		$scope.zhu = false;
		$scope.shj = '已是第一页';
		$scope.shu = 0;
		$http({
			method: 'get',
			url: url + 'item/',
			params: {
				uid: $scope.kw
			}
		}).then(function(e) {
			if(e.data == '' || e.data == 'null' || e.data.length == 0) {
				$scope.we = true;
				$scope.as = false;
			} else {
				$scope.we = false;
				$scope.as = true;
			}
			if(e.data.length > 6) {
				$scope.zhu = true;
			} else {
				$scope.zhu = false;
			}
			$scope.data = e.data;
			angular.element(".loadingbg").css("display","none");
		}, function(){

		});
		
		$scope.$watch('data', function() {
			if($scope.data!=undefined){
			$scope.arr = [];
  			for(var i = 0; i < $scope.data.length / 6; i++) {
				$scope.arr.push(i)
			}
			if($scope.shu != 0) {
				$scope.shu = Math.ceil($scope.data.length / 6) - 1;
			}
			}
		},true)
			//删除
		$scope.sc = function(e, hj) {
			$http({
				url: url + 'item/' + e.id,
				method: "delete"
			}).then(function(cd) {
				if(cd.data.count == '1') {
					angular.element(".alertw").css('bottom', '0');
					angular.element(".alertw").stop().animate({
						"bottom": "18%",
						"opacity": 1
					}, 600, function() {
					angular.element(".alertw").delay(1000).animate({
						"opacity": 0
					});
				})
				$scope.shj = '删除成功！';
				$scope.data.splice($scope.data.indexOf(e), 1);
				}
				angular.element(".loadingbg").css("display","none");
				if($scope.data.length == 0){
					$scope.we = true;
				}else if($scope.data.length>6){
					$scope.zhu = true;
				}else{
					$scope.zhu = false;
				}
			}, function() {
				angular.element(".alertw").css('bottom', '0');
					angular.element(".alertw").stop().animate({
						"bottom": "18%",
						"opacity": 1
					}, 600, function() {
					angular.element(".alertw").delay(1000).animate({
						"opacity": 0
					});
				})
				$scope.shj = '删除失败！';
			})
		}
		$scope.fn = function() {
			if($scope.shu > 0) {
				$scope.shu--
			} else {
				angular.element(".alertw").css('bottom', '0%')
				angular.element(".alertw").stop().animate({
					"bottom": "16%",
					"opacity": 1
				}, 600, function() {
		angular.element(".alertw").delay(1000).animate({
						"opacity": 0
					});
				})
				$scope.shj = '已是第一页';
				$scope.shu = 0
			}
		}
		$scope.fn2 = function() {
			if($scope.data.length / 6 <= $scope.shu+1) {
				angular.element(".alertw").css('bottom', '0%')
				angular.element(".alertw").stop().animate({
					"bottom": "16%",
					"opacity": 1
				}, 600, function() {
			angular.element(".alertw").delay(1000).animate({
						"opacity": 0
					});
				})
				$scope.shj = '已是最后一页';
				$scope.shu = $scope.shu
			} else {
				$scope.shu++;
			}
		}
		
		$scope.xq = function(n) {
			$http({
				method: "get",
				url: url+"item/"+n
			}).then(function(e){
				angular.element(".loadingbg").css("display","none");
				var dataOne = e.data.option;
				var bool = false;
				for(var i=0; i<dataOne.length; i++){
					if(dataOne[i].oop.length == 0){
						for(var j=0; j<dataOne[i].opt.length; j++){
							if(dataOne[i].opt[j].num != 0){
								bool = true;
							}
						}
					}else{
						bool = true;
					}
				}
				if(bool == true){
					$state.go('home.results', {
						producerId: '=' + n
					});
				}else{
					angular.element(".alertw").css('bottom', '0%')
				angular.element(".alertw").stop().animate({
					"bottom": "16%",
					"opacity": 1
				}, 600, function() {
			angular.element(".alertw").delay(1000).animate({
						"opacity": 0
					});
				})
				$scope.shj = '问卷还没有人回答！';
				}
			},function(){

			})
			
		}
		$scope.yl = function(n) {
			$state.go('questionaire', {
				producerId: '=' + n
			});
		}
		$scope.search = function(){
			if($scope.searchCon){
				$scope.as = false;
				$scope.as2 = true;
				$scope.pagerShow = false;
				$scope.searchStr = $scope.searchCon;
			}else{
				$scope.as = true;
				$scope.as2 = false;
				$scope.pagerShow = true;
			}
		}
	}]).directive('shuju', function() { //自定义指令
		return {
			restrict: 'EACM', //仅限元素名调用
			replace: true,
			template: '<div><div class="z-ju" ><li class="list-group-item"  ng-click="xw()">{{x.title}}</li><span class="badgew glyphicon glyphicon-tint" ng-click="xw()"></span></div><div class="z-d" style="display:none;"><div class="zk-p" ng-click="yl(x.id)"><img src="images/z-yx.png"/><span>预览</span></div><div class="zk-p" ng-click="xq(x.id)"><img src="images/z-sds.png"/><span>结果</span></div><div class="zk-p" ng-click="sc(x,$index)"><img src="images/z-dd.png"/><span>删除</span></div></div></div>',
			link: function(scope, ele, attr) {
				scope.xw = function() {
					ele.find(".z-d").slideToggle(200);
				}
			}
		}
	}).filter('offset', function() {
		return function(arr, ss) {
			return arr.slice(6 * ss, 6 * (ss + 1));
		};
	}).filter("strfilter",function(){
		return function(value,str){
			var newArr = [];
			for(var i=0; i<value.length; i++){
				if(value[i].title.indexOf(str) != -1){
					newArr.push(value[i]);
				}
			}
			return newArr;
		}
	}).directive('shujw', function() { //自定义指令
		return {
			restrict: 'EACM', //仅限元素名调用
			template: '<div class="z-kj"style="display: none;"> <div class="HRshare2"><span class="sz-p">分享到:</span><br /><div class="lk"><a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey" class="hr-share-qzone"></a></div><div class="lk"><a href="http://service.weibo.com/share/share.php?url=http://127.0.0.1:8020/ss/index.html" class="hr-share-tsina"></a></div><div class="lk"><a href="http://share.tianya.cn/openapp/restpage/activity/appendDiv.jsp" class="hr-share-tianya"></a></div><div class="lk"><a href="http://v.t.qq.com/share/share.php" class="hr-share-tqq"></a></div><div class="lk"><a href="http://t.163.com/article/user/checkLogin.do" class="hr-share-twangyi"></a></div><div class="lk"><a href="http://cang.baidu.com/do/add" class="hr-share-baidu"></a></div></div>',
			link: function(scope, ele, attr) {
	     		ele.find('.HRshare2').HRshare({size:32});
			}
		}
	})

