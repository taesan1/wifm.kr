if (localStorage.now == "태그") {
    setTimeout(function() {
        tagging();
    }, Math.floor(Math.random() * 2000) + 2000);
}

if (document.URL.match(/screen=overview_villages&mode=incomings&subtype=attacks&group=0&page=0/i)) {
    console.log("인커밍")
    var stop=localStorage.stop; if(!stop){stop="0";localStorage.stop=0};
    var dd = Date.parse(Date());
    localStorage.incoming_date = dd;
    var tag = "";
    var del = Math.floor((Math.random() * 1000));
    var mode = localStorage.mode;
    let def = JSON.parse(localStorage.getItem('MODE_DEF_options')) || {
        dodn: 4,
        dodny: 15,
    };
    var pname=game_data.player.name;
    var tim = "0",
        villy = "0",
        ap = "0",
        cc = 999,
        group = localStorage.group,
        iic = 0,
        i,
        pt = 0;
    var pid=window.game_data.player.id;var pname=game_data.player.name;
    var dodn = parseInt(def.dodn);
    var mon = (Math.floor(Math.random() * def.dodny / 10) + parseInt(def.dodny)) * 1000;
    var ia=parseInt(localStorage["ia_"+pid]);
    var incoming = parseInt(document.getElementById('incomings_amount').innerText);console.log("incoming은"+incoming+"ia는"+ia);
    if (ia == "undefined") {
        ia = "0";
        localStorage.setItem("ia_" + window.game_data.player.id, ia);
    }
    var sitter = "";
    var man = document.getElementsByClassName("overview_filters_manage");
    var link = window.location.href;
    var villageid = (link.split("village=")[1]).split("&")[0];
    if (/t=/g.test(link)) {
        sitter = "t=" + (link.split("t=")[1]).split("&")[0]
    };
    link = document.URL.split('?')[0] + "?" + sitter + "&village=" + villageid + "&screen=overview_villages&mode=incomings&subtype=attacks&group=0&page=0";
    var link2 = document.URL.split('?')[0] + "?" + sitter + "&village=" + villageid + "&screen=overview_villages&mode=incomings&subtype=attacks&group=0&page=-1";
    var man = document.getElementsByClassName("overview_filters_manage");
    man[0].innerText = "Manage filters         로딩중..";
    if (incoming <= ia && document.querySelector("#paged_view_content > div.overview_filters > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type=text]").value != "" && localStorage.now == "대기") {
        UI.InfoMessage('필터 삭제..', 1000, 'error');
        setTimeout(function() {
            document.querySelector("#paged_view_content > div.overview_filters > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type=text]").value = "";
            document.forms[0].submit();
        }, Math.floor(Math.random() * 2000) + 1500);
    }

    function defense() {
        UI.InfoMessage('체크중..', 1000);
        if (document.querySelector("#paged_view_content > div.overview_filters > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type=text]").value != "") {
            UI.InfoMessage('필터 삭제..', 1000, 'error');
            setTimeout(function() {
                document.querySelector("#paged_view_content > div.overview_filters > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type=text]").value = "";
                document.forms[0].submit();
            }, Math.floor(Math.random() * 2000) + 1200);
        } else {
            var count = 0;
            var randomNum = Math.random();
            var label="Dodged ";
            /* if (randomNum < 0.125) {
                 label = "Dodged ";
             } else if (randomNum < 0.25) {
                 label = "닷지 ";
             } else if (randomNum < 0.375) {
                 label = "닷 ";
             } else if (randomNum < 0.5) {
                 label = "닷지됨 ";
             } else if (randomNum < 0.625) {
                 label = "닷지 | ";
             } else if (randomNum < 0.75) {
                 label = "닷ㄷ지 ";
             } else{
                 label = "닷쥐 ";}


             */

            var table = document.getElementById("incomings_table");
            var al=localStorage.getItem('al') || '0';
            if (table) {
                var row = [];
                var ii = 1;
                for (i = 1; i < cc; i++) {
                    row = table.rows[i];
                    var end = /Selecionar todas/g.test(row.cells[0].innerHTML);
                    if (end) {
                        i = cc;
                    } else {
                        var gododged = /Dodged/g.test(row.cells[0].innerHTML);
                        var gododged1 = /닷/g.test(row.cells[0].innerHTML);
                        var gostack = /stacked/g.test(row.cells[0].innerHTML);
                        var gostack1 = /ST/g.test(row.cells[0].innerHTML);
                        var goattack = / Attack /g.test(row.cells[0].innerHTML);
                        var goAtaque = / Ataque /g.test(row.cells[0].innerHTML);

                        var gonoble = /nobre/g.test(row.cells[0].innerHTML);
                        var gonoble1 = /Nobre /g.test(row.cells[0].innerHTML);
                        var gonoble2 = /noble/g.test(row.cells[0].innerHTML);
                        var gonoble3 = /Noble/g.test(row.cells[0].innerHTML);
                        var gosmall = /attack_small/g.test(row.cells[0].innerHTML);
                        var gomedium = /attack_medium/g.test(row.cells[0].innerHTML);
                        var golarge = /attack_large/g.test(row.cells[0].innerHTML);
                        var gosniped = /sniped/g.test(row.cells[0].innerHTML);
                        var done = /done/g.test(row.cells[0].innerHTML);
                        var done1 = /완/g.test(row.cells[0].innerHTML);
                        var fake = /fake/g.test(row.cells[0].innerHTML);
                        var wait = /wait/g.test(row.cells[0].innerHTML);

                        if (goattack||goAtaque) {
                            console.log("Attack");
                            tag = 1;
                            var time = $(row).find("td").eq(5).html();
                            if (tim == "0") {
                                tim = time.split("<")[0];
                            };
                            ap = $(row).find("td").eq(3).html();
                            ap = ap.split(">")[1];
                            ap = ap.split("<")[0];
                            var vill = $(row).find("td").eq(1).html();
                            vill = vill.split("village=")[1];
                            var villn = vill.split(">")[1];
                            villn = villn.split("<")[0];
                            if (villy == "0") {
                                villy = vill.split("&")[0];
                            }
                            console.log(villy);
                        };
                        var village = row.cells[1].innerHTML;
                        village = village.split("village=")[1];
                        var villa = village.split("&")[0];
                        var landTime = row.cells[5].innerHTML.trim();
                        landTime = landTime.split("<")[0];
                        landTime = landTime.substring(0, landTime.length - 1);
                        var landTime = row.cells[6].innerHTML;
                        landTime = landTime.split(":");
                        var hr = landTime[0].split(">")
                        var hr1 = parseInt(hr[1]) * 60;
                        var min = parseInt(landTime[1]);
                        var lt3 = min + hr1;
                        ii = i + 1;

                        //노블  "Noble" 또는 "noble " 에 해당하고  "wait" / "done" / "완" / "sniped" / "ST" / "Stacked"에 전부해당하지 않아야돼
                        if ((gonoble||gonoble1||gonoble2||gonoble3)&&!done&&!done1&&!gosniped&&!wait&&!gostack1&&!gostack&&!gosmall){
                            var landTime0 = row.cells[5].innerHTML.trim();
                            var landTime1 = landTime0.split("<")[0];
                            landTime1 = landTime1.substring(0, landTime1.length - 1);
                            var landTime2 = landTime0.split("<")[1];
                            landTime2 = landTime2.split(">")[1];
                            var lt4=landTime1+":"+landTime2;
                            console.log("landTime1 "+landTime1); console.log("landTime2 "+landTime2);
                            var time = $(row).find("td").eq(5).html();
                            if (tim == "0") {
                                tim = time.split("<")[0];
                            };
                            ap = $(row).find("td").eq(3).html();
                            ap = ap.split(">")[1];
                            ap = ap.split("<")[0];
                            var vill = $(row).find("td").eq(1).html();
                            vill = vill.split("village=")[1];
                            var villn = vill.split(">")[1];
                            villn = villn.split("<")[0];
                            if (villy == "0") {
                                villy = vill.split("&")[0];
                            };
                            var originn=$(row).find("td").eq(2).html();
                            var destination=$(row).find("td").eq(1).html();
                            var regex = /\((\d+\|\d+)\)/;
                            var matchh = regex.exec(originn);
                            var match = regex.exec(destination);
                            var origin = matchh?.[1] ?? "좌표 없음";
                            var destination = match?.[1] ?? "좌표 없음";
                            //  message = "[노블] [대상←출발: "+destination+"←"+origin+"] [남은 시간: "+lt3+"분] [도착 시간: "+lt4+"] ["+pname+"]←["+ap+"]"
                            cw = document.URL.split('?')[0] + "?" + sitter + "&village=" + villa;
                            var nl = "window.open(cw,'_blank');";
                            UI.InfoMessage('<a onclick=' + nl + '>Open the Noble</button>', 10000);

                        }
                    }

                    var stop=localStorage.stop;

                    //닷지   "Dodged" / "done" / "완" / "sniped" / "fake" / "ST" / "Stacked" 를 제외한 모든 태그 닷지&&!gostack1
                    if (!gododged&&!gododged1&&!gostack&&!gosniped&&!done&&!done1&&!fake&&stop==0&&mode=="방어"){
                        if (count < 1 && lt3 < dodn) {
                            count++;
                            $(row).find('.rename-icon').click();
                            old = $(row).find('input[type=text]').val();
                            $(row).find('input[type=text]').val(label +old);
                            $(row).find('input[type=button]').click();
                            if (lt3 < 1) {
                                lt3 = 1;
                            };
                            localStorage["dodge" + villa] = lt3;
                            localStorage["dodget" + villa] = lt3;
                            localStorage["dodger" + villa] = 0;
                            cw = document.URL.split('?')[0] + "?" + sitter + "&village=" + villa + "&screen=place";
                            var ll = localStorage["ll"];
                            if (ll != cw) {
                                localStorage["ll"] = cw;
                                localStorage["mode"] = "방어";
                                window.open(cw, "Dodge", "height=700,width=600");
                                //open(cw);focus();
                            } else {
                                delete localStorage["ll"];
                            }
                        }
                    }
                }
            }
        }
    }

    function tagging() {
        var incoming = parseInt(document.getElementById('incomings_amount').innerText);UI.InfoMessage('필터 교체중 ', 1000);
        if (document.querySelector("#paged_view_content > div.overview_filters > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type=text]").value != "Ataque" && incoming > parseInt(document.querySelector("#incomings_table > tbody > tr:nth-child(1) > th:nth-child(1)").innerText.split("\(")[1])) {
            document.querySelector("#paged_view_content > div.overview_filters > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type=text]").value = "Ataque";
            document.forms[0].submit();
        } else {
            localStorage.now = "대기";UI.InfoMessage('태깅..', 1000);
            localStorage.setItem("ia_" + window.game_data.player.id, incoming);
            var table = document.getElementById("incomings_table");
            if (table) {
                $('input:checkbox').each(function() {
                    this.checked = !this.checked;
                });
                $('input[name=label]').click();

            }
        }
    }

    function bot() {
        if ((document.getElementById('bot_check') != null || document.getElementById('label')) && localStorage.now != "bot") {
            localStorage.setItem("now", "bot");
            clearInterval(gooo);
        }
    }

    function monitor() {
        dd = Date.parse(Date());
        localStorage.incoming_date = dd;
        UI.InfoMessage('Monitor', 1000);
        var incoming = parseInt(document.getElementById('incomings_amount').innerText);
        var ia=parseInt(localStorage["ia_"+pid]);
        pt++;
        man = document.getElementsByClassName("overview_filters_manage");
        man[0].innerText = "Manage filters         닷지 " + dodn + " 분 / 모니터링 " + ia + " Incoming //새로고침=" + pt + " // 매 " + parseInt(mon / 1000) + " 초 //현재 모드는 "+mode+"  현재 상태는 "+ now;

        if (localStorage.now !== "대기") {
            UI.InfoMessage('잠시 대기 현재는 ' + localStorage.now, 16000);

        } else {
            if (pt > Math.floor(Math.random() * 20) + 60) {UI.InfoMessage('페이지 새로고침.. ', 1000);
                window.location.reload();
            };
            if (incoming > ia || tag == 1) {
                UI.InfoMessage('공격 발견 ', 2000);
                localStorage.setItem("now", "태그");
                clearInterval(gooo);
                man = document.getElementsByClassName("overview_filters_manage");
                man[0].innerText = "Manage filters         닷지 " + dodn + " 분 / 모니터링 " + ia + " Incoming //새로고침=" + pt + " // 매 " + parseInt(mon / 1000) + " 초";
                setTimeout(function() {
                    window.location.href = link;
                }, Math.floor(Math.random() * 15000) + 15000);
            }
            if (incoming < ia) {
                ia = incoming;
                localStorage.setItem("ia_" + window.game_data.player.id, ia);
            }
            if (incoming > 0) {
                defense();
            }
        }
    }
    if (localStorage.now == "태그") {UI.InfoMessage('태그가 시작됩니다.. ', 2000);
        setTimeout(function() {
            tagging();
        }, Math.floor(Math.random() * 5000) + 4000);
    }
    var gooo = setInterval(monitor, mon);

}
//change page
else {
    var sitter = "";
    var man = document.getElementsByClassName("overview_filters_manage");
    var link = window.location.href;

    var villageid = (link.split("village=")[1]).split("&")[0];
    if (/t=/g.test(link)) {
        sitter = "t=" + (link.split("t=")[1]).split("&")[0]
    };
    link = document.URL.split('?')[0] + "?" + sitter + "&village=" + villageid + "&screen=overview_villages&mode=incomings&subtype=attacks&group=0&page=0";
    setTimeout(function() {
        window.location.href = link;
    }, Math.floor(Math.random() * 2000) + 2200);
}