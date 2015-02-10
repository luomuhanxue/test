
//A:[{display:"安庆",data:"177"},{display:"鞍山",data:"178"},
/*
var datas = mydata.data;
for(key in datas){
	var arr = datas[key];
	var len = arr.length;
	var str_arr = [];
	for (var i = 0; i < len; ++i){
		var item = arr[i];
		var str = '{display:"'+item.divisionName+'",data:"'+item.divisionId+'"}';
		str_arr[i] = str;
	};
	console.log('"'+key+'":['+str_arr.join(",")+']');
}
*/

/*
a:8
b:19
c:29
d:25	
e:5

f:13
g:21
h:44
j:37
k:7

l:48
m:13
n:14
q:20
p:14

r:9
s:42
t:22
w:22

x:44
y:37
z:36
*/
for(key in citys){
	alert(key+":"+citys[key].length);
}