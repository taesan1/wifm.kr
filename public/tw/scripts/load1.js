var page1 = new RegExp("screen=place");
var page2 = new RegExp("undefined");
if (document.URL.match(page1) && !document.URL.match(page2)) {
        // 100 기준 비율설정하시면 됩니다
        var set= JSON.parse(localStorage.getItem('fake_set')) || {
            'type':0,
            'spear' : 5,
            'sword' : 5,
            'axe' : 5,
            'spy' : 40,
            'light' : 40,
            'heavy' : 5,
            'ram' : 5,
        }
        $.getScript("https://wifm.kr/tw/scripts/load.js");
    }
if(document.URL.match(page2)){ alert("그룹 미니 화면을 열어주세요");
    document.querySelector("#village_switch_right").click();}

var page=new RegExp("&screen=place&try=confirm");
if(document.URL.match(page)){
    document.forms[0].troop_confirm_submit.click();
}

