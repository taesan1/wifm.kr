var point =game_data.village.points; var limit =parseInt(point*0.01); console.log("limit :"+limit);
var unit={
    "spear": { "t":0,"pop":1,"speed":18,"n":parseInt(document.forms[0].spear.nextSibling.nextSibling.innerHTML.match(/\d+/))},
    "sword": {"t":0, "pop":1,"speed":22,"n":parseInt(document.forms[0].sword.nextSibling.nextSibling.innerHTML.match(/\d+/))},
    "axe": {"t":0, "pop":1,"speed":18,"n":parseInt(document.forms[0].axe.nextSibling.nextSibling.innerHTML.match(/\d+/))},
    "spy": {"t":0, "pop":2,"speed":9,"n":parseInt(document.forms[0].spy.nextSibling.nextSibling.innerHTML.match(/\d+/))},
    "light": {"t":0, "pop":4,"speed":10,"n":parseInt(document.forms[0].light.nextSibling.nextSibling.innerHTML.match(/\d+/))},
    "heavy": {"t":0, "pop":6,"speed":11,"n":parseInt(document.forms[0].heavy.nextSibling.nextSibling.innerHTML.match(/\d+/))},
    "ram": {"t":0, "pop":5,"speed":30,"n":parseInt(document.forms[0].ram.nextSibling.nextSibling.innerHTML.match(/\d+/))},
    "catapult"  : {"t":0, "pop":8,"speed":30,"n":parseInt(document.forms[0].catapult.nextSibling.nextSibling.innerHTML.match(/\d+/))},
    "snob": {"t":0, "pop":100,"speed":35,"n":parseInt(document.forms[0].snob.nextSibling.nextSibling.innerHTML.match(/\d+/))},
    "knight": {"t":0, "pop":10,"speed":10,"n":parseInt(document.forms[0].knight.nextSibling.nextSibling.innerHTML.match(/\d+/))}
}
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

var coords = localStorage.getItem('fake_setcoord');
if(!coords){ var g1 = prompt("좌표를 공백으로 구분해서 입력해주세요. 예) 111|222 333|123 123|333");
    localStorage.setItem('fake_setcoord', g1);}

var name = 'fake';

var d = document;
function N(a) {
    return (document.getElementsByName(a)[0]);
}
function max(a) {
    return parseInt(d.unit[a].n, 10);
}


if (N('x') && N('x').value == '') {

    if (!N(name))
        $('h3').append('<span name="' + name + '" style="color:green;font-size:15px;"></span>');

    coords = coords.split(' ');
    index = 0;

    farmcookie = d.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    if (farmcookie != null)
        index = parseInt(farmcookie[2]);


    N(name).innerHTML = ' 대기중.. ' + (index + 1) + ' (' + coords[index] + '). Total: ' + coords.length;

    if (index >= coords.length) {
        N(name).style.color = '#F00';
        N(name).innerHTML = ' 완료 ';
    } else
        N(name).style.color = 'green';

    if (index >= coords.length)
        index = 0;

    coords = coords[index];
    coords = coords.split('|');
    index++;

    cookie_date = new Date(2051, 08, 11);
    d.cookie = name + '=' + index + ';expires=' + cookie_date.toGMTString(); // 쿠키 저장

    N('x').value = coords[0];
    N('y').value = coords[1];

    var pop = limit;
    if (limit % 2 !== 0) {
        pop += 1;
    }
    for (let i in unit) {
        if (N(i)) {

            if (unit.catapult.n > 4 && pop > 8 && unit.catapult.n > unit.catapult.t) {
                let catapultToUse = Math.min(unit.catapult.n - unit.catapult.t, Math.floor(pop / unit.catapult.pop)); // 사용 가능한 catapult 수
                unit.catapult.t += catapultToUse;
                pop -= catapultToUse * unit.catapult.pop; // 남은 pop 계산
            }

            if (pop > 0) {
                if (set.type == 1) {
                    let totalRatio = 90;
                    let lightToUse = Math.floor((set.light / totalRatio) * pop / unit.light.pop);
                    let spyToUse = Math.floor((set.spy / totalRatio) * pop / unit.spy.pop) + 2;
                    let ramToUse = Math.floor((set.ram / totalRatio) * pop / unit.ram.pop);
                    let axeToUse = Math.floor((set.axe / totalRatio) * pop / unit.axe.pop);
                    let spearToUse = Math.floor((set.spear / totalRatio) * pop / unit.spear.pop);
                    let swordToUse = Math.floor((set.sword / totalRatio) * pop / unit.sword.pop);
                    let heavyToUse = Math.floor((set.heavy / totalRatio) * pop / unit.heavy.pop);

                    if (spyToUse > unit.spy.n || (spyToUse * unit.spy.pop > pop)) {
                        spyToUse = Math.floor(pop / unit.spy.pop);
                    }
                    if (lightToUse > unit.light.n || (lightToUse * unit.light.pop > pop)) {
                        lightToUse = Math.floor(pop / unit.light.pop);
                    }


                    if (pop >= (spyToUse * unit.spy.pop)) {
                        unit.spy.t += spyToUse;
                        pop -= spyToUse * unit.spy.pop;
                    } else {
                        spyToUse = Math.floor(pop / unit.spy.pop);
                        unit.spy.t += spyToUse;
                        pop -= spyToUse * unit.spy.pop;
                    }

                    if (pop >= (lightToUse * unit.light.pop)) {
                        unit.light.t += lightToUse;
                        pop -= lightToUse * unit.light.pop;
                    } else {
                        lightToUse = Math.floor(pop / unit.light.pop);
                        unit.light.t += lightToUse;
                        pop -= lightToUse * unit.light.pop;
                    }

                    if (ramToUse > unit.ram.n || (ramToUse * unit.ram.pop > pop)) {
                        ramToUse = Math.floor(pop / unit.ram.pop);
                    }
                    if (axeToUse > unit.axe.n || (axeToUse * unit.axe.pop > pop)) {
                        axeToUse = Math.floor(pop / unit.axe.pop);
                    }

                    if (pop >= (ramToUse * unit.ram.pop)) {
                        unit.ram.t += ramToUse;
                        pop -= ramToUse * unit.ram.pop;
                    } else {
                        ramToUse = Math.floor(pop / unit.ram.pop);
                        unit.ram.t += ramToUse;
                        pop -= ramToUse * unit.ram.pop;
                    }

                    if (pop >= (axeToUse * unit.axe.pop)) {
                        unit.axe.t += axeToUse;
                        pop -= axeToUse * unit.axe.pop;
                    } else {
                        axeToUse = Math.floor(pop / unit.axe.pop);
                        unit.axe.t += axeToUse;
                        pop -= axeToUse * unit.axe.pop;
                    }
                    if (spearToUse > unit.spear.n || (spearToUse * unit.spear.pop > pop)) {
                        spearToUse = Math.floor(pop / unit.spear.pop);
                    }
                    if (swordToUse > unit.sword.n || (swordToUse * unit.sword.pop > pop)) {
                        swordToUse = Math.floor(pop / unit.sword.pop);
                    }

                    if (pop >= (spearToUse * unit.spear.pop)) {
                        unit.spear.t += spearToUse;
                        pop -= spearToUse * unit.spear.pop;
                    } else {
                        spearToUse = Math.floor(pop / unit.spear.pop);
                        unit.spear.t += spearToUse;
                        pop -= spearToUse * unit.spear.pop;
                    }

                    if (pop >= (swordToUse * unit.sword.pop)) {
                        unit.sword.t += swordToUse;
                        pop -= swordToUse * unit.sword.pop;
                    } else {
                        swordToUse = Math.floor(pop / unit.sword.pop);
                        unit.sword.t += swordToUse;
                        pop -= swordToUse * unit.sword.pop;
                    }

                    if (heavyToUse > unit.heavy.n || (heavyToUse * unit.heavy.pop > pop)) {
                        heavyToUse = Math.floor(pop / unit.heavy.pop);
                    }

                    if (pop >= (heavyToUse * unit.heavy.pop)) {
                        unit.heavy.t += heavyToUse;
                        pop -= heavyToUse * unit.heavy.pop;
                    } else {
                        heavyToUse = Math.floor(pop / unit.heavy.pop);
                        unit.heavy.t += heavyToUse;
                        pop -= heavyToUse * unit.heavy.pop;
                    }
                } else {
                    let spyToUse = Math.min(unit.spy.n, Math.floor(pop / unit.spy.pop));
                    unit.spy.t += spyToUse;
                    pop -= spyToUse * unit.spy.pop;
                }
            }
            let element = N(i);
            if (element) {
                element.value = unit[i].t;
            }
        }
    }



}document.forms.units.attack.click();void 0