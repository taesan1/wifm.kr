function sup() {
    UI.InfoMessage('회군 체크중 ', 2000);

    var aaContents = []; // aa 요소의 HTML을 저장할 배열

    for (c = 2; c < 9999; c++) {
        var selector = "#units_table tbody tr:nth-child(" + c + ") td:nth-child(2)";
        var d = document.querySelector(selector);

        if (d) {
            var cellText = d.textContent;
            if (/^[123456]$/.test(cellText)) {
                UI.InfoMessage('회군 목록을 나열합니다. ', 3000);
                console.log("찾았다: " + cellText);
                var aa = document.querySelector("#units_table tbody tr:nth-child(" + c + ")");
                aaContents.push(aa.innerHTML);
            } else {
                UI.InfoMessage('6필드 내에 회군할 병력이 없습니다 ', 3000);
                console.log("없다 ");
            }
        }
    }

    var popup = document.createElement("div");
    popup.id = "popup";
    popup.style.position = "fixed";
    popup.style.top = "10vw";
    popup.style.right = "10vw";
    popup.style.zIndex = "150";
    popup.style.width = "50%"; // 너비를 화면 너비의 90%로 설정
    popup.style.height = "50%"; // 높이를 화면 높이의 90%로 설정
    popup.style.padding = "10px";
    popup.style.background = "url('https://dsen.innogamescdn.com/asset/f567efc9/graphic/index/main_bg.jpg') scroll right top repeat"; // 배경 이미지 설정
    popup.style.backgroundColor = "#f7eed3"; // 텍스트 색상 설정
    popup.style.borderWidth = "7px";
    popup.style.border = "1px solid #000000";

// 팝업 드래그 가능하게 설정
    jQuery(popup).draggable();

// 팝업 추가
    document.body.appendChild(popup);

    var popupContent = document.getElementById("popup");
    var units = game_data.units;
    var keys = Object.keys(units);
    var lastKey = keys[keys.length - 1];
    delete units[lastKey];
    console.log(units);
    var unitImages = {
        spear: "unit_spear.png",
        sword: "unit_sword.png",
        axe: "unit_axe.png",
        archer: "unit_archer.png",
        spy: "unit_spy.png",
        light: "unit_light.png",
        marcher: "unit_marcher.png",
        heavy: "unit_heavy.png",
        ram: "unit_ram.png",
        catapult: "unit_catapult.png",
        knight: "unit_knight.png",
        snob: "unit_snob.png"
    };
    var aaContentsHTML = aaContents.map(function(aaContent, index) {
        var backgroundColor = index % 2 === 0 ? "#fff5da" : "#f0e2be";
        return `<tr class="popup-div" style="background-color: ${backgroundColor}">${aaContent}</tr>`;

    }).join('');
    createTableWithUnitsAndContents(units, aaContentsHTML);
    function createTableWithUnitsAndContents(units, aaContentsHTML) {
        var popupContent = document.getElementById("popup");
        var html = '      <div class="popup-title"><h2>1~6필드내에 지원나간 방병</h2><hr></div><div class="popup-content" style="overflow: auto; height: 70%;"><div class="draggable-area"><div class="draggable-content"><table class="popup-table" style="margin: 0; padding: 0; width: 100%;"><tr><th>Village </th><th>distance</th>';
        units.forEach(function(unit) {
            var imageUrl = "https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/" + (unitImages[unit] || "unit_default.png");
            html += `<th style="text-align:center"><img src="${imageUrl}" alt="${unit}" title="${unit}"></th>`;
        });
        html +='<th>Action</th> </tr>'+ aaContentsHTML + '</table></div> </div> </div> <div style="margin-top: 10px;"></div><div class="popup-button"><input name="all" class="btn" type="submit" style="margin-right: 10px;" value="ALL 체크"><input name="submit_units_back" class="btn" type="submit" value="회군"> </div>';
        popupContent.innerHTML = html; // HTML 적용
    }
    var popupCheckboxes = popupContent.querySelectorAll(".village_checkbox");
    popupCheckboxes.forEach(function(popupCheckbox) {
        popupCheckbox.addEventListener("click", function() {
            var value = popupCheckbox.getAttribute("value");
            var realCheckboxes = document.querySelectorAll('input[type="checkbox"][value="' + value + '"]');
            realCheckboxes.forEach(function(realCheckbox) {
                realCheckbox.checked = popupCheckbox.checked;
            });
        });
    });
    // "Withdraw" 버튼 클릭 시 이벤트 처리
    var popupWithdrawButton = popupContent.querySelector('input[name="submit_units_back"]');
    if (popupWithdrawButton) {
        popupWithdrawButton.addEventListener("click", function() {
            var realWithdrawButton = document.querySelector('input[name="submit_units_back"]');
            if (realWithdrawButton) {
                realWithdrawButton.click();
            }
        });
    }
    // "all" 버튼 클릭 시 이벤트 처리
    var popupAllButton = popupContent.querySelector('input[name="all"]');
    if (popupAllButton) {
        popupAllButton.addEventListener("click", function() {
            // 체크박스 상태를 확인하기 위한 변수
            var isAllChecked = true;

            // 먼저 모든 체크박스가 현재 체크되어 있는지 확인
            popupCheckboxes.forEach(function(popupCheckbox) {
                if (!popupCheckbox.checked) {
                    isAllChecked = false;
                }
            });

            // 모든 체크박스가 체크되어 있지 않다면 모두 체크, 아니면 모두 해제
            popupCheckboxes.forEach(function(popupCheckbox) {
                popupCheckbox.checked = !isAllChecked; // 현재 상태의 반대로 설정
                var value = popupCheckbox.getAttribute("value");
                var realCheckboxes = document.querySelectorAll('input[type="checkbox"][value="' + value + '"]');
                realCheckboxes.forEach(function(realCheckbox) {
                    realCheckbox.checked = !isAllChecked; // 실제 체크박스도 같은 상태로 설정
                });
            });
        });
    }



    // 팝업 표시
    popup.style.display = "block";



}

sup();
