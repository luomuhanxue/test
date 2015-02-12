var server_url = "http://123.57.72.148:8080/Meituan/";
//var server_url = "http://www.ifxme.com:8080/Meituan/";

DealPost = {

		/**
		 * 获取城市列表和id
		 * @param callback
		 * @param failed
		 * @returns
		 */
	cityList : function(callback, failed) {
		var url1 = server_url+'city/list';
		var ret = $.ajax({
			url : url1,
			type : 'POST',
			data : {},
			dataType : "jsonp",
			success : function(json) {
				if (json.ret == 0) {
					callback(json.data);
				} else {
					alert(json.msg);
				}
			},
			error : function(obj, error) {
				failed(error);
			}
		});
		return ret;
	},
	//根据城市分来获取城市
	cateList : function(city_id,callback, failed) {
		var url1 = server_url+'deal/cateList';
		var ret = $.ajax({
			url : url1,
			type : 'POST',
			data : {cityId:city_id},
			dataType : "jsonp",
			success : function(json) {
				if (json.ret == 0) {
					callback(json.data);
				} else {
					alert(json.msg);
				}
			},
			error : function(obj, error) {
				failed(error);
			}
		});
		return ret;
	},
	/**
	 * 获取团购列表
	 * 
	 * @param city_id
	 *            城市id 'maanshan'
	 * @param deal_cate
	 *            大分类
	 * @param deal_subcate
	 *            子分类
	 * @param page_number
	 *            当前页数
	 * @param page_size
	 *            每页条数
	 * @param callback
	 * @param failed
	 * @returns
	 */
	dealList : function(city_id, deal_cate, deal_subcate, page_number,
			page_size, callback, failed) {
		var url1 = server_url + 'deal/list';
		var ret = $.ajax({
			url : url1,
			type : 'POST',
			data : {
				cityId : city_id,
				dealCate : deal_cate,
				dealSubcate : deal_subcate,
				pageNumber : page_number,
				pageSize : page_size
			},
			dataType : "jsonp",
			success : function(json) {
				if (json.ret == 0) {
					callback(json.data,json.count);
				} else {
					failed(json);
				}
			},
			error : function(obj, error) {
				failed(error);
			}
		});
		return ret;
	},

	/**
	 * 搜索团购信息
	 * 
	 * @param city_id
	 *            城市id 'maanshan'
	 * @param deal_title
	 *            团购标题 匹配开头模糊查询
	 * @param deal_name
	 *            团购名字 匹配开头模糊查询
	 * @param deal_cate
	 *            团购 大分类
	 * @param deal_subcate
	 *            团购小分类
	 * @param page_number
	 *            当前页数
	 * @param page_size
	 *            每页显示条数
	 * @param callback
	 * @param failed
	 * @returns
	 */
	search : function(city_id, deal_title, deal_name, deal_cate, deal_subcate,
			page_number, page_size, callback, failed) {
		var url1 = server_url+'deal/search';
		var ret = $.ajax({
			url : url1,
			type : 'POST',
			data : {
				cityId : city_id,
				dealTitle : deal_title,
				dealName : deal_name,
				dealCate : deal_cate,
				dealSubcate : deal_subcate,
				pageNumber : page_number,
				pageSize : page_size
			},
			dataType : "jsonp",
			success : function(json) {
				if (json.ret == 0) {
					callback(json.data);
				} else {
					failed(json);
				}
			},
			error : function(obj, error) {
				failed(error);
			}
		});
		return ret;
	},

	detail : function(deal_id, callback, failed) {
		var url1 = server_url+'deal/detail';
		var ret = $.ajax({
			url : url1,
			type : 'POST',
			data : {
				dealId : deal_id
			},
			dataType : "jsonp",
			success : function(json) {
				if (json.ret == 0) {
					callback(json.data);
				} else {
					failed(json);
				}
			},
			error : function(obj, error) {
				failed(error);
			}
		});
		return ret;
	},

};

/*
var cityListCallBack = function(data) {
	for ( var i = 0; i < data.length; i++) {
		console.warn(data[i].divisionName);// 城市名字
	}
}

var listCallBack = function(data) {
	for ( var i = 0; i < data.length; i++) {
		console.warn(data[i].dealName);// 商品名字
	}
}

var objCallBack = function(data) {
	console.warn(data.dealName);// 商品名字
}

var failCallBack = function(json) {
	console.error(json.msg);// 错误信息
}

 DealPost.cityList(cityListCallBack, failCallBack);
 DealPost.dealList('maanshan', null, null, 1, 20, listCallBack, failCallBack);
 DealPost.search('maanshan', null, null, null, null, 1, 20,
 listCallBack,failCallBack);
 DealPost.detail(10774543, objCallBack, failCallBack);

var listCallBack = function(data) {
	console.log(data.length);
	for(key in data){
		console.log(key);
	}
	for ( var i = 0; i < data.length; i++) {
		console.warn(data[i].dealName);// 商品名字
	}
};
var failCallBack = function(json) {
	console.error(json.msg);// 错误信息
};

DealPost.dealList('shanghai', null, null, 1, 120, listCallBack, failCallBack);

console.log("aaaaxx");
*/