const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// GitHub 토큰과 API URL 설정
const GITHUB_TOKEN = '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';
const GITHUB_API_URL = 'https://api.github.com/repos/taesan1/wifme/contents/public/tw/data/data.json';

app.use(bodyParser.urlencoded({ extended: true }));

// POST 요청 처리
app.post('/submit', async (req, res) => {
    const { op, t, landa, landb } = req.body;

    // GitHub에 저장할 데이터 형식화
    const data = {
        message: "새 파일 생성",
        content: Buffer.from(JSON.stringify({ op, t, landa, landb })).toString('base64')
    };

    // GitHub API를 사용하여 파일 생성
    try {
        const response = await fetch(GITHUB_API_URL, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
            },
            body: JSON.stringify(data)
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        res.send('데이터가 GitHub에 저장되었습니다.');
    } catch (error) {
        console.error('GitHub 파일 생성 중 오류 발생:', error);
        res.send('GitHub 파일 생성 중 오류 발생.');
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행중입니다.`);
});
