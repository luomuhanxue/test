DetailPage = {
    data: null,
    init: function (pageInto, pageOut, response) {
        var that = this;
        var page = $('#detail_page');
        var head = page.find("#detail-head");
        var title = head.find("#detail-title");
        var back = head.find(".back")[0];
        back.classList.add('btn-focus');
        back.onclick = function(){
            that.back();
        };
        //back.z_idx = 0;
        //back.z_group = 1;
        this.refreshData();
    },
    enter: function () {
        this.refreshData();
    },
    out: function () {

        $(".more_img").remove();

    },
    setData: function (json) {
        this.data = json;
    },
    refreshData:function()
    {
        if (this.data) {
            var json = this.data;//详细数据

            $("#detail-title").text(json.dealName=null?"":json.dealName);
            $("#id_deal_title").text(json.dealTitle=null?json.dealName:json.dealTitle);
            $("#id_deal_price").text(json.price=null?"":json.price);
            $("#id_sale_num").text(json.salesNum=null?"":json.salesNum);
            $("#id_shop_name").text(json.dealSeller=null?"":json.dealSeller + "(" + json.dealAddress + ")");
            $("#id_deal_value").text("￥" + json.value);

            function html_encode(str)
            {
                var s = "";
                if (str.length == 0) return "";
                s = str.replace(/&/g, ">");
                s = s.replace(/</g, "<");
                s = s.replace(/>/g, ">");
                s = s.replace(/ /g, " ");
                s = s.replace(/\'/g, "'");
                s = s.replace(/\"/g, "\"");
                s = s.replace(/\n/g, "<br><br>");
                return s;
            }

            $("#id_deal_text").append(html_encode(json.dealTips));
            $("#id_rebate").text(json.rebate + "折");
            $("#id_deal_info").text(json.dealDesc);
            $("#id_deal_pic").attr("src",json.dealImg);


            function formatDate(timestamp) {
                var date = new Date(timestamp);
                var year=date.getYear()+1900;
                var month=date.getMonth()+1;
                var day=date.getDate();
                var hour=date.getHours();
                var minute=date.getMinutes();
                var second=date.getSeconds();
                return year+"."+month+"."+day+"";
            }
            //有效期
            $("#id_youxiao").text(formatDate(json.couponStartTime*1000)+" 至 "+formatDate(json.couponEndTime*1000) );

            var shopList = json.shopList;
            for (var i = 0; i < shopList.length; i++) {
                if (shopList[i].shopAddr == json.dealAddress) {
                    $("#id_deal_shop_tel").text(shopList[i].shopTel);
                }
            }

            if(json.dealMoreImg!=null)
            {
                var picArray = json.dealMoreImg.split(",");
                for(var i=0;i<picArray.length;i++)
                {
                    var morePic = document.createElement("img");
                    morePic.src=picArray[i];
                    morePic.className="more_img";
                    $("#id_deal_more_img").append(morePic);
                }
            }
        }
    },
    onkeydown: function (keycode) {
        switch(keycode)
        {
            case KeyCode.right:
                //$("#deal_content")[0].focus();
                break;
            case KeyCode.left:
                 //this.back();
                break;
            case KeyCode.up:
                //console.assert("up");
                //$("#deal_content")[0].focus();
                break;
            case KeyCode.down:
                //console.assert("down");
                //$("#deal_content")[0].focus();
                break;
            case KeyCode.enter:
            case KeyCode.back1:
            case KeyCode.back2:
                this.back();
                return;
        }
    }
};

extend(DetailPage, Page);