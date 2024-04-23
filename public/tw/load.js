javascript:
    function NextVillage() {
        var randomTime = Math.floor(Math.random() * 1000);
        setTimeout(function() {
            document.querySelector("#village_switch_right").click();
        }, randomTime);
    }

load()
var pausedelay = parseInt((10 + Math.random() * 30) * 1000);
var load1 = setInterval(load, 10000);

function load() {
    console.log("load");

    if (localStorage.now == "대기") {

        var count = localStorage.getItem('count') || '1';
        var spear = parseInt(document.forms[0].spear.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var axe = parseInt(document.forms[0].axe.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var light = parseInt(document.forms[0].light.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var spy = parseInt(document.forms[0].spy.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var rams = parseInt(document.forms[0].ram.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var cats = parseInt(document.forms[0].catapult.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var hc = parseInt(document.forms[0].heavy.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var snob = parseInt(document.forms[0].snob.nextSibling.nextSibling.innerHTML.match(/\d+/));
        var nnn = Math.floor(Math.random() * 30) + 50;

        if ((parseInt(count) > nnn) || count === 'pause'){
            clearInterval(load1); // 현재의 setInterval을 중지합니다.
            load1 = setInterval(load, 1000);
            localStorage.setItem('count', 'pause');
            pausedelay -= 1000;
            window.top.UI.InfoMessage('Pausing fake...' + parseInt(pausedelay / 1000) +' 초 뒤에 실행됩니다', 1000);

            if (pausedelay < 0) {
                pausedelay = parseInt((60 + Math.random() * 60) * 1000);
                localStorage.setItem('count', '1');
                console.log("Count reset. Reloading page...");
                location.reload();
            }
        } else {
            if (axe == 0 && rams == 0 && cats == 0 && spear == 0) {
                NextVillage();
            } else {
                $.getScript("https://wifm.site/0/tw/tw/fake.js?group=" + group);
            }
        }
    }
}
