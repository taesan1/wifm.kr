async function getInfoVIllages() {
    return new Promise(async (resolve, reject) => {
        let filename_innoDB = "br128.map"";  // 게임 데이터의 월드 이름을 사용해 파일 이름을 설정
        await insertlibraryLocalBase().catch(err => { alert(err) });  // 로컬 데이터베이스 라이브러리를 삽입, 실패 시 오류 알림
        let data = await localBase.getItem(filename_innoDB).catch(err => { alert(err) });  // 로컬 데이터베이스에서 파일을 가져옴, 실패 시 오류 알림

        console.log("get info VIllages");
        let mapVillage = new Map();  // 마을 정보를 저장할 맵 생성
        let obj = {};
        let mapPlayer = new Map();  // 플레이어 정보를 저장할 맵 생성
        let mapAlly = new Map();  // 동맹 정보를 저장할 맵 생성
        let url= "https://br128.tribalwars.com.br"
        if (data == undefined) {  // 데이터가 없을 경우
            let dataVillage = httpGet(url + "/map/village.txt").split(/\r?\n/);  // 마을 데이터를 가져와서 줄 단위로 분할
            let dataPlayer = httpGet(url + "/map/player.txt").split(/\r?\n/);  // 플레이어 데이터를 가져와서 줄 단위로 분할
            let dataAlly = httpGet(url + "/map/ally.txt").split(/\r?\n/);  // 동맹 데이터를 가져와서 줄 단위로 분할

            for (let i = 0; i < dataAlly.length - 1; i++) {
                let tribeName = innoReplaceSpecialCaracters(dataAlly[i].split(",")[1]);  // 동맹 이름에서 특수 문자를 대체
                mapAlly.set(dataAlly[i].split(",")[0], tribeName);  // 동맹 맵에 ID와 이름을 저장
            }
            for (let i = 0; i < dataPlayer.length - 1; i++) {
                let playerName = innoReplaceSpecialCaracters(dataPlayer[i].split(",")[1]);  // 플레이어 이름에서 특수 문자를 대체
                let tribeName = (mapAlly.get(dataPlayer[i].split(",")[2]) == undefined) ? "none" : mapAlly.get(dataPlayer[i].split(",")[2]);  // 플레이어가 속한 동맹 이름을 가져옴
                mapPlayer.set(dataPlayer[i].split(",")[0], {
                    allyId: dataPlayer[i].split(",")[2],
                    playerName: playerName,
                    tribeName: tribeName
                });  // 플레이어 맵에 ID와 기타 정보를 저장
            }

            for (let i = 0; i < dataVillage.length; i++) {
                if (mapPlayer.get(dataVillage[i].split(",")[4]) != undefined) {
                    mapVillage.set(dataVillage[i].split(",")[2] + "|" + dataVillage[i].split(",")[3], {
                        villageId: dataVillage[i].split(",")[0],
                        playerId: dataVillage[i].split(",")[4],
                        points: dataVillage[i].split(",")[5],
                        allyId: mapPlayer.get(dataVillage[i].split(",")[4]).allyId,
                        playerName: mapPlayer.get(dataVillage[i].split(",")[4]).playerName,
                        tribeName: mapPlayer.get(dataVillage[i].split(",")[4]).tribeName
                    });  // 플레이어가 존재하는 경우 마을 정보를 맵에 저장
                }
            }
            obj.datetime = current_date;  // 객체에 현재 날짜와 시간을 추가
            obj.data = Array.from(mapVillage.entries());  // 객체에 마을 정보를 배열로 변환하여 추가

            let data = JSON.stringify(obj);  // 객체를 JSON 문자열로 변환
            data = replaceSpecialCaracters(data);  // JSON 문자열에서 특수 문자를 대체

            await localBase.setItem(filename_innoDB, data);  // 로컬 데이터베이스에 저장

        } else {  // 데이터가 이미 존재하는 경우
            let ino_db = JSON.parse(data);  // JSON 문자열을 객체로 변환
            let db_date = ino_db.datetime;  // 데이터베이스의 날짜를 가져옴
            mapVillage = new Map(ino_db.data);  // 데이터베이스의 마을 정보를 맵으로 변환하여 저장

            console.log("updating");

            if (new Date(current_date).getTime() - new Date(db_date) > 3600 * 1000) {  // 데이터가 1시간 이상 오래된 경우
                console.log("update database inno");

                let dataVillage = httpGet(url + "/map/village.txt").split(/\r?\n/);  // 최신 마을 데이터를 가져옴
                let dataPlayer = httpGet(url + "/map/player.txt").split(/\r?\n/);  // 최신 플레이어 데이터를 가져옴
                let dataAlly = httpGet(url + "/map/ally.txt").split(/\r?\n/);  // 최신 동맹 데이터를 가져옴

                for (let i = 0; i < dataAlly.length - 1; i++) {
                    let tribeName = innoReplaceSpecialCaracters(dataAlly[i].split(",")[1]);  // 동맹 이름에서 특수 문자를 대체
                    mapAlly.set(dataAlly[i].split(",")[0], tribeName);  // 동맹 맵에 ID와 이름을 저장
                }
                for (let i = 0; i < dataPlayer.length - 1; i++) {
                    let playerName = innoReplaceSpecialCaracters(dataPlayer[i].split(",")[1]);  // 플레이어 이름에서 특수 문자를 대체
                    let tribeName = (mapAlly.get(dataPlayer[i].split(",")[2]) == undefined) ? "none" : mapAlly.get(dataPlayer[i].split(",")[2]);  // 플레이어가 속한 동맹 이름을 가져옴
                    mapPlayer.set(dataPlayer[i].split(",")[0], {
                        allyId: dataPlayer[i].split(",")[2],
                        playerName: playerName,
                        tribeName: tribeName
                    });  // 플레이어 맵에 ID와 기타 정보를 저장
                }

            }
        }


        function insertlibraryLocalBase(){
            return new Promise((resolve,reject)=>{

                let start=new Date().getTime()
                let script = document.createElement('script');
                script.type="text/javascript"
                script.src="https://dl.dropboxusercontent.com/s/22qgnhyxnyono68/libraryIndexedDB.js?dl=0"
                script.onload = function () {
                    let stop=new Date().getTime()
                    console.log(`insert idb library in ${stop-start} ms`)
                    resolve("insert library")
                };
                document.getElementsByTagName("head")[0].appendChild(script);
            })
        }

        function innoReplaceSpecialCaracters(text){//ino database has special characters
            text=text.replaceAll("+"," ")
            text=text.replaceAll("%21","!")
            text=text.replaceAll("%23","#")
            text=text.replaceAll("%24","$")
            text=text.replaceAll("%25","%")

            text=text.replaceAll("%28","(")
            text=text.replaceAll("%29",")")
            text=text.replaceAll("%2A","*")
            text=text.replaceAll("%2B","+")
            text=text.replaceAll("%2C",",")
            text=text.replaceAll("%2F ","/")


            text=text.replaceAll("%3A",":")
            text=text.replaceAll("%3B","}")
            text=text.replaceAll("%3D","=")
            text=text.replaceAll("%3F","?")

            text=text.replaceAll("%40","@")

            text=text.replaceAll("%5B","[")
            text=text.replaceAll("%5D","]")

            text=text.replaceAll("%7B","_")
            text=text.replaceAll("%7C","|")
            text=text.replaceAll("%7D","|")

            text=text.replaceAll("%7E","{")

            text=text.replaceAll("%C3%84","횆")
            text=text.replaceAll("%C3%85","횇")
            text=text.replaceAll("%C3%86","횈")
            text=text.replaceAll("%C3%A2","창")
            text=text.replaceAll("%C3%A4","채")
            text=text.replaceAll("%C3%A5","책")
            text=text.replaceAll("%C3%A6","챈")
            text=text.replaceAll("%C3%B6","철")
            text=text.replaceAll("%C3%B8","첩")
            text=text.replaceAll("%C3%BC","체")

            text=text.replaceAll("%C4%83","훱")

            text=text.replaceAll("%C8%99","�")
            text=text.replaceAll("%C5%A3","큇")
            text=text.replaceAll("%C8%9B","�")

            return text
        }


        function getFakeLimit(){//get and save locally fake limit
            let fake_limit=0;
            if(localStorage.getItem(game_data.world+"fake_limit")!=null){
                fake_limit=parseInt(localStorage.getItem(game_data.world+"fake_limit"))
                console.log("already exist")
            }
            else{
                let data=httpGet("/interface.php?func=get_config").split("\n");
                for(let i=0;i<data.length;i++){
                    if(data[i].includes("fake_limit")){
                        fake_limit=data[i].split("<fake_limit>")[1]
                        fake_limit=fake_limit.split("</fake_limit>")[0]
                        console.log("get limit fake")
                        break;
                    }
                }
                localStorage.setItem(game_data.world+"fake_limit",fake_limit)
            }
            console.log("fake limit "+fake_limit)
            return fake_limit
        }




        function autocomplete(inp, arr) {//autocomplete for adding tribes or admins
            /*the autocomplete function takes two arguments,
            the text field element and an array of possible autocompleted values:*/
            var currentFocus;
            /*execute a function when someone writes in the text field:*/
            inp.addEventListener("input", function(e) {
                var a, b, i, val = this.value;
                /*close any already open lists of autocompleted values*/
                closeAllLists();
                if (!val) { return false;}
                currentFocus = -1;
                /*create a DIV element that will contain the items (values):*/
                a = document.createElement("DIV");
                a.setAttribute("id", this.id + "autocomplete-list");
                a.setAttribute("class", "autocomplete-items");
                /*append the DIV element as a child of the autocomplete container:*/
                this.parentNode.appendChild(a);
                /*for each item in the array...*/
                var counter=0;
                for (i = 0; i < arr.length; i++) {
                    /*check if the item starts with the same letters as the text field value:*/
                    if(arr[i]==undefined)
                        continue
                    if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {

                        /*create a DIV element for each matching element:*/
                        b = document.createElement("DIV");
                        b.style.backgroundColor=backgroundInput
                        /*make the matching letters bold:*/
                        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                        b.innerHTML += arr[i].substr(val.length);
                        /*insert a input field that will hold the current array item's value:*/
                        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                        /*execute a function when someone clicks on the item value (DIV element):*/
                        b.addEventListener("click", function(e) {
                            /*insert the value for the autocomplete text field:*/
                            inp.value = this.getElementsByTagName("input")[0].value;
                            /*close the list of autocompleted values,
                            (or any other open lists of autocompleted values:*/
                            closeAllLists();
                        });
                        counter++;
                        if(counter<=5)
                            a.appendChild(b);
                    }
                }
            });
            /*execute a function presses a key on the keyboard:*/
            inp.addEventListener("keydown", function(e) {
                var x = document.getElementById(this.id + "autocomplete-list");
                if (x) x = x.getElementsByTagName("div");
                if (e.keyCode == 40) {
                    /*If the arrow DOWN key is pressed,
                    increase the currentFocus variable:*/
                    currentFocus++;
                    /*and and make the current item more visible:*/
                    addActive(x);
                } else if (e.keyCode == 38) { //up
                    /*If the arrow UP key is pressed,
                    decrease the currentFocus variable:*/
                    currentFocus--;
                    /*and and make the current item more visible:*/
                    addActive(x);
                } else if (e.keyCode == 13) {
                    /*If the ENTER key is pressed, prevent the form from being submitted,*/
                    e.preventDefault();
                    if (currentFocus > -1) {
                        /*and simulate a click on the "active" item:*/
                        if (x) x[currentFocus].click();
                    }
                }
            });
            function addActive(x) {
                /*a function to classify an item as "active":*/
                if (!x) return false;
                /*start by removing the "active" class on all items:*/
                removeActive(x);
                if (currentFocus >= x.length) currentFocus = 0;
                if (currentFocus < 0) currentFocus = (x.length - 1);
                /*add class "autocomplete-active":*/
                x[currentFocus].classList.add("autocomplete-active");
            }
            function removeActive(x) {
                /*a function to remove the "active" class from all autocomplete items:*/
                for (var i = 0; i < x.length; i++) {
                    x[i].classList.remove("autocomplete-active");
                }
            }
            function closeAllLists(elmnt) {
                /*close all autocomplete lists in the document,
                except the one passed as an argument:*/
                var x = document.getElementsByClassName("autocomplete-items");
                for (var i = 0; i < x.length; i++) {
                    if (elmnt != x[i] && elmnt != inp) {
                        x[i].parentNode.removeChild(x[i]);
                    }
                }
            }
            /*execute a function when someone clicks in the document:*/
            document.addEventListener("click", function (e) {
                closeAllLists(e.target);
            });
        }

        function shuffleArray(array) {//randomize coords from vector
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        function getBonusNight() { //get bonus night
            if (localStorage.getItem(game_data.world+"nightBonus") !== null) {
                let obj=JSON.parse(localStorage.getItem(game_data.world+"nightBonus"))
                console.log("speed world already exist")
                return obj
            }
            else { //Get data from xml and save it in localStorage to avoid excessive XML requests to server
                let data=httpGet("/interface.php?func=get_config") //Load world data
                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(data, 'text/html');
                let obj={}
                //active = 0-> bonus night off, active = 1-> bonus night static,active = 2-> bonus night dynamic
                let active = htmlDoc.getElementsByTagName("night")[0].getElementsByTagName("active")[0].innerHTML
                let start_hour = htmlDoc.getElementsByTagName("night")[0].getElementsByTagName("start_hour")[0].innerHTML
                let end_hour = htmlDoc.getElementsByTagName("night")[0].getElementsByTagName("end_hour")[0].innerHTML
                obj.active=active
                obj.start_hour=start_hour
                obj.end_hour=end_hour


                localStorage.setItem(game_data.world+"nightBonus",JSON.stringify(obj));
                console.log("save speed world")
                return obj
            }
        }


        function getBonusNightForEach(list_href){// return bonus night interval for each player
            return new Promise((solve,reject)=>{
                var counter=0;
                var map_idPlayers=new Map()
                function ajaxRequest (urls) {
                    let villageId
                    let playerId
                    if(urls.length>0){
                        let obj=urls.pop()
                        villageId=obj.villageId
                        playerId=obj.playerId
                    }
                    else{
                        villageId="stop"
                    }
                    let start_ajax=new Date().getTime()
                    if (urls.length >= 0 && villageId!="stop") {
                        $.ajax({
                                   url: game_data.link_base_pure + `map&ajax=map_info&source=${villageId}&target=${villageId}&`,
                                   method: 'get',
                                   success: (data) => {
                                       let night_bonus_interval=data.night_bonus.current_interval.match(/[0-9]{2}:[0-9]{2}/g)
                                       map_idPlayers.set(playerId,{
                                           start_hour:night_bonus_interval[0],
                                           end_hour:night_bonus_interval[1],

                                       })

                                       let stop_ajax=new Date().getTime();
                                       let diff=stop_ajax-start_ajax
                                       console.log("wait: "+diff)
                                       window.setTimeout(function(){
                                           ajaxRequest (list_href)
                                           UI.SuccessMessage("get bonus: "+urls.length)
                                           counter++;
                                       },200-diff)
                                   }
                               })

                    }
                    else
                    {
                        UI.SuccessMessage("done")
                        solve(map_idPlayers)
                    }
                }
                ajaxRequest(list_href);

            })
        }


        function getSpeedConstant() { //Get speed constant (world speed * unit speed) for world
            if (localStorage.getItem(game_data.world+"speedWorld") !== null) {
                let obj=JSON.parse(localStorage.getItem(game_data.world+"speedWorld"))
                console.log("speed world already exist")
                return obj
            }
            else { //Get data from xml and save it in localStorage to avoid excessive XML requests to server
                let data=httpGet("/interface.php?func=get_config") //Load world data
                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(data, 'text/html');
                let obj={}
                let worldSpeed = Number(htmlDoc.getElementsByTagName("speed")[0].innerHTML)
                let unitSpeed = Number(htmlDoc.getElementsByTagName("unit_speed")[0].innerHTML);
                obj.unitSpeed=unitSpeed
                obj.worldSpeed=worldSpeed

                localStorage.setItem(game_data.world+"speedWorld",JSON.stringify(obj));
                console.log("save speed world")
                return obj
            }
        }

        function calcDistance(coord1,coord2)
        {
            let x1=parseInt(coord1.split("|")[0])
            let y1=parseInt(coord1.split("|")[1])
            let x2=parseInt(coord2.split("|")[0])
            let y2=parseInt(coord2.split("|")[1])

            return Math.sqrt( (x1-x2)*(x1-x2) +  (y1-y2)*(y1-y2) );


        }

        function intervalHour(time_start,time_end,time_target){//check if attack lands on bonus time
            if(time_start==0)
                time_start=23*3600*1000+40*60000;
            else
                time_start-=20*60000;

            if(time_start<time_end){
                return(time_target>time_start && time_target<time_end)?true:false
            }
            else{
                return ((time_target>time_end && time_target<time_start))?false:true
            }
        }


        function uploadFile(data,filename,dropboxToken){ // upload file into dropbox
            return new Promise((resolve,reject)=>{
                var file = new Blob([data], {type: "plain/text"});
                var nr_start1=new Date().getTime();
                file.name=filename;

                //stop refreshing the page
                $(document).bind("keydown", disableF5);
                window.onbeforeunload = function (e) {
                    console.log("is uploading");
                    return "are you sure?";
                };

                var xhr = new XMLHttpRequest();
                xhr.upload.onprogress = function(evt) {
                    console.log(evt)
                    var percentComplete = parseInt(100.0 * evt.loaded / evt.total);
                    console.log(percentComplete)
                    UI.SuccessMessage("progress upload: "+percentComplete+"%")
                };

                xhr.onload = function() {
                    if (xhr.status === 200) {
                        var fileInfo = JSON.parse(xhr.response);
                        // Upload succeeded. Do something here with the file info.
                        UI.SuccessMessage("upload succes")
                        var nr_stop1=new Date().getTime();
                        console.log("time upload: "+(nr_stop1-nr_start1))

                        //enable refresh page
                        window.onbeforeunload = function (e) {
                            console.log("done");
                        };
                        $(document).unbind("keydown", disableF5);

                        resolve("succes")

                    }
                    else {
                        var errorMessage = xhr.response || 'Unable to upload file';
                        // Upload failed. Do something here with the error.
                        UI.SuccessMessage("upload failed")
                        reject(errorMessage)
                    }
                };

                xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
                xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
                xhr.setRequestHeader('Content-Type', 'application/octet-stream');
                xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
                                                                           path: '/' +  file.name,
                                                                           mode: 'add',
                                                                           autorename: true,
                                                                           mode:'overwrite',
                                                                           mute: false
                                                                       }));

                xhr.send(file)
            })
        }

        function disableF5(e) { if ((e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 82) e.preventDefault(); };


        function readFileDropbox(filename){// read file from dropbox
            return new Promise((resolve,reject)=>{
                $.ajax({
                           url: "https://content.dropboxapi.com/2/files/download",
                           method: 'POST',
                           dataType: "text",
                           headers: { 'Authorization': 'Bearer ' + dropboxToken,
                               'Dropbox-API-Arg': JSON.stringify({path: "/"+filename})},

                           success: (data) => {
                               resolve(data)
                           },error: (err)=>{
                        console.log(err)
                        reject(err)
                    }
                       })
            })
        }


        function lzw_encode (s) {//data compression
            if (!s) return s;
            var dict = new Map(); // Use a Map!
            var data = (s + "").split("");
            var out = [];
            var currChar;
            var phrase = data[0];
            var code = 256;
            for (var i = 1; i < data.length; i++) {
                currChar = data[i];
                if (dict.has(phrase + currChar)) {
                    phrase += currChar;
                } else {
                    out.push (phrase.length > 1 ? dict.get(phrase) : phrase.codePointAt(0));
                    dict.set(phrase + currChar, code);
                    code++;
                    if (code === 0xd800) { code = 0xe000; }
                    phrase = currChar;
                }
            }
            out.push (phrase.length > 1 ? dict.get(phrase) : phrase.codePointAt(0));
            for (var i = 0; i < out.length; i++) {
                out[i] = String.fromCodePoint(out[i]);
            }
            //console.log ("LZW MAP SIZE", dict.size, out.slice (-50), out.length, out.join("").length);
            return out.join("");
        }

        function lzw_decode (s) {//data decompression
            var dict = new Map(); // Use a Map!
            var data = Array.from(s + "");
            //var data = (s + "").split("");
            var currChar = data[0];
            var oldPhrase = currChar;
            var out = [currChar];
            var code = 256;
            var phrase;
            for (var i = 1; i < data.length; i++) {
                var currCode = data[i].codePointAt(0);
                if (currCode < 256) {
                    phrase = data[i];
                } else {
                    phrase = dict.has(currCode) ? dict.get(currCode) : (oldPhrase + currChar);
                }
                out.push(phrase);
                var cp = phrase.codePointAt(0);
                currChar = String.fromCodePoint(cp); //phrase.charAt(0);
                dict.set(code, oldPhrase + currChar);
                code++;
                if (code === 0xd800) { code = 0xe000; }
                oldPhrase = phrase;
            }
            return out.join("");
        }

        function replaceSpecialCaracters(data){//some special data cannot be compressed
            let result=""
            for(let i=0;i<data.length;i++){
                if(data[i]=="�")
                    result+='t'
                else if(data[i]=="�")
                    result+="T"
                else if(data[i]=="훯")
                    result+="A"
                else if(data[i]=="훱")
                    result+="a"
                else if(data[i]=="횂")
                    result+="A"
                else if(data[i]=="�")
                    result+="S"
                else if(data[i]=="�")
                    result+="s"
                else if(data[i]=="횓")
                    result+="I"
                else if(data[i]=="챤")
                    result+="i"
                else
                    result+=data[i]
            }
            return result




        }
        /*
                function innoReplaceSpecialCaracters(text){ // ino 데이터베이스에 특수 문자가 포함되어 있다.
                    // '+'를 공백으로 대체
                    text = text.replaceAll("+", " ")
                    // '%21'를 '!'로 대체
                    text = text.replaceAll("%21", "!")
                    // '%23'를 '#'로 대체
                    text = text.replaceAll("%23", "#")
                    // '%24'를 '$'로 대체
                    text = text.replaceAll("%24", "$")
                    // '%25'를 '%'로 대체
                    text = text.replaceAll("%25", "%")

                    // '%28'를 '('로 대체
                    text = text.replaceAll("%28", "(")
                    // '%29'를 ')'로 대체
                    text = text.replaceAll("%29", ")")
                    // '%2A'를 '*'로 대체
                    text = text.replaceAll("%2A", "*")
                    // '%2B'를 '+'로 대체
                    text = text.replaceAll("%2B", "+")
                    // '%2C'를 ','로 대체
                    text = text.replaceAll("%2C", ",")
                    // '%2F '를 '/'로 대체
                    text = text.replaceAll("%2F ", "/")

                    // '%3A'를 ':'로 대체
                    text = text.replaceAll("%3A", ":")
                    // '%3B'를 '}'로 대체
                    text = text.replaceAll("%3B", "}")
                    // '%3D'를 '='로 대체
                    text = text.replaceAll("%3D", "=")
                    // '%3F'를 '?'로 대체
                    text = text.replaceAll("%3F", "?")

                    // '%40'를 '@'로 대체
                    text = text.replaceAll("%40", "@")

                    // '%5B'를 '['로 대체
                    text = text.replaceAll("%5B", "[")
                    // '%5D'를 ']'로 대체
                    text = text.replaceAll("%5D", "]")

                    // '%7B'를 '_'로 대체
                    text = text.replaceAll("%7B", "_")
                    // '%7C'를 '|'로 대체
                    text = text.replaceAll("%7C", "|")
                    // '%7D'를 '|'로 대체
                    text = text.replaceAll("%7D", "|")

                    // '%7E'를 '{'로 대체
                    text = text.replaceAll("%7E", "{")

                    // '%C3%84'를 '횆'로 대체
                    text = text.replaceAll("%C3%84", "횆")
                    // '%C3%85'를 '횇'로 대체
                    text = text.replaceAll("%C3%85", "횇")
                    // '%C3%86'를 '횈'로 대체
                    text = text.replaceAll("%C3%86", "횈")
                    // '%C3%A2'를 '창'로 대체
                    text = text.replaceAll("%C3%A2", "창")
                    // '%C3%A4'를 '채'로 대체
                    text = text.replaceAll("%C3%A4", "채")
                    // '%C3%A5'를 '책'로 대체
                    text = text.replaceAll("%C3%A5", "책")
                    // '%C3%A6'를 '챈'로 대체
                    text = text.replaceAll("%C3%A6", "챈")
                    // '%C3%B6'를 '철'로 대체
                    text = text.replaceAll("%C3%B6", "철")
                    // '%C3%B8'를 '첩'로 대체
                    text = text.replaceAll("%C3%B8", "첩")
                    // '%C3%BC'를 '체'로 대체
                    text = text.replaceAll("%C3%BC", "체")

                    // '%C4%83'를 '훱'로 대체
                    text = text.replaceAll("%C4%83", "훱")

                    // '%C8%99'를 '�'로 대체
                    text = text.replaceAll("%C8%99", "�")
                    // '%C5%A3'를 '큇'로 대체
                    text = text.replaceAll("%C5%A3", "큇")
                    // '%C8%9B'를 '�'로 대체
                    text = text.replaceAll("%C8%9B", "�")

                    return text
                }
                */
        function checkPageRun(){//check if the script is run on the right page
            let href=window.location.href
            if(href.includes("screen=place")){
                let list_href=JSON.parse(localStorage.getItem(game_data.world+"launchFakes"));
                if(list_href.length>0){
                    let current_href=list_href.pop();
                    localStorage.setItem(game_data.world+"launchFakes",JSON.stringify(list_href));
                    UI.SuccessMessage("left "+list_href.length+" fakes",1000);

                    window.open(current_href,"_self");
                    throw new Error("fake sent");// i don't like this throw error here


                }
            }
            else if(document.getElementById("combined_table")==null){
                alert("the script must be run from overview_villages&mode=combined ")
                window.location.href=game_data.link_base_pure+"overview_villages&mode=combined"
                throw new Error("wrong page");

            }

        }


        async function startFakes(){
            try {
                let mapTroupes=new Map();
                let mapInfoVillages=await getInfoVIllages();
                let selectModLaunch=document.getElementById("select_option_fakes").value
                let selectAttack=document.getElementById("select_type_attack").value
                let landSpecific=$(".set_troops  input[type=checkbox][value=land_specific]:visible").prop("checked")
                let nrFakesPerVillage=parseInt(document.getElementById("nr_fakes_per_village").value)


                let nrFakes=parseInt(document.getElementById("nr_fakes").value)
                let nrSplits=parseInt(document.getElementById("nr_split").value)
                let minPop=parseInt($(".min_pop:visible").val())
                nrSplits=(Number.isNaN(nrSplits)==true || nrSplits==0)?5:nrSplits
                nrFakes=(Number.isNaN(nrFakes)==true || nrFakes==0)?1:nrFakes
                minPop=(Number.isNaN(minPop)==true || minPop==0)?200:minPop
                nrFakesPerVillage=(Number.isNaN(nrFakesPerVillage)==true || nrFakesPerVillage==0)?4:nrFakesPerVillage
                nrFakesPerVillage--

                let start_window = new Date($(".set_troops .start_window:visible").val())
                let stop_window  = new Date($(".set_troops .stop_window:visible").val())
                if(start_window == "Invalid Date" && $( "input[value='land_specific']:visible").get(0).checked == true){
                    UI.ErrorMessage("set start window",1500)
                    throw new Error("set start window")
                }
                if(stop_window == "Invalid Date" && $( "input[value='land_specific']:visible").get(0).checked == true){
                    UI.ErrorMessage("set stop window",1500)
                    throw new Error("set stop window")
                }
                if(stop_window.getTime() - start_window.getTime() < 0){
                    UI.ErrorMessage("right interval must be higher than left one",2000)
                    throw new Error("right interval must be higher than left one")
                }


                let listFakesTemplate=[];
                let ally_tribe=JSON.parse((dropbox_ally=="")?"[]":dropbox_ally ).map(e=>{return e.allyId})

                let bonusNight=getBonusNight();
                console.log("mapInfoVillages",mapInfoVillages)



                //after btn open tab is pressed get tropps again
                if(document.getElementsByClassName("open_tab").length>0){
                    let start=new Date().getTime();
                    let text_page=httpGet(window.location.href)
                    let table=text_page.match(/<table id="combined_table"((.|\n)+)/)[0].split("<\/table>")[0]+"</table>"
                    document.getElementById("combined_table").innerHTML=table
                    let stop=new Date().getTime();
                    console.log("get combined page in: "+(stop-start)+" ms")
                }


                //////////////////////////////////////////////////////////////get template////////////////////////////////////////////////////////////////
                let limitFake=getFakeLimit()/100;
                console.log(limitFake)
                for(let i=0;i<unitsLength;i++){
                    let troupeName=units[i]
                    let nrTroupe=document.getElementById(troupeName+"Troupe").value
                    mapTroupes.set(troupeName,nrTroupe)
                }

                let table_combined=document.getElementById("combined_table").getElementsByTagName("tr")
                let select_type=document.getElementById("select_type_attack").value

                if(select_type=="fakes"){
                    if(limitFake>0){
                        for(let i=1;i<table_combined.length;i++){
                            let vectorTroupes=Array.from(table_combined[i].getElementsByClassName("unit-item")).map(e=>{return parseInt(e.innerText)})
                            let currentCoord=table_combined[i].getElementsByClassName("quickedit-label")[0].innerText.match(/\d+\|\d+/)[0]
                            let linkBase=table_combined[i].getElementsByClassName("quickedit-content")[0].getElementsByTagName("a")[0].href.replace("overview","place")
                            let villagePoints=mapInfoVillages.get(currentCoord).points
                            let villageId=mapInfoVillages.get(currentCoord).villageId
                            // console.log(linkBase)
                            let limitPop=parseInt(villagePoints*limitFake)+10;
                            // console.log("troupes available")
                            // console.log(vectorTroupes)
                            let availableTroupes={}
                            let totalPop=0;
                            Array.from(mapTroupes.keys()).forEach((key,index)=>{
                                let selectNameTroupe=key;
                                let selectValueTroupe=mapTroupes.get(key)
                                let currentTroupe=vectorTroupes[index]

                                if(selectValueTroupe!=0){
                                    if(currentTroupe>nrFakes){
                                        if(selectValueTroupe>0 && currentTroupe >= selectValueTroupe * nrFakes){
                                            availableTroupes[selectNameTroupe]={
                                                value:selectValueTroupe * nrFakes,
                                                static:"true"
                                            }
                                            totalPop+=nrFakes*troupesPop[selectNameTroupe]*selectValueTroupe
                                        }
                                        else{
                                            availableTroupes[selectNameTroupe]={
                                                value:currentTroupe,
                                                static:"false"
                                            }
                                            totalPop+=currentTroupe*troupesPop[selectNameTroupe]

                                        }
                                    }
                                }

                            })
                            let availableFakesTotal=totalPop/limitPop;
                            // console.log("current coord "+currentCoord)
                            // console.log(availableTroupes)
                            // console.log("limit pop "+limitPop)
                            // console.log("total pop "+totalPop)
                            // console.log("nr possible fakes "+availableFakesTotal)
                            let templateFakes={}
                            let totalPopTemplate=0;
                            Object.keys(availableTroupes).forEach(key=>{
                                if(availableFakesTotal>1.2){
                                    if(availableTroupes[key].static=="false"){
                                        let troupeTemplate=Math.ceil(availableTroupes[key].value/availableFakesTotal)
                                        templateFakes[key]=troupeTemplate
                                        totalPopTemplate+=troupeTemplate*troupesPop[key]
                                    }else{
                                        let troupeTemplate=availableTroupes[key].value/nrFakes
                                        templateFakes[key]=troupeTemplate
                                        totalPopTemplate+=troupeTemplate*troupesPop[key]

                                    }
                                }
                            })
                            // console.log("templateFakes")
                            // console.log(templateFakes)
                            // console.log("total pop sent "+totalPopTemplate)
                            for(let k=0;k<30;k++){
                                Object.keys(templateFakes).forEach(key=>{
                                    if(totalPopTemplate-limitPop>=1 && troupesPop[key]==1){
                                        templateFakes[key]=templateFakes[key]-1;
                                        totalPopTemplate--;
                                    }
                                    if(totalPopTemplate-limitPop>=2 && troupesPop[key]==2 && k%2==0 && availableTroupes[key].static=="false" ){
                                        templateFakes[key]=templateFakes[key]-1;
                                        totalPopTemplate-=2;
                                    }
                                    if(totalPopTemplate-limitPop>=4 && troupesPop[key]==4 && k%2==0){
                                        templateFakes[key]=templateFakes[key]-1;
                                        totalPopTemplate-=4;
                                    }
                                    if(totalPopTemplate-limitPop>=6 && troupesPop[key]==6 && k%4==0){
                                        templateFakes[key]=templateFakes[key]-1;
                                        totalPopTemplate-=6;
                                    }
                                    //rams
                                    if(totalPopTemplate-limitPop>=5 && troupesPop[key]==5 && k%5==0  && templateFakes[key]>1 ){
                                        // console.log("remove ram")
                                        templateFakes[key]=templateFakes[key]-1;
                                        totalPopTemplate-=5;
                                    }
                                    //cats
                                    if(totalPopTemplate-limitPop>=8 && troupesPop[key]==8 && k%5==0  && templateFakes[key]>1){
                                        // console.log("remove cat")
                                        templateFakes[key]=templateFakes[key]-1;
                                        totalPopTemplate-=8;
                                    }





                                    if(templateFakes[key]==0){
                                        delete templateFakes[key]
                                    }

                                })
                                if(totalPopTemplate==limitPop)
                                    break;
                            }
                            // console.log("templateFakes")
                            // console.log()
                            // console.log("total pop sent "+totalPopTemplate)
                            // Object.keys(templateFakes).forEach(key=>{console.log(key+" "+templateFakes[key])})
                            // console.log("-------------------------------------------------------------------------------")
                            let minFakes=Math.min(nrFakes,parseInt(availableFakesTotal))

                            if(availableFakesTotal>1.2 &&(templateFakes["ram"]>=1 || templateFakes["catapult"]>=1)){
                                listFakesTemplate.push({
                                                           templateFakes:templateFakes,
                                                           nrFakes:minFakes,
                                                           limitPop:limitPop,
                                                           totalPopTemplate:totalPopTemplate,
                                                           linkBase:linkBase,
                                                           coordOrigin:currentCoord,
                                                           speedTroop:ramSpeed,
                                                           nrCells:mapTroupes.size
                                                       })
                            }
                        }
                    }
                    else{
                        for(let i=1;i<table_combined.length;i++){

                            let vectorTroupes=Array.from(table_combined[i].getElementsByClassName("unit-item")).map(e=>{return parseInt(e.innerText)})
                            let currentCoord=table_combined[i].getElementsByClassName("quickedit-label")[0].innerText.match(/\d+\|\d+/)[0]
                            let linkBase=table_combined[i].getElementsByClassName("quickedit-content")[0].getElementsByTagName("a")[0].href.replace("overview","place")
                            console.log("linkBase",linkBase)
                            console.log("vectorTroupes",vectorTroupes)
                            let availableTroupes={}
                            Array.from(mapTroupes.keys()).forEach((key,index)=>{
                                let selectNameTroupe=key;
                                let selectValueTroupe=mapTroupes.get(key)
                                let currentTroupe=vectorTroupes[index]

                                if(selectValueTroupe > 0 && selectValueTroupe != "min" && (selectNameTroupe=="spy" ||selectNameTroupe=="ram"|| selectNameTroupe=="catapult" )){
                                    if(currentTroupe >= selectValueTroupe*nrFakes ){
                                        availableTroupes[selectNameTroupe]=selectValueTroupe*nrFakes
                                    }
                                }
                            })
                            console.log("availableTroupes",availableTroupes)
                            let templateFakes={}

                            if(availableTroupes["spy"]>=nrFakes && availableTroupes["ram"]>=nrFakes){
                                templateFakes["spy"]=parseInt(availableTroupes["spy"]/nrFakes)
                                templateFakes["ram"]=parseInt(availableTroupes["ram"]/nrFakes)
                            }
                            else if(availableTroupes["spy"] >= nrFakes && availableTroupes["catapult"] >= nrFakes){
                                templateFakes["spy"] = parseInt(availableTroupes["spy"]/nrFakes)
                                templateFakes["catapult"] = parseInt(availableTroupes["catapult"]/nrFakes)
                            }
                            else if( availableTroupes["ram"]>=nrFakes){
                                templateFakes["ram"] = parseInt(availableTroupes["ram"]/nrFakes)
                            }
                            else if( availableTroupes["catapult"]>=nrFakes){
                                templateFakes["catapult"] = parseInt(availableTroupes["catapult"]/nrFakes)
                            }

                            console.log("-------------------------------------------------------------------------------")
                            if(templateFakes["ram"]>=1 || templateFakes["catapult"]>=1){
                                listFakesTemplate.push({
                                                           templateFakes:templateFakes,
                                                           nrFakes:nrFakes,
                                                           limitPop:0,
                                                           totalPopTemplate:0,
                                                           linkBase:linkBase,
                                                           coordOrigin:currentCoord,
                                                           speedTroop:ramSpeed,
                                                           nrCells:mapTroupes.size

                                                       })
                            }
                        }

                    }
                }
                else{//nukes/fangs
                    let send_troops=Array.from($(".allinputTroops input:visible")).map(e=>parseInt(e.value))
                    let reserve_troops=Array.from($(".allinputTroopsRes input:visible")).map(e=>parseInt(e.value))
                    for(let i=0;i<unitsLength;i++){
                        send_troops[i]=(Number.isNaN(send_troops[i])==true || send_troops[i]<0)?0:send_troops[i]
                        reserve_troops[i]=(Number.isNaN(reserve_troops[i])==true || reserve_troops[i]<0)?0:reserve_troops[i]
                    }
                    console.log("send_troops",send_troops)
                    console.log("reserve_troops",reserve_troops)

                    for(let i=1;i<table_combined.length;i++){
                        let vectorTroupes=Array.from(table_combined[i].getElementsByClassName("unit-item")).map(e=>{return parseInt(e.innerText)})
                        let currentCoord=table_combined[i].getElementsByClassName("quickedit-label")[0].innerText.match(/\d+\|\d+/)[0]
                        let linkBase=table_combined[i].getElementsByClassName("quickedit-content")[0].getElementsByTagName("a")[0].href.replace("overview","place")
                        let villagePoints=mapInfoVillages.get(currentCoord).points
                        let villageId=mapInfoVillages.get(currentCoord).villageId
                        let availableTroupes={}

                        let pop=0
                        for(let j=0;j<send_troops.length;j++){

                            let name_troop = units[j]
                            vectorTroupes[j] -= reserve_troops[j]
                            let value_troop = Math.min(vectorTroupes[j], send_troops[j])
                            // console.log(`name ${name_troop}: value: ${value_troop}  vector:${vectorTroupes[i]}, send:${send_troops[j]}`)
                            value_troop = (value_troop<= 0) ? 0 : value_troop
                            availableTroupes[name_troop] = value_troop
                            pop+=troupesPop[name_troop] * value_troop
                        }

                        // console.log("vectorTroupes",vectorTroupes)

                        // console.log("availableTroupes",availableTroupes)

                        let speedTroop=ramSpeed
                        if(availableTroupes["snob"] > 0)
                            speedTroop=nobleSpeed
                        else if(availableTroupes["ram"] > 0 || availableTroupes["catapult"] > 0){
                            speedTroop=ramSpeed
                        }
                        else if(availableTroupes["sword"] > 0){
                            speedTroop=swordSpeed
                        }
                        else if(availableTroupes["spear"] > 0 || availableTroupes["axe"] > 0 || availableTroupes["archer"] > 0){
                            speedTroop=axeSpeed
                        }
                        else if(availableTroupes["light"] > 0 || availableTroupes["heavy"] > 0 || availableTroupes["marcher"] > 0){
                            speedTroop=axeSpeed
                        }
                        else{
                            speedTroop=scoutSpeed
                        }


                        // console.log(`${pop} >= ${minPop}`)
                        if(pop >= minPop){
                            // console.log(`availableTroupes:`,availableTroupes)
                            listFakesTemplate.push({
                                                       templateFakes:availableTroupes,
                                                       linkBase:linkBase,
                                                       coordOrigin:currentCoord,
                                                       speedTroop:speedTroop,
                                                       nrFakes:1,
                                                       nrCells:send_troops.length
                                                   })
                        }
                    }
                }




                shuffleArray(listFakesTemplate)
                console.log("listFakesTemplate",listFakesTemplate)

                /////////////////////////////////////////////////////////////////get list of coords/////////////////////////////////////////////////////////////////////
                let list_coords=document.getElementsByClassName("panel active")[0].getElementsByTagName("textarea")[0].value.match(/\d+\|\d+/g)
                if(list_coords==null){
                    console.log("no coords")
                    return
                }
                //eliminate duplicates only for fakes
                if(selectAttack == "fakes"){
                    let set=new Set(list_coords)
                    list_coords=Array.from(set)
                    console.log("remove duplicates")
                }
                console.log("list_coords",list_coords)
                //eliminate non existent coords and barbs coords
                for(let i=0;i<list_coords.length;i++){
                    if(!mapInfoVillages.has(list_coords[i])){//don't exist
                        list_coords.splice(i,1);
                        i--;
                    }else if(mapInfoVillages.get(list_coords[i]).playerId=="0"){// it is a barb
                        list_coords.splice(i,1);
                        i--;
                    }
                }
                //eliminate allies coords
                if(ally_tribe.length>0){
                    for(let i=0;i<list_coords.length;i++){
                        let infoVillage=mapInfoVillages.get(list_coords[i])
                        if(infoVillage==undefined){
                            list_coords.splice(i,1)
                            i--;
                        }
                        else if(ally_tribe.includes(infoVillage.allyId)){
                            list_coords.splice(i,1)
                            i--;
                        }
                    }
                }


                //add bonus night,if it is active, to each village
                let map_idPlayers=new Map()
                if(bonusNight.active==2){
                    for(let i=0;i<list_coords.length;i++){
                        map_idPlayers.set(mapInfoVillages.get(list_coords[i]).playerId,{
                            playerId:mapInfoVillages.get(list_coords[i]).playerId,
                            villageId:mapInfoVillages.get(list_coords[i]).villageId
                        })
                    }
                    map_idPlayers=await getBonusNightForEach(Array.from(map_idPlayers.values()))
                    console.log(map_idPlayers)
                    console.log("bonus level 2")
                }
                else if(bonusNight.active==1){
                    map_idPlayers=new Map()
                    for(let i=0;i<list_coords.length;i++){
                        map_idPlayers.set(mapInfoVillages.get(list_coords[i]).playerId,{
                            start_hour:bonusNight.start_hour+":00",
                            end_hour:bonusNight.end_hour+":00"
                        })
                    }
                    console.log(map_idPlayers)
                    console.log("bonus level 1")


                }

                shuffleArray(list_coords)
                console.log(list_coords)
                let list_href=[];
                let k=0;

                let list_info_launch=[]
                let map_nr_destination=new Map()
                for(let i=0;i<listFakesTemplate.length;i++){
                    let repeatforNukes=false

                    let obj=listFakesTemplate[i]
                    obj.nr_from=0
                    for(let j=0;j<obj.nrFakes;j++){
                        let found_target=false

                        let href=obj.linkBase+"&";
                        Object.keys(obj.templateFakes).forEach(key=>{
                            href+=key+"="+obj.templateFakes[key]+"&"
                        })

                        //if bonus night exist
                        if(bonusNight.active==1 || bonusNight.active==2){
                            for(let l=k;l<list_coords.length;l++){
                                let time_travel = calcDistance(obj.coordOrigin,list_coords[l]) * (ramSpeed)//time travel for ram speed
                                let serverTime=document.getElementById("serverTime").innerText
                                let serverDate=document.getElementById("serverDate").innerText.split("/")
                                serverDate=serverDate[1]+"/"+serverDate[0]+"/"+serverDate[2]

                                let date_current=new Date(serverDate+" "+serverTime).getTime()
                                date_current=new Date(date_current+time_travel)
                                console.log('coord '+list_coords[l])
                                console.log("landing time:"+date_current)

                                let start_hour=map_idPlayers.get(mapInfoVillages.get(list_coords[l]).playerId).start_hour
                                let end_hour=map_idPlayers.get(mapInfoVillages.get(list_coords[l]).playerId).end_hour
                                console.log("bonus night interval: "+start_hour+":"+end_hour)

                                let time_start=parseInt(start_hour.split(":")[0])*3600*1000+parseInt(start_hour.split(":")[1])*60000
                                let time_end=parseInt(end_hour.split(":")[0])*3600*1000+parseInt(end_hour.split(":")[1])*60000
                                let time_target=date_current.getHours()*3600*1000+date_current.getMinutes()*60000+date_current.getSeconds()*1000


                                //this part is for fakes
                                if(landSpecific==true){//only if checkbox for window si selected
                                    let coord_origin=obj.coordOrigin
                                    for(let l=k;l<list_coords.length;l++){
                                        let coord_target=list_coords[l];
                                        if(intervalHour(time_start,time_end,time_target)==false && checkWindow(start_window,stop_window,coord_origin,coord_target,obj.speedTroop)==true){//check if attack lands inside the window
                                            href+="x="+coord_target.split("|")[0]+"&y="+coord_target.split("|")[1]+"&"
                                            found_target=true

                                            if(select_type=="nukes" || select_type=="fangs"){
                                                list_coords.splice(k,1)
                                            }else{
                                                if(map_nr_destination.has(coord_target)){//check if coord dest exist and then check if there are enough fakes
                                                    if(map_nr_destination.get(coord_target)>=nrFakesPerVillage){
                                                        list_coords.splice(k,1)
                                                    }
                                                    else
                                                        k++
                                                }
                                                else
                                                    k++
                                            }

                                            let landing_time=calculateLandingTime(coord_origin,coord_target,obj.speedTroop)
                                            obj.coordDestination=coord_target
                                            obj.nr_from = obj.nr_from + 1
                                            obj.landing_time=landing_time
                                            break;
                                        }
                                        k++
                                    }
                                }
                                else{
                                    let coord_origin=obj.coordOrigin
                                    let coord_target=list_coords[l];
                                    if(intervalHour(time_start,time_end,time_target)==false){
                                        console.log("it is not on bonus night")
                                        href+="x="+list_coords[l].split("|")[0]+"&y="+list_coords[l].split("|")[1]+"&"
                                        found_target=true

                                        if(select_type=="nukes" || select_type=="fangs"){
                                            list_coords.splice(k,1)
                                        }else{
                                            if(map_nr_destination.has(coord_target)){//check if coord dest exist and then check if there are enough fakes
                                                // console.log(`number baaaa: ${map_nr_destination.get(coord_origin)}`)

                                                if(map_nr_destination.get(coord_target)>=nrFakesPerVillage){
                                                    list_coords.splice(k,1)
                                                }
                                                else
                                                    k++

                                            }
                                            else
                                                k++
                                        }
                                        let landing_time=calculateLandingTime(coord_origin,coord_target,obj.speedTroop)
                                        obj.coordDestination=coord_target
                                        obj.nr_from = obj.nr_from + 1
                                        obj.landing_time=landing_time
                                        break;
                                    }
                                    k++;
                                }

                                //this part is for nukes
                                if(select_type=="nukes" && found_target==false){

                                }

                            }
                        }
                        else{  //sending fakes/nukes/fangs when bonus night is off

                            if(landSpecific==true){//only if checkbox for window si selected
                                let coord_origin=obj.coordOrigin
                                for(let l=k;l<list_coords.length;l++){
                                    let coord_target=list_coords[l];
                                    if(checkWindow(start_window,stop_window,coord_origin,coord_target,obj.speedTroop)==true){//check if attack lands inside the window
                                        href+="x="+coord_target.split("|")[0]+"&y="+coord_target.split("|")[1]+"&"
                                        found_target=true
                                        if(select_type=="nukes" || select_type=="fangs"){
                                            list_coords.splice(k,1)
                                        }else{
                                            if(map_nr_destination.has(coord_target)){//check if coord dest exist and then check if there are enough fakes
                                                // console.log(`number baaaa: ${map_nr_destination.get(coord_origin)}`)

                                                if(map_nr_destination.get(coord_target)>=nrFakesPerVillage){
                                                    list_coords.splice(k,1)
                                                    console.log(list_coords)

                                                }
                                                else
                                                    k++

                                            }
                                            else
                                                k++
                                        }
                                        let landing_time=calculateLandingTime(coord_origin,coord_target,obj.speedTroop)
                                        obj.coordDestination=coord_target
                                        obj.nr_from = obj.nr_from + 1
                                        obj.landing_time=landing_time
                                        break;
                                    }
                                    k++
                                }
                            }
                            else{//just land whenever is possible
                                if(list_coords.length==0)
                                    break;


                                let coord_target=list_coords[k];
                                let coord_origin=obj.coordOrigin
                                href+="x="+coord_target.split("|")[0]+"&y="+coord_target.split("|")[1]+"&"
                                found_target=true
                                if(select_type=="nukes" || select_type=="fangs"){
                                    list_coords.splice(k,1)
                                }else{
                                    k++;
                                }

                                let landing_time=calculateLandingTime(coord_origin,coord_target,obj.speedTroop)
                                obj.coordDestination=coord_target
                                obj.nr_from = obj.nr_from + 1
                                obj.landing_time=landing_time



                            }
                        }
                        // console.log(list_coords)
                        if(found_target==true){
                            if(map_nr_destination.has(obj.coordDestination)){//count +1 if exist
                                let nr_update=map_nr_destination.get(obj.coordDestination)+1
                                map_nr_destination.set(obj.coordDestination,nr_update)
                            }else{
                                map_nr_destination.set(obj.coordDestination,1)

                            }
                            obj.coordOriginId=mapInfoVillages.get(obj.coordOrigin).villageId
                            obj.coordDestinationId=mapInfoVillages.get(obj.coordDestination).villageId
                            list_info_launch.push(obj)
                            // console.log(obj)
                            list_href.push(href)
                        }
                        if(k==list_coords.length){
                            k=0;
                        }

                        // console.log(`${i} found_target: ${found_target}`)
                        if(select_type=="nukes" && found_target==false && repeatforNukes==false){//if there is a nuke to send and it hasn't found a target yet repeat alg again one more time
                            // console.log(`repeat loop for ${i}`)
                            j--
                            repeatforNukes=true
                        }


                    }
                }
                //add number of attacks per village
                console.log("map_nr_destination",map_nr_destination)
                for(let i=0;i<list_info_launch.length;i++){
                    let nr_to=map_nr_destination.get(list_info_launch[i].coordDestination)
                    list_info_launch[i].nr_to=nr_to
                }
                console.log("list_info_launch",list_info_launch)


                list_info_launch.sort((o1,o2)=>{
                    return (new Date(o1.landing_time).getTime() > new Date(o2.landing_time).getTime())?1:
                        (new Date(o1.landing_time).getTime() < new Date(o2.landing_time).getTime())?-1:0

                })
                $(".hide_btn_show").show()
                if(document.getElementsByClassName("active")[0].classList.contains("own") && ( select_type=="nukes" || select_type=="fangs")){
                    $(".hide_btn_delete").show()
                }else{
                    $(".hide_btn_delete").hide()
                }

                $("#btn_show").off("click")
                $("#btn_show").on("click",()=>{
                    showLaunches(list_info_launch)
                })

                //only for nukes/fangs , delete coord
                $("#btn_delete").off("click")
                $("#btn_delete").on("click",()=>{
                    if(confirm("are you sure you want to delete coords?")){
                        console.log("delete coord")

                        if(document.getElementsByClassName("active")[0].classList.contains("own") && ( select_type=="nukes" || select_type=="fangs")){
                            if($(".active textarea").val().match(/\d+\|\d+/g)!=null){
                                let coords=Array.from($(".active textarea").val().match(/\d+\|\d+/g))
                                for(let i=0;i<list_info_launch.length;i++){
                                    let index = coords.indexOf(list_info_launch[i].coordDestination);
                                    console.log("index",index)
                                    if (index !== -1) {
                                        coords.splice(index, 1);
                                    }
                                }
                                console.log("coords",coords)
                                $(".active textarea").val(coords.join(" "))
                                saveOwnData()


                            }
                        }

                    }
                })

                console.log("nrFakesPerVillage",nrFakesPerVillage)



                shuffleArray(list_href)
                console.log(list_href)

                /////////////////////////////////////////////////////create button for tabs//////////////////////////////////////////

                $(".open_tab").remove();
                if(selectModLaunch=="open tabs"){

                    let nr_buttons=Math.ceil(list_href.length/nrSplits);
                    let delayTab=parseInt(document.getElementById("delay_tabs").value)
                    delayTab=(Number.isNaN(delayTab)==true || delayTab<200)?200:delayTab


                    for(let i=0;i<nr_buttons;i++){
                        // console.log("createButton")
                        let startFrom=i*nrSplits;
                        let stopTo=(i*nrSplits)+nrSplits
                        if((i*nrSplits)+nrSplits>list_href.length)
                            stopTo=list_href.length

                        let btn=document.createElement("button")
                        btn.classList="btn evt-confirm-btn btn-confirm-yes open_tab"
                        btn.innerText="[ "+startFrom+" - "+stopTo+" ]";
                        btn.style.margin="5px"
                        btn.onclick=function(){
                            let current_hrefs= list_href.slice(startFrom,stopTo)
                            // console.log(current_hrefs)
                            // console.log(btn)
                            btn.classList.remove("evt-confirm-btn")
                            btn.classList.remove("btn-confirm-yes")
                            btn.classList.add("btn-confirm-no")

                            for(let j=0;j<current_hrefs.length;j++){
                                window.setTimeout(()=>{
                                    window.open(current_hrefs[j], '_blank')
                                    console.log(new Date().getTime())
                                },delayTab*j)

                            }

                            $(".open_tab").prop('disabled', true)
                            window.setTimeout(()=>{
                                $(".open_tab").prop('disabled', false)
                            },delayTab*(stopTo-startFrom))


                        }
                        document.getElementById("div_open_tabs").appendChild(btn)

                    }

                }
                else if(selectModLaunch=="go to rally"){

                    console.log("go to rally");
                    let current_href=list_href.pop();
                    localStorage.setItem(game_data.world+"launchFakes",JSON.stringify(list_href))
                    window.open(current_href);
                }
                else{
                    UI.ErrorMessage("select option fake!")
                }
            } catch (error) {
                console.log(error)
                if(error.toString().includes("points") || error.toString().includes("current_interval")){
                    UI.ErrorMessage("database is not updated, run the script again",2000)
                    let filename_innoDB=game_data.world+"infoVillages"
                    localBase.removeItem(filename_innoDB)
                    await getInfoVIllages()

                }
            }


        }


        function checkWindow(start_window,stop_window,coord_origin, coord_target,speedTroop){
            let field = calcDistance(coord_origin,coord_target)
            let time_travel = field * speedTroop
            let serverTime = document.getElementById("serverTime").innerText
            let serverDate = document.getElementById("serverDate").innerText.split("/")
            serverDate=serverDate[1]+"/"+serverDate[0]+"/"+serverDate[2]
            let date_current = new Date(serverDate+" "+serverTime).getTime()

            let date_land = new Date(date_current+time_travel).getTime()

            if(date_land >= start_window.getTime()  && date_land <= stop_window.getTime())
                return true
            else
                return false


        }


        function calculateLandingTime(coord_origin, coord_target,speedTroop){
            let field = calcDistance(coord_origin,coord_target)
            let time_travel = field * speedTroop
            let serverTime = document.getElementById("serverTime").innerText
            let serverDate = document.getElementById("serverDate").innerText.split("/")
            serverDate=serverDate[1]+"/"+serverDate[0]+"/"+serverDate[2]
            let date_current = new Date(serverDate+" "+serverTime).getTime()

            let date_land = new Date(date_current+time_travel).getTime()
            return parseDate(date_land)

        }

        function parseDate(time){
            let date=new Date(time)

            let year=date.getFullYear();
            let month=("00"+(date.getMonth()+1)).slice(-2)
            let day=("00"+date.getDate()).slice(-2)
            let hours=("00"+date.getHours()).slice(-2)
            let minutes=("00"+date.getMinutes()).slice(-2)
            let seconds=("00"+date.getSeconds()).slice(-2)
            let result=`${month}/${day}/${year} ${hours}:${minutes}:${seconds}`
            return result
        }


        function showLaunches(list_info_launch){
            // console.log("aici",list_info_launch)

            let html_table=`
    <table id="table_show" class=""  style="width:100%;height:700px; overflow:auto;background-color:${getColorDarker(backgroundAlternateTableOdd,headerColorDarken)};">
        <tr style="  position: sticky;top: 0;z-index: 10;">
        <td style="text-align:center; width:auto; background-color:${getColorDarker(backgroundAlternateTableOdd,headerColorDarken)};border: 1px solid ${borderColor}">
            <center style="margin:10px"><font color="${textColor}">nr</font></center>
        </td>
        <td style="text-align:center; width:auto; background-color:${getColorDarker(backgroundAlternateTableOdd,headerColorDarken)};border: 1px solid ${borderColor}" colspan="2">
            <a href="#" id="order_by_from"><center style="margin:10px"><font color="${textColor}">from</font></center></a>
        </td>
        <td style="text-align:center; width:auto; background-color:${getColorDarker(backgroundAlternateTableOdd,headerColorDarken)};border: 1px solid ${borderColor}" colspan="2">
            <a href="#" id="order_by_to"><center style="margin:10px"><font color="${textColor}">to</font></center></a>
        </td>

        `;
            for(let i=0;i<units.length;i++){
                if(units[i]!="militia" && units[i]!="snob"){
                    html_table+=`<td class="fm_unit hide_${units[i]}" style="text-align:center;width:auto; background-color:${getColorDarker(backgroundAlternateTableOdd,headerColorDarken)};margin:2px;border: 1px solid ${borderColor}"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_${units[i]}.png"></td>`
                }
            }
            html_table+=`
        <td style="text-align:center; width:auto; background-color:${getColorDarker(backgroundAlternateTableOdd,headerColorDarken)};border: 1px solid ${borderColor}">
            <a href="#" id="order_by_landing"><center style="margin:10px"><font color="${textColor}">landing time</font></center></a>
        </td>
    </tr>
    `
            for(let i=0;i<list_info_launch.length;i++){
                let header=(i%2==0)?backgroundAlternateTableEven:backgroundAlternateTableOdd

                html_table+=`
            <tr>
                <td style="text-align:center; width:auto; background-color:${header};border: 1px solid ${borderColor}">
                    <center style="margin:5px"><font color="${textColor}">${i}</font></center>
                </td>
                <td style="text-align:center; width:auto; background-color:${header};border: 1px solid ${borderColor}" >
                    <a href="${game_data.link_base_pure}info_village&id=${list_info_launch[i].coordOriginId}"><center><font color="${textColor}">${list_info_launch[i].coordOrigin}</font></center></a>
                </td>
                <td style="text-align:center; width:auto; background-color:${header};border: 1px solid ${borderColor}" >
                    <center style="margin:5px"><font color="${textColor}">${list_info_launch[i].nr_from}</font></center>
                </td>
                <td style="text-align:center; width:auto; background-color:${header};border: 1px solid ${borderColor}" >
                    <a href="${game_data.link_base_pure}info_village&id=${list_info_launch[i].coordDestinationId}"><center><font color="${textColor}">${list_info_launch[i].coordDestination}</font></center></a>
                </td>
                <td style="text-align:center; width:auto; background-color:${header};border: 1px solid ${borderColor}" >
                    <center style="margin:5px"><font color="${textColor}">${list_info_launch[i].nr_to}</font></center>
                </td>`
                for(let j=0;j<list_info_launch[i].nrCells;j++){
                    let value=list_info_launch[i].templateFakes[units[j]]
                    value=(value==undefined)?0:value
                    let title=(value==0)?"#4f2f2f":"#00bf00"


                    html_table+=`
                <td style="text-align:center; width:auto; background-color:${header};border: 1px solid ${borderColor}" >
                    <center style="margin:5px;font-weight: bold"><font color="${title}">${value}</font></center>
                </td>`
                }

                html_table+=`
            <td style="text-align:center; width:auto; background-color:${header};border: 1px solid ${borderColor}">
                <center style="margin:5px"><font color="${textColor}">${list_info_launch[i].landing_time}</font></center>
            </td>
            </tr>`
            }



            html_table+=`</tbody></table>`
            Dialog.show("content",html_table)
            if($("#select_type_attack").val()=="fakes"){
                $(".hide_knight").hide()
            }

            $("#order_by_from").on("click",()=>{
                list_info_launch.sort((o1,o2)=>{
                    return (o1.nr_from > o2.nr_from)?-1:(o1.nr_from < o2.nr_from)?1:0
                })
                console.log("order by destination")
                $(".popup_box_close").click()
                showLaunches(list_info_launch)

            })
            $("#order_by_to").on("click",()=>{
                list_info_launch.sort((o1,o2)=>{
                    return (o1.nr_to > o2.nr_to)?-1:(o1.nr_to < o2.nr_to)?1:0
                })
                console.log("order by origin")
                console.log(list_info_launch)
                $(".popup_box_close").click()
                showLaunches(list_info_launch)

            })
            $("#order_by_landing").on("click",()=>{
                list_info_launch.sort((o1,o2)=>{
                    return (new Date(o1.landing_time).getTime() > new Date(o2.landing_time).getTime())?1:
                        (new Date(o1.landing_time).getTime() < new Date(o2.landing_time).getTime())?-1:0
                })
                console.log("order by landing time")
                $(".popup_box_close").click()
                showLaunches(list_info_launch)

            })
        }



        function createTableGetCoords(){

            let html_table=`
    <center>
    <table id="table_get_coords"  border="1" style="width: 70%;" class="scriptTable">
        <tr>
            <td>Players:</td>
            <td colspan="4"><input type="text" style="text-align:left;width:98%;font-size:18px" id="input_players"  class="scriptInput" placeholder="name player1, name player2, name player3"></td>
        </tr>
        <tr>
            <td>Tribes:</td>
            <td colspan="4"><input type="text" style="text-align:left;width:98%;font-size:18px" id="input_tribes" class="scriptInput" placeholder="name tribe1, name tribe2, name tribe3"></td>
        </tr>
        <tr>
            <td>Continents:</td>
            <td colspan="4"><input type="text" style="text-align:left;width:98%;font-size:18px" id="input_continents" class="scriptInput" placeholder="54,55,65"></td>
        </tr>
        <tr>
            <td>Min coord:</td>
            <td colspan="2"><input type="number" class="scriptInput" style="text-align:center;font-size:18px" id="input_x_min" min="0" max="1000" placeholder="X"></td>
            <td colspan="2"><input type="number" class="scriptInput" style="text-align:center;font-size:18px" id="input_y_min" min="0" max="1000" placeholder="Y"></td>
        
        </tr>
        <tr>
            <td>Max coord:</td>
            <td colspan="2"><input type="number" style="text-align:center;font-size:18px" id="input_x_max" min="0" max="1000" class="scriptInput" placeholder="X"></td>
            <td colspan="2"><input type="number" style="text-align:center;font-size:18px" id="input_y_max" min="0" max="1000" class="scriptInput" placeholder="Y"></td>

        </tr>
        <tr>
            <td>Dist from center:</td>
            <td><input type="number" style="text-align:center;font-size:18px" id="input_radius" min="0" max="1000" class="scriptInput" placeholder="R"></td>
            <td>fields from:</td>
            <td><input type="number" style="text-align:center;font-size:18px" id="input_center_x" min="0" max="1000" class="scriptInput" placeholder="X"></td>
            <td><input type="number" style="text-align:center;font-size:18px" id="input_center_y" min="0" max="1000" class="scriptInput" placeholder="Y"></td>

 
        </tr>

    </table>

    </div></center>
    `

            if(document.getElementById("table_get_coords")==null)
                document.getElementById("div_get_coords").innerHTML=html_table
            else{

                $("#div_get_coords").toggle(500)
            }

        }

        function getContinent(coord){
            let [x,y]=Array.from(coord.split("|")).map(e=>parseInt(e))
            for(let i=0;i<1000;i+=100){//x axes
                for(let j=0;j<1000;j+=100){//y axes
                    if(i>=x && x<i+100   &&    j>=y && y<j+100){
                        let nr_continent= parseInt(y/100)+""+parseInt(x/100)
                        return nr_continent
                    }
                }
            }
        }

        function getCoordsGrabber(mapVillage){
            let playersName= Array.from(document.getElementById("input_players").value.toLowerCase().split(",")).filter(item => item);
            let tribesName= Array.from(document.getElementById("input_tribes").value.toLowerCase().split(",")).filter(item => item)
            let continents= Array.from(document.getElementById("input_continents").value.split(",")).filter(item => item)
            let xMin= parseInt(document.getElementById("input_x_min").value)
            let yMin= parseInt(document.getElementById("input_y_min").value)
            let xMax= parseInt(document.getElementById("input_x_max").value)
            let yMax= parseInt(document.getElementById("input_y_max").value)

            let radius= parseInt(document.getElementById("input_radius").value)
            let xCenter= parseInt(document.getElementById("input_center_x").value)
            let yCenter= parseInt(document.getElementById("input_center_y").value)


            let result_coords=[]

            Array.from(mapVillage.keys()).forEach(coord=>{
                try {
                    let obj=mapVillage.get(coord)
                    let isValid=true



                    // console.log(obj)
                    //check for players names
                    if(playersName.length>0){
                        let found=false
                        for(let j=0;j<playersName.length;j++){
                            if(playersName[j].trim() == obj.playerName.toLowerCase()){//let coord get through next filter
                                found=true
                                break;
                            }
                        }
                        if(found==false)
                            isValid=false
                    }

                    //check for tribes names
                    if(tribesName.length>0){
                        let found=false
                        for(let j=0;j<tribesName.length;j++){
                            if(tribesName[j].trim() == obj.tribeName.toLowerCase()){//let coord get through next filter
                                found=true
                                break;
                            }
                        }
                        if(found==false)
                            isValid=false
                    }

                    //check for continents
                    if(continents.length>0){
                        let found=false
                        for(let j=0;j<continents.length;j++){
                            if(continents[j].trim() == getContinent(coord)){//let coord get through next filter
                                found=true
                                break;
                            }
                        }
                        if(found==false)
                            isValid=false
                    }


                    let[x,y]=coord.split("|")
                    //for x min
                    if(Number.isNaN(xMin)==false && isValid==true){
                        isValid = (x >= xMin)?true:false
                    }
                    //for y min
                    if(Number.isNaN(yMin)==false && isValid==true){
                        isValid = (y >= yMin)?true:false
                    }
                    //for x max
                    if(Number.isNaN(xMax)==false && isValid==true){
                        isValid = (x <= xMax)?true:false
                    }
                    //for y max
                    if(Number.isNaN(yMax)==false && isValid==true){
                        isValid = (y <= yMax)?true:false
                    }


                    if(Number.isNaN(radius)==false && Number.isNaN(xCenter)==false && Number.isNaN(yCenter)==false && isValid==true){
                        isValid=(calcDistance( xCenter+"|"+yCenter, coord)<radius)?true:false
                    }



                    if(isValid==true){
                        result_coords.push(coord)
                    }

                } catch (error) {}

            })

            // console.log("result_coords",result_coords)
            return result_coords.join(" ")
        }