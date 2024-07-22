//current page checking if not, change page
var url=window.location.href;
var sitter=""
var villageid=(url.split("village=")[1]).split("&")[0];
if (/t=/g.test(url)) {
    sitter = "t=" + (url.split("t=")[1]).split("&")[0];
}
var targetUrl = "screen=overview_villages&mode=incomings&subtype=attacks&group=0&page=0";
var urlnow = url.includes(targetUrl);
if (!urlnow) {
    alert("인커밍 오버뷰 창으로 이동합니다..");
    var url = document.URL.split('?')[0] + "?" + sitter + "&village=" + villageid + "&screen=overview_villages&mode=incomings&subtype=attacks&group=0&page=0";
    window.location.href = url;

}else{
    var now=localStorage.getItem('now') || "대기";
    var monitor1 = setInterval(monitor, 10000);
    var pt=0;
    function bot() {
        if (document.getElementById('bot_check') || document.getElementById('label')||document.getElementById("#botprotection_quest") ) {
            localStorage.setItem("now", "bot"); clearInterval(monitor1);
        }
    }
    function monitor() {
        pt++
        var dd = Date.parse(Date());
        localStorage.incoming_date = dd;
        UI.InfoMessage('Monitor', 40000);
        var load= 15;
        var pid=game_data.player.id;
        var ia=localStorage.getItem("ia_"+pid)|| "0";
        var incoming = parseInt(document.getElementById('incomings_amount').innerText); console.log("incoming은"+incoming+"ia는"+ia);
        var man = document.getElementsByClassName("overview_filters_manage");
        man[0].innerText = "Manage filters    모니터링 " + ia + " Incoming //새로고침=" + pt +" 번째 확인중"
        if (localStorage.now !== "대기") {
            UI.InfoMessage('잠시 대기 현재는 ' + localStorage.now, 16000);
        } else {
            if (incoming > ia) {
                UI.InfoMessage('태깅이 시작됩니다.. ', 2000);
                clearInterval(monitor1);
                if (window.tagg== undefined) {
                    window.parent.document.body.style.display = 'none';
                    var table = document.getElementById("overview_filters");
                        tagg = document.createElement('iframe');
                        tagg.style.height = '100%';
                        tagg.style.width = '100%';
                        tagg.style.border = 'none';
                        tagg.setAttribute('id', 'taggid');
                        tagg.setAttribute('class', 'taggclass');
                        tagg.setAttribute('name', 'taggName');
                        tagg.src = game_data.link_base_pure + 'overview_villages&mode=incomings&type=unignored&subtype=all&group=0&page=0';
                        $('body')[0].appendChild(tagg);
                    var table = document.getElementById("incomings_table");
                    if (table) {
                        $('input:checkbox').each(function() {
                            this.checked = !this.checked;
                        });
                        $('input[name=label]').click();
                        localStorage.setItem("ia_" + window.game_data.player.id, incoming);
                    }
                }

            }else if(incoming < ia){
              localStorage.setItem("ia_" + window.game_data.player.id, incoming);
            }
        }

    }
    monitor()}
