if (document.URL.match(/screen=place/i)) {
    var limit = game_data.village.points*0.1

    ar all1 = localStorage.getItem("fake9");
    var coord = all1.split(' ');
    var coordSplit = coord[Math.floor(Math.random() * coord.length)].split('|');
    document.forms[0].x.value = coordSplit[0];
    document.forms[0].y.value = coordSplit[1];
    var spear = parseInt(document.forms[0].spear.nextSibling.nextSibling.innerHTML.match(/\d+/));
    var axe = parseInt(document.forms[0].axe.nextSibling.nextSibling.innerHTML.match(/\d+/));
    var rams = parseInt(document.forms[0].ram.nextSibling.nextSibling.innerHTML.match(/\d+/));
    var cats = parseInt(document.forms[0].catapult.nextSibling.nextSibling.innerHTML.match(/\d+/));
    var spy = parseInt(document.forms[0].spy.nextSibling.nextSibling.innerHTML.match(/\d+/));





}