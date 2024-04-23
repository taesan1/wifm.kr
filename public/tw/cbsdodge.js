
async function fnFillRallyPoint() {
    var sitter = "";
    var link = window.location.href;
    var villageid = (link.split("village=")[1]).split("&")[0];
    if (/t=/g.test(link)) {
        sitter = "t=" + (link.split("t=")[1]).split("&")[0]
    };

    var htmlCode = await $.get(document.URL.split('?')[0] + "?" + sitter + "&village=" + villageid +"&screen=place&mode=neighbor");

// 필요한 요소들을 찾아서 값을 얻는 방법
    var f = $(htmlCode).find("#content_value")
        .find("table")
        .find("tr:nth-child(2)")
        .find("td:nth-child(1)");

    if (f.length > 0) {
        var crd = f[0].innerText;
        var coord3 = crd.match(/\(([^)]+)\)/)[1]; // 괄호 안의 내용 추출
        localStorage.setItem("nearcoord_"+window.game_data.village.id, coord3)
        console.log(coord3);
    }


    var coordSplit = coord3.split("|");
    document.forms[0].x.value = coordSplit[0];
    document.forms[0].y.value = coordSplit[1];
}




var coord3=localStorage["nearcoord_"+window.game_data.village.id];
var now=localStorage.now
var dtime=localStorage["dodge"+window.game_data.village.id];

var light = parseInt(document.forms[0].light.nextSibling.nextSibling.innerHTML.match(/\d+/));
var catapult = parseInt(document.forms[0].catapult.nextSibling.nextSibling.innerHTML.match(/\d+/));
var heavy = parseInt(document.forms[0].heavy.nextSibling.nextSibling.innerHTML.match(/\d+/));
var spy = parseInt(document.forms[0].spy.nextSibling.nextSibling.innerHTML.match(/\d+/));
var spear = parseInt(document.forms[0].spear.nextSibling.nextSibling.innerHTML.match(/\d+/));
var sword = parseInt(document.forms[0].sword.nextSibling.nextSibling.innerHTML.match(/\d+/));
var axe = parseInt(document.forms[0].axe.nextSibling.nextSibling.innerHTML.match(/\d+/));
var ram = parseInt(document.forms[0].ram.nextSibling.nextSibling.innerHTML.match(/\d+/));
var snob = parseInt(document.forms[0].snob.nextSibling.nextSibling.innerHTML.match(/\d+/));
var knight = parseInt(document.forms[0].knight.nextSibling.nextSibling.innerHTML.match(/\d+/));
if (light > 6 || catapult > 10  || heavy > 6 || spy > 10 || spear > 10 || sword > 10 || axe > 10 || snob > 0|| ram > 10) {
    var pallycd = localStorage.pallycd || ""; //
    var coordss = pallycd.split(" ");

    var villageCoord = game_data.village.coord;

    for (var i = 0; i < coordss.length; i++) {
        var coordPair = coordss[i].split("|");

        var x = coordPair[0]; // x 좌표
        var y = coordPair[1]; // y 좌표

        if (villageCoord === x + "|" + y) {
            console.log("찾았다");
            knight = 0
            break;
        }
    }
    var heavy1 = Math.floor(heavy * 4);
    var deff = parseInt(spear+sword+heavy1)
    var random = Math.floor(Math.random() * 5) + 2;
    if (deff > 700 && deff < 6000) {
        spear = Math.max(0, spear - Math.floor(spear * 0.2));
        sword = Math.max(0, sword - Math.floor(sword * 0.2))
        heavy = Math.max(0, heavy - Math.floor(heavy * 0.2))
        if (spy > 2) {
            spy = spy - 3;
        } else {
            spy = 0;
        }
        ;
        if (ram > 5) {
            ram = ram - random;
        } else {
            ram = 0;
        }
        ;
        if (catapult > 5) {
            catapult = catapult - random;
        } else {
            catapult = 0;
        }

    }else if(deff > 6000){
        spear = Math.max(0, spear - Math.floor(spear * 0.1));
        sword = Math.max(0, sword - Math.floor(sword * 0.1))
        heavy = Math.max(0, heavy - Math.floor(heavy * 0.1))
        if (spy > 2) {
            spy = spy - 3;
        } else {
            spy = 0;
        }
        ;
        if (ram > 5) {
            ram = ram - random;
        } else {
            ram = 0;
        }
        ;
        if (catapult > 5) {
            catapult = catapult - random;
        } else {
            catapult = 0;
        }

    }else if(deff <3000){
        if (spy > 2) {
            spy = spy - 3;
        } else {
            spy = 0;
        };
        if (ram>5){ ram=ram-random;} else {ram=0;};
        if (catapult>5){ catapult=catapult-random;} else {catapult=0;};
        if (spear > 2) {
            spear = spear - 2;
        } else {
            spear = 0;
        }
        if (sword > 5) {
            sword = sword - random;;
        } else {
            sword = 0;
        }

    }
    document.forms[0].light.value =light;
    document.forms[0].catapult.value =catapult;
    document.forms[0].heavy.value =heavy;
    document.forms[0].spy.value =spy;
    document.forms[0].spear.value =spear;
    document.forms[0].sword.value =sword;
    document.forms[0].axe.value =axe;
    document.forms[0].ram.value =ram;
    document.forms[0].snob.value =snob;
    document.forms[0].knight.value =knight;
    document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1 COLOR="blue">Dodge time='+dtime+'<br> Dodge! </FONT><br>';
    fnFillRallyPoint();

    if (document.forms[0].x.value!=""){console.log("서폿 버튼이 눌립니다");
        localStorage.setItem("dodge"+window.game_data.village.id, coord3);
        setTimeout(function(){document.forms[0].support.click();},1000);}else{console.log("좌표가 입력되지 않았습니다");
        document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1 COLOR="blue"> 좌표가 입력되지 않았습니다 새로고침 됩니다.  Mode='+mode+' now='+now+' RELOADING</FONT> ';setTimeout(function(){location.reload();;},Math.floor(Math.random() * 900)+1200);}

}else{console.log("닷지유닛이 없습니다"); delete localStorage["dodge"+window.game_data.village.id];self.close();}

