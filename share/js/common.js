var config = {
    rootUrl:"https://91vpn.github.io/91vpn",
    OpenInstallAppKey:"u36mva",
    potatoCAll:"pt://resolve?domain=p91vpn",
    potatoUrl:"https://pt.im/joinchat/0026c0944d4fb147454488401643d9890d1"
};



var  browser = {
        versions:   function()  {
            var  u  =  window.navigator.userAgent;
            return  {
                trident:  u.indexOf('Trident')  >  -1, //IE内核
                presto:  u.indexOf('Presto')  >  -1, //opera内核
                Alipay:  u.indexOf('Alipay')  >  -1, //支付宝
                webKit:  u.indexOf('AppleWebKit')  >  -1, //苹果、谷歌内核
                gecko:  u.indexOf('Gecko')  >  -1  &&  u.indexOf('KHTML')  ==  -1, //火狐内核
                mobile:  !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios:  !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android:  u.indexOf('Android')  >  -1  ||  u.indexOf('Linux')  >  -1, //android终端或者uc浏览器
                iPhone:  u.indexOf('iPhone')  >  -1  ||  u.indexOf('Mac')  >  -1, //是否为iPhone或者安卓QQ浏览器
                //iPhone: u.match(/iphone|ipod|ipad/),//
                iPad:  u.indexOf('iPad')  >  -1, //是否为iPad
                webApp:  u.indexOf('Safari')  ==  -1, //是否为web应用程序，没有头部与底部
                weixin:  u.indexOf('MicroMessenger')  >  -1, //是否为微信浏览器
                qq: u.match(/\sQQ/i) !== null, //是否QQ
                Safari:  u.indexOf('Safari')  >  -1,
                ///Safari浏览器,
            };
        }(),
      query :""
    };

browser.query = window.location.href.split("?")[1];
browser.query = (browser.query == undefined?"":"?"+browser.query);


function buildQrcode(id,url){
    var qrcode = jQuery("#" + id).qrcode(url);
    var canvas = qrcode.find('canvas').get(0);
    $("#" + id + " img").attr("src", canvas.toDataURL('image/jpg')).show();
    $("#" + id + " canvas").remove();
}


/**
 * 打开potato客服
 * @returns {boolean}
 */
function potato(){
    var timeout = 2300, timer = null;
    if(browser.versions.weixin||browser.versions.qq) {
        alert("请在手机浏览器中打开");
    } else {
        var startTime = Date.now();
        if(browser.versions.android) {
            var ifr = document.createElement('iframe');
            ifr.src = "pt://resolve?domain=p91vpn";//这里是唤起App的协议，有Android可爱的同事提供
            ifr.style.display = 'none';
            document.body.appendChild(ifr);
            timer = setTimeout(function() {
                var endTime = Date.now();
                if(!startTime || endTime - startTime < timeout + 300) {
                    document.body.removeChild(ifr);
                    window.open("https://mobile.baidu.com/item?docid=26057937&source=mobres&from=1010680m");
                }
            }, timeout);
        }
        if(browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
                window.location.href = "pt://resolve?domain=p91vpn"; //唤起协议，由iOS小哥哥提供
                timer = setTimeout(function() {
                    window.location.href = "https://apps.apple.com/cn/app/potato-chat/id1204726898";
                }, timeout);
        }
    }

    return false;
}

function install(btn1,btn2,btn3){
    var data = OpenInstall.parseUrlParams();
    new OpenInstall({
        appKey : config.OpenInstallAppKey,
        onready : function() {
            var m = this;
            var initInstallBtn = function(btn){
                var button = document.getElementById(btn);
                if(null!=button){
                    button.style.visibility = "visible";
                    button.onclick = function() {
                        m.install();
                        return false;
                    }
                }
            }
            initInstallBtn(btn1);
            initInstallBtn(btn2);
            initInstallBtn(btn3);
        }
    }, data);
}