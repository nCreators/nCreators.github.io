var origintext; //入力エリアのを入れとく変数(原文)
var convertedtext;  //上のを変換したものを入れとく変数
var otc  = 0;   //変換する文字のカーソル現在位置(n文字目)
var stdc = new Array(); //タグ定義開始コマンドの位置を入れとく配列
var etdc = new Array(); //タグ定義終了コマンド
var etrc = new Array(); //タグ範囲終了コマンド
var brc  = new Array(); //改行コマンド
var tagl = new Array("B","I","U","S","#1","#2","#3","#4","#5","#6");    //タグ辞書 "#","##","###","####","#####","######",
var tagt = new Array("B","I","U","S","H1","H2","H3","H4","H5","H6");    //タグ辞書に対応するHTMLタグ
var tags = new Array(); //範囲設定中のタグ置き場
var tagsn= new Array(); //範囲設定中のタグの数

function preview() {    //プレビュー用テスト デバッグ用
    var mainarea = document.getElementById("mainarea").value
    document.getElementById("previewtext").textContent = mainarea
}

function clearmainarea() {  //入力エリアをクリア
    document.getElementById("mainarea").value = ""
}

function convert() {    //変換機構
    var i = 0;
    stdc = []; etdc = []; etrc = []; brc = [];
    stdcc = 0; etrcc = 0;
    //ここまで初期化
    origintext = document.getElementById("mainarea").value;
    convertedtext = "";
    origintext = origintext.replace(/'\n'/g, '<br>\n');
    
    //コマンド抽出
    while (origintext.indexOf('[', i) >= 0) {
        i = origintext.indexOf('[', i);
        stdc.push(i);
        i++;
    }
    i = 0;
    while (origintext.indexOf(':', i) >= 0) {
        i = origintext.indexOf(':', i);
        etdc.push(i);
        i++;
    }
    i = 0;
    while (origintext.indexOf(']', i) >= 0) {
        i = origintext.indexOf(']', i);
        etrc.push(i);
        i++;
    }
    i = 0;
    while (origintext.indexOf('\n', i) >= 0) {
        i = origintext.indexOf('\n', i);
        brc.push(i);
        i++;
    }
    i = 0;
    //コマンド変換・HTML生成
    convertedtext = initHTML(0);
    
    //convertedtext += origintext.slice(0, stdc[0]);
    otc = 0;    //何文字目か
    while (otc < origintext.length) {   //メインループ 原文を一文字ずつチェックする
        if (stdc.includes(otc)) {
            convertedtext += tagmake(stdc.indexOf(otc));    //開始タグ生成
        }   else if (etrc.includes(otc)) {
            convertedtext += tagend();  //終了タグ生成
        }   else if (brc.includes(otc)) {
            convertedtext += "<br>\n";  //改行
        }   else {
            convertedtext += origintext[otc];   //通常文生成
        }
        otc++;
    }
    // xxxx.includes(otc) -> xxxxにはそれぞれのコマンドがn文字目に含まれてるという情報が入っている -> otc文字目にそれぞれのコマンドが含まれているかどうかをチェックしている。
    
    convertedtext += initHTML(9);
    
    //出力
    output(convertedtext);
}

function tagmake (num) {    //タグ定義開始コマンド処理(タグ生成)機構
    if (stdc.length <= num) {   //numには"stdcの何番目にotcがあるか -> 原文のotc文字目にあるタグ定義開始コマンドは何番目のものなのか"という意味がある -> 
        return "";  //正直このifブロック何のために作ったかわからん()
    }
    let vt  = origintext.slice(stdc[num]+1, etdc[num]); //開始コマンド内を抜き出し [h1:] -> h1:
    let svt = vt.split(',');    //それをカンマ区切りで配列化 h1,i,b,...
    let outv = "";
    
    //alert(svt);
    for (let j = 0; j < svt.length; j++) {  //タグ数回繰り返し
        for (let k = 0; k < tagl.length; k++) { //タグ種類回繰り返し
            if (svt[j].indexOf(tagl[k]) != -1) {    //そのタグが含まれる場合
                tags.push(tagt[k]); //範囲設定中のタグ置き場へ
                outv += `<${tagt[k]}>`; //HTMLタグへ
            }
        }
    }
    tagsn.push(svt.length);
    otc = etdc[num];    //otcをタグ定義終了コマンド後まで移動
    return outv;
}

function tagend() { //タグ範囲終了コマンド処理
    let num = tagsn.pop();
    let outv = "";
    for (let i = 0; i < num; i++) {
        outv += `</${tags.pop()}>`;
    }
    return outv;
}

function initHTML(num) {    //変換後文の初期化
    if (num == 0) {
        return '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<link rel="stylesheet" href="nCMD.css" type="text/css">\n\t\t<title>\n\t\t\tMade by nCMD\n\t\t</title>\n\t</head>\n\t<body>\n\t\t';
    }
    if (num == 9) {
        return '\n\t</body>\n</html>';
    }
    //めっちゃ汚いコードですまんの
}

function output(text) { //出力エリアに出力
    document.getElementById("previewtext").textContent = text;
}
