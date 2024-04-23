var com = localStorage.cmd + "/cmd.js";
var box = document.createElement("div");
box.style.width = "30px";
box.style.height = "30px";
box.style.padding = "0";
box.style.border = "none";
box.style.background = "transparent";
box.style.cursor = "pointer";
box.style.position = "absolute";
box.style.top = "0";
box.style.left = "0";
box.style.zIndex = "9999";

box.addEventListener("click", function() {
    $.getScript(com);
});

var targetElement = document.querySelector("#header_info > tbody > tr > td:nth-child(4) > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td.box-item.icon-box.firstcell");
targetElement.style.position = "relative";
targetElement.appendChild(box);



//플레이어 정보
//이름, 플레이어id, 부족id, 빌라id, 빌라좌표, 현재 그룹, 월드, 유닛, 스크린
var message="안녕하세요",messagetime;var scavon = localStorage.getItem('scavon') || '1';
var name=game_data.player.name;var pid=game_data.player.id; var tid=game_data.player.ally; var vid=game_data.village.id; var vcoord=game_data.village.coord;
var gid=game_data.group_id; var world=game_data.world;localStorage.setItem("world",world);var screen=game_data.screen; var unit=game_data.unit; var sitter=game_data.player.sitter;
console.log(message+ ' ' +name+ '님 현재 빌리지는 '+ vcoord+ ' 입니다. 현재 스크린 위치는 '+screen+' 입니다.');

//페이지,메시지
var stop=localStorage.stop; if(!stop){stop="0";localStorage.stop=0};
var mstop =localStorage.getItem('mstop') || '0';
var page,page1,page2,page3,page4;var tim="";
var dd = Date.parse(Date());

//딜레이
var delay=localStorage["delay"];
if (!delay){delay=0};
var del=Math.floor((Math.random() * delay));

//모드와 상태 그리고 동줍 메인
var mode=localStorage["mode"]; if(!mode){mode="X";localStorage.mode="X";};
var now=localStorage.now; if(!now){now="대기";localStorage.now="대기";};
if(!now=="대기"){UI.InfoMessage('현재 '+now+'중     모드는 '+mode,2000,'error');}
var fgg =  localStorage.fgg;if(!fgg){fgg="0";localStorage.fgg="0"};


//시터
var cw=window.location.href;
var siiter ="";



function bot() {
    if (document.getElementById('bot_check') || document.getElementById('label')||document.getElementById("#botprotection_quest") ) {
        localStorage.setItem("now", "bot");
        message = "BOT Alert";alert();
        addRedBox();
        clearInterval();
    }
};
//봇 stop
if(now=="bot"){
    addRedBox()
    setInterval(function(){
        if(document.getElementById('bot_check') == null&&!document.getElementById('label')){localStorage.now="대기";}},2000);
};

function addRedBox() {
    var selectors = ["#checkbox", "#bot_check > a", "#botprotection_quest"];
    selectors.forEach(function(selector) {
        var box = document.querySelector(selector);
        if (box) {
            var redBox = document.createElement("div");
            redBox.style.position = "absolute";
            redBox.style.width = "6px";
            redBox.style.height = "23px";
            redBox.style.backgroundColor = "#FF000E";
            redBox.style.opacity = "1";
            redBox.style.zIndex = "1";
            box.insertAdjacentElement("beforebegin", redBox);
        }
    });
}

function alert(){
    var audio = new Audio('https://wifm.site/tw/al.wav');audio.loop = true;audio.play();setTimeout(function(){audio.pause(tim)},5000);};


bot();
//main



var rec= localStorage.rec ;if(!rec){rec=0;localStorage.rec="0"};
page=new RegExp("village="+vid+"&screen=overview");
page1=new RegExp("screen=overview&village="+vid);
if((document.URL.match(page)||document.URL.match(page1))&&!document.URL.match(/_/)&&now=="대기"&&stop==0) {
    bot();
    var la=setInterval(landat,10000);
    var n= 0
    function landat(){
        n++
        var pop = parseInt(game_data.village.pop);
        var pmx = parseInt(game_data.village.pop_max);
        var ppp =parseInt(pmx-pop);
        var ir = game_data.village.iron;
        var st = game_data.village.stone;
        var wo = game_data.village.wood;
        var rec= localStorage.rec;
        if (wo >= 500 && st >= 500 && ir >= 500 && ppp > 30)  {
            var c = document.querySelector("#show_summary > div > div > div.visual-label.visual-label-stable.tooltip-delayed > a > span.building-extra");
            var d = document.querySelector("#show_summary > div > div > div.visual-label.visual-label-barracks.tooltip-delayed > a > span.building-extra");
            var f = document.querySelector("#show_summary > div > div > div.visual-label.visual-label-stable.tooltip-delayed");
            function rr(){
                localStorage.setItem("rec", "1");
                UI.InfoMessage('징집이 시작됩니다..', 3000);
            }
            if (!f) {
                if(d){
                    //기마건물 x 기마시간 x 병영시간 o
                    var d1 = d.innerText;
                    var dd = parseInt(d1.split(":")[0]) * 3600 + parseInt(d1.split(":")[1]) * 60 + parseInt(d1.split(":")[2]);
                    if (dd < 60) {
                        rr()
                    }}else{
                    //기마건물 x 기마시간 x 병영시간 x
                    rr()}
            }else {
                if(c&&d){
                    //기마건물 o 기마시간 o 병영시간 o
                    var d1 = d.innerText;
                    var dd = parseInt(d1.split(":")[0]) * 3600 + parseInt(d1.split(":")[1]) * 60 + parseInt(d1.split(":")[2]);
                    var c1 = c.innerText;
                    var cc = parseInt(c1.split(":")[0]) * 3600 + parseInt(c1.split(":")[1]) * 60 + parseInt(c1.split(":")[2]);
                    var tt;
                    if (cc < dd) {
                        tt = cc;
                    } else {
                        tt = dd;
                    }
                    if(tt<60){rr()}

                }else if((c||d)||(!c&&!d)){
                    // 기마시간 x 병영시간 x 없거나 둘중 하나 있으면
                    rr()};}}
        if(rec==1){
            UI.InfoMessage('징집 페이지로 이동합니다..', 2000);
            setTimeout(function(){
                window.location.href = "https://"+world+".tribalwars.net/game.php?village="+vid+"&screen=train";},Math.floor(Math.random() * 1000)+5100);
        }else if(rec==3){
            UI.InfoMessage('페이지를 새로고침 합니다 ', 3000);
            localStorage.setItem("rec", "0");
            window.location.reload();}
        UI.InfoMessage('모니터링중입니다.. 조건이 충족되지 않았습니다 ', 3000); console.log("모니터링 중입니다.");
        if(n > Math.floor(Math.random() * 40)+40){
            UI.InfoMessage('페이지를 새로고침 합니다 ', 1000);
            window.location.reload();
        };
        var time4= document.querySelector("#overview_buildqueue > tbody > tr:nth-child(1) > td:nth-child(2) > span");
        if(time4){
            var time1 =time4.innerText;
            var time2 =parseInt(time1.split(":")[0]*3600)+parseInt(time1.split(":")[1]*60)+parseInt(time1.split(":")[2]);
            if(time2 < 176){var time3= document.querySelector("#overview_buildqueue > tbody > tr:nth-child(1) > td:nth-child(3) > a.order_feature.coinbag-free");
                setTimeout(function() {
                    time3.click(); UI.InfoMessage('건물의 시간을 단축합니다.. ', 1000); },Math.floor(Math.random() * 6000)+3100);
            }}else{console.log("건설중인 빌딩이 없어")}
    }
}
if(document.URL.includes("screen=report")&&stop==0&&now=="대기") {
    var count = 0; // 스크립트 실행 횟수를 추적하는 변수
    var nnn = Math.floor(Math.random() * 30) + 55; // 55에서 85사이의 임의의 수 생성
    var la = setInterval(landat, 5000);
    function landat(){
        if(scavon ==1){
            window.top.UI.InfoMessage('대기중..'+count+'번 실행 됨 ', 3000);
            $.getScript('https://wifm.site/tw/starting/scav.js');
            count += 1;
            if(count == nnn) {
                window.top.UI.InfoMessage('페이지를 새로고침 합니다', 3000);
                location.reload();
            }}
        if(scavon ==0){
            setTimeout(function() {
                window.top.UI.InfoMessage('잠시 대기해주세요 스캐빈징이 시작됩니다..', 10000);
            }, 10000);
            $.getScript('https://wifm.site/tw/starting/scav.js');
        }
    }}

if(document.URL.includes("screen=place&mode=scavenge_mass")&&stop==0&&scavon==0&&now=="대기") {
    setInterval(a, 5000);
    function a() {
        // #sendMass 요소 확인
        if (document.querySelector("#sendMass")) {
            console.log("Element #sendMass exists");
            var a = document.querySelector("#sendMass");
            a.click(); window.top.UI.InfoMessage('버튼이 클릭됩니다..', 1000);
            setTimeout(function() {
                window.top.UI.InfoMessage('페이지를 이동합니다..', 1000);
                localStorage.setItem('scavon', 1);
                window.location.href = "https://" + world + ".tribalwars.net/game.php?village=" + vid + "&screen=report";
            }, 9000);
        } else {
            console.log("Element #sendMass does not exist");
            setTimeout(function() {
                $.getScript('https://shinko-to-kuma.com/scripts/massScavenge.js');
            }, 2000);
        }
    }
}

if (document.URL.match("&screen=train") && stop == 0 && localStorage.rec == 1&&now=="대기") {
    UI.InfoMessage('징집됩니다.. ', 1000);
    var ir = game_data.village.iron;
    var st = game_data.village.stone;
    var wo = game_data.village.wood;
    var a = document.querySelector("#spear_0");
    var b = document.querySelector("#light_0");
    var c = document.querySelector("#sword_0");
    var trElements = document.querySelectorAll("#train_form > table > tbody > tr");
    trElements.forEach(function (trElement) {
        var inputElement = trElement.querySelector("td:nth-child(2) > input");
        console.log(inputElement);
        if (inputElement) {

            if (b && wo < 125 && st < 100 && ir < 250) {
                UI.InfoMessage('창이 징집됩니다.. ', 4000);
                b.value = 0;
                a.value = Math.floor(Math.random() * 3) + 1;
            } else if (!b) {
                if(wo < ir){
                    UI.InfoMessage('검이 징집됩니다.. ', 4000);
                    c.value = Math.floor(Math.random() * 3) + 1;
                    a.value = 0;}else {
                    UI.InfoMessage('창이 징집됩니다.. ', 4000);
                    a.value = Math.floor(Math.random() * 3) + 1;
                    c.value = 0;
                }
            } else if (b && wo > 275 && st > 190 && ir > 280) {
                UI.InfoMessage('창과 기마가 징집됩니다.. ', 4000);
                b.value = 1;
                a.value = Math.floor(Math.random() * 3) + 1
            }else if(b && wo > 175 && st > 130 && ir > 260) {
                UI.InfoMessage('창과 기마가 징집됩니다.. ', 4000);
                b.value = 1;
                a.value = 1;
            }
            setTimeout(function () {
                UI.InfoMessage('오버뷰로 이동합니다.. ', 1000);
                inputElement.click();
                localStorage.setItem("rec", "3");
                window.location.href = "https://" + world + ".tribalwars.net/game.php?village=" + vid + "&screen=overview";
            }, Math.floor(Math.random() * 5000) + 5100);
        }
    });
};


//파밍
if(document.URL.match("&screen=am_farm")&&fgg==0){$.getScript("https://wifm.site/tw/enhancer/enhancerAltb4.js");}

// 프리미엄 pp
page="&screen=market&mode=exchange";
if(document.URL.match(page)&&mstop==0) {


    var sellat=0;

    var buyat=1;



    setInterval(function () {
        bot();
        var stockwood = parseInt(document.getElementById('premium_exchange_stock_wood').innerText);
        var capwood = parseInt(document.getElementById('premium_exchange_capacity_wood').innerText);
        var difwood = capwood - stockwood;
        var ratewood = parseInt(document.getElementById('premium_exchange_rate_wood').innerText);
        var ratestone = parseInt(document.getElementById('premium_exchange_rate_stone').innerText);
        var rateiron = parseInt(document.getElementById('premium_exchange_rate_iron').innerText);
        var stockstone = parseInt(document.getElementById('premium_exchange_stock_stone').innerText);
        var capstone = parseInt(document.getElementById('premium_exchange_capacity_stone').innerText);
        var difstone = capstone - stockstone;
        var stockiron = parseInt(document.getElementById('premium_exchange_stock_iron').innerText);
        var capiron = parseInt(document.getElementById('premium_exchange_capacity_iron').innerText);
        var difiron = capiron - stockiron;
        var stop = localStorage.stop
        if (ratewood > buyat || ratestone > buyat || rateiron > buyat || ratewood < sellat || ratestone < sellat || rateiron < sellat || stop == 0) {
            document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1 COLOR="GREEN"> WOOD=' + difwood + '  CLAY=' + difstone + '  IRON=' + difiron + ' sell at=' + sellat + ' buy at=' + buyat + ' </FONT><br>';

            // Call the buy() function for each resource if their stock value changed
            if (stockwood > 120) {
                buy("wood", stockwood);
            }
            if (stockstone > 120) {
                buy("stone", stockstone);
            }
            if (stockiron > 120) {
                buy("iron", stockiron);
            }

        } else {
            document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1 COLOR="RED"> WOOD=' + difwood + '  CLAY=' + difstone + '  IRON=' + difiron + ' sell at=' + sellat + ' buy at=' + buyat + ' </FONT><br>';
        }
    }, 1);
}
function buy(resource, amount) {
    var inputElement = document.querySelector("#premium_exchange_buy_" + resource + " > div:nth-child(1) > input");
    var confirmElement = document.querySelector("#premium_exchange_form > input");
    var confirmButton = document.querySelector("#premium_exchange > div > div > div.confirmation-buttons > button.btn.evt-confirm-btn.btn-confirm-yes");

    // Set the amount to buy in the input field
    inputElement.value = amount;

    // Submit the form
    confirmElement.click();

}


