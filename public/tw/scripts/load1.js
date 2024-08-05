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
    setTimeout(function (){
        var elements = document.querySelectorAll("#group_table > tbody [data-village-id]");
        var vid = Array.from(elements).map(function(element) {
            return element.getAttribute("data-village-id");
        });
        var randomVid = vid[Math.floor(Math.random() * vid.length)];
        if (/t=/.test(t.link)) {
            t.sitter = "t=" + (t.link.split("t=")[1]).split("&")[0];
        }

        if (t.sitter === "") {
            t.link = document.URL.split('?')[0] + "?village=" + randomVid + "&screen=place";
        } else {
            t.link = document.URL.split('?')[0] + "?" + t.sitter + "&village=" + randomVid + "&screen=place";
        }

        if (t.link !== window.location.href) {
            window.location.href = t.link;
        }
    },2000)
}

