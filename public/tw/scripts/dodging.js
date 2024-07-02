//current page checking if not, change page
var url=window.location.href;
var sitter=""
var villageid=(url.split("village=")[1]).split("&")[0];
if (/t=/g.test(url)) {
    sitter = "t=" + (url.split("t=")[1]).split("&")[0];
}
var targetUrl = "screen=place";
var urlnow = url.includes(targetUrl);
if (!urlnow) {
    alert("Please move to Rallypoint");
    var url = document.URL.split('?')[0] + "?" + sitter + "&village=" + villageid + "&screen=place";
    window.location.href = url;

}else{
//if page is rally page
    async function fnFillRallyPoint() {
        //current page checking
        var sitter = "";
        var link = window.location.href;
        var villageid = (link.split("village=")[1]).split("&")[0];
        if (/t=/g.test(link)) {
            sitter = "t=" + (link.split("t=")[1]).split("&")[0]
        };
        //get neighbor villa coord
        var htmlCode = await $.get(document.URL.split('?')[0] + "?" + sitter + "&village=" + villageid +"&screen=place&mode=neighbor");
        var f = $(htmlCode).find("#content_value")
            .find("table")
            .find("tr:nth-child(2)")
            .find("td:nth-child(1)");
        if (f.length > 0) {
            var crd = f[0].innerText;
            var coord3 = crd.match(/\(([^)]+)\)/)[1];
            console.log(coord3);
        }
            var coordSplit = coord3.split("|");
        document.forms[0].x.value = coordSplit[0];
        document.forms[0].y.value = coordSplit[1];
    }
    fnFillRallyPoint();
    //checking world unit and calculate current unit
    var units = game_data.units;
    var light = parseInt(document.forms[0].light.nextSibling.nextSibling.innerHTML.match(/\d+/));
    var catapult = parseInt(document.forms[0].catapult.nextSibling.nextSibling.innerHTML.match(/\d+/));
    var heavy = parseInt(document.forms[0].heavy.nextSibling.nextSibling.innerHTML.match(/\d+/));
    var spy = parseInt(document.forms[0].spy.nextSibling.nextSibling.innerHTML.match(/\d+/));
    var spear = parseInt(document.forms[0].spear.nextSibling.nextSibling.innerHTML.match(/\d+/));
    var sword = parseInt(document.forms[0].sword.nextSibling.nextSibling.innerHTML.match(/\d+/));
    var axe = parseInt(document.forms[0].axe.nextSibling.nextSibling.innerHTML.match(/\d+/));
    var ram = parseInt(document.forms[0].ram.nextSibling.nextSibling.innerHTML.match(/\d+/));
    var snob = parseInt(document.forms[0].snob.nextSibling.nextSibling.innerHTML.match(/\d+/));
    var archer =0;
    var marcher=0;
    var knight= 0;
    if (units.includes("archer")){
         var archer = parseInt(document.forms[0].archer.nextSibling.nextSibling.innerHTML.match(/\d+/));
         var marcher = parseInt(document.forms[0].marcher.nextSibling.nextSibling.innerHTML.match(/\d+/));}
    if (units.includes("knight")){
        var knight = parseInt(document.forms[0].knight.nextSibling.nextSibling.innerHTML.match(/\d+/));}

    //put dodging unit
    if (light > 6 || catapult > 10 || archer > 10 || heavy > 6 || spy > 10 || spear > 10 || sword > 10 || axe > 10 || snob > 0|| ram > 10) {
        var heavy1 = Math.floor(heavy * 4);
        var deff = parseInt(archer+spear+sword+heavy1);
        if (deff > 700 && deff < 6000) {
            spear = Math.max(0, spear - Math.floor(spear * 0.2));
            archer = Math.max(0, archer - Math.floor(archer * 0.2))
            sword = Math.max(0, sword - Math.floor(sword * 0.2))
            heavy = Math.max(0, heavy - Math.floor(heavy * 0.2))
            if (spy > 2) {
                spy = spy - 3;
            } else {
                spy = 0;
            }
            ;
            if (ram > 5) {
                ram = ram - 3
            } else {
                ram = 0;
            }
            ;
            if (catapult > 5) {
                catapult = catapult -2
            } else {
                catapult = 0;
            }

        }else if(deff > 6000){
            spear = Math.max(0, spear - Math.floor(spear * 0.1));
            archer = Math.max(0, archer - Math.floor(archer * 0.1))
            sword = Math.max(0, sword - Math.floor(sword * 0.1))
            heavy = Math.max(0, heavy - Math.floor(heavy * 0.1))
            if (spy > 2) {
                spy = spy - 3;
            } else {
                spy = 0;
            }
            ;
            if (ram > 5) {
                ram = ram - 3
            } else {
                ram = 0;
            }
            ;
            if (catapult > 5) {
                catapult = catapult - 3
            } else {
                catapult = 0;
            }

        }else if(deff <3000){
            if (spy > 2) {
                spy = spy - 3;
            } else {
                spy = 0;
            };
            if (ram>5){ ram=ram-3;} else {ram=0;};
            if (catapult>5){ catapult=catapult-3;} else {catapult=0;};
            if (spear > 2) {
                spear = spear - 2;
            } else {
                spear = 0;
            }
            if (sword > 5) {
                sword = sword - 3;
            } else {
                sword = 0;
            }
            if (archer > 5) {
                archer = archer -3;
            }else{
                archer = 0;
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
        if (units.includes("archer")){
            document.forms[0].archer.value =archer;
            document.forms[0].marcher.value =marcher;}
        if (units.includes("knight")){
            document.forms[0].knight.value =knight;}
    }else{ UI.InfoMessage('no need dodge', 2000);console.log("dodge xx");}}
