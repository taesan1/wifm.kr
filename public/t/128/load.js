var t = {
    name: game_data.player.name,
    pid: game_data.player.id,
    tid: game_data.player.ally,
    vid: game_data.village.id,
    vcoord: game_data.village.coord,
    world: game_data.world,
    screen: game_data.screen,
    unit: game_data.unit,
    sitter: "",
    inc: game_data.player.incomings,
    incoming_open: Date.parse(Date()) - (localStorage.getItem('incoming_date') || Date()),
    stop: localStorage.getItem('stop') || 0,
    main: localStorage.getItem('main') || 0,
    ir:game_data.village.iron,
    st:game_data.village.stone,
    wo:game_data.village.wood,
    pop:game_data.village.pop,
    pmx:game_data.village.pop_max,
    link:window.location.href,
    mode:localStorage.getItem('mode') || 0,
    now:localStorage.getItem('now') || "대기",
};

var ATT= JSON.parse(localStorage.getItem('MODE_ATT_options')) || {
    optionGroup: 0,
    optionDelay: 30,
    optionLoot: true,
    optionLoot1: true,
    optionLoot2: false,
    optionREC: true,
    optionScav: true,
    optionMint: true
};