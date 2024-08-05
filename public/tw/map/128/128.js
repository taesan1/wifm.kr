async function loadVillages() {
    const response = await fetch('https://br128.tribalwars.com.br/map/village.txt.gz');
    const gzData = await response.arrayBuffer();
    const data = pako.inflate(new Uint8Array(gzData), { to: 'string' });

    // 데이터 파싱
    const villages = data.split("\n").map(line => {
        const [name, x, y] = line.split(" ");
        return { name, x: parseInt(x), y: parseInt(y) };
    });

    drawMap(villages);
}

function drawMap(villages) {
    const canvas = document.getElementById('map');
    const ctx = canvas.getContext('2d');

    // 배경
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 빌리지 그리기
    villages.forEach(village => {
        ctx.fillStyle = "red";
        ctx.fillRect(village.x, village.y, 5, 5); // 빌리지 표시 (5x5 크기)
        ctx.fillText(village.name, village.x + 10, village.y); // 이름 표시
    });
}

// 페이지가 로드될 때 데이터 가져오기
window.onload = loadVillages;
