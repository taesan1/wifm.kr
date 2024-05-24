javascript:
if(document.URL.includes("&screen=place&mode=scavenge_mass")) {
var time; var cc=0;
var scavtime=localStorage.getItem('scavtime')|| 30;
var c=prompt("몇분뒤에 스캐빈징을 시작할지 숫자(분)를 입력하세요.",localStorage.scavtime);
localStorage.setItem('scavtime',c);
UI.InfoMessage('시작합니다 화면을 유지해주세요..', 2000);
function b(){
        cc++
        var scavt=parseInt(localStorage.scavtime)*6;
        var scavtt=scavt-cc;
        if(cc<scavt){
        UI.InfoMessage(scavtt+'번 새로고침 뒤에 실행됩니다', 5000);}
        else{
            time=setInterval(b, 5000);
            // #sendMass 요소 확인
            if (document.querySelector("#sendMass")) {
                console.log("Element #sendMass exists");
                var a = document.querySelector("#sendMass");
                a.click();
                window.top.UI.InfoMessage('버튼이 클릭됩니다..', 1000);
                setTimeout(function() {
                    a.click();
                    window.top.UI.InfoMessage('버튼이 클릭됩니다..', 1000);
                }, 3000);
                setTimeout(function() {
                    UI.InfoMessage('종료됩니다', 5000);
                   location.reload();
                }, 9000);
            } else {
                console.log("Element #sendMass does not exist");
                setTimeout(function() {
                    $.getScript('https://shinko-to-kuma.com/scripts/massScavenge.js');
                }, 2000);
            }
        }

    }
    time=setInterval(b,10000);
}else {

    var sitter = "";
    var bbb = window.location.href;
    var villageid = (bbb.split("village=")[1]).split("&")[0];
    if (/t=/g.test(bbb)) {
        sitter = "t=" + (bbb.split("t=")[1]).split("&")[0];
    }
    alert("스캐빈징 페이지로 이동합니다 다시 실행해주세요 ..");
    var bbb = document.URL.split('?')[0] + "?" + sitter + "&village=" + villageid + "&screen=place&mode=scavenge_mass";
    window.location.href = bbb;
}



