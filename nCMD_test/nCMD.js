var origintext;
var convertedtext;
var otc  = 0;   //変換する文字のカーソル現在位置(n文字目)
var stdc = new Array(); 
var etdc = new Array(); 
var etrc = new Array(); 
var brc  = new Array(); 
var tagl = new Array("B","I","U","S","#1","#2","#3","#4","#5","#6");  //タグ辞書 "#","##","###","####","#####","######",
var tagt = new Array("B","I","U","S","H1","H2","H3","H4","H5","H6");
var tags = new Array(); //使用中のタグ置き場
var tagsn= new Array(); //タグ置き場の複数とか？

function preview() {    //プレビュー用テスト
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
    otc = 0;
    while (otc < origintext.length) {   //メインループ
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
    
    convertedtext += initHTML(9);
    
    //出力
    output(convertedtext);
}

function tagmake (num) {//開始タグ生成機構
    if (stdc.length <= num) {
        return "";
    }
    let vt  = origintext.slice(stdc[num]+1, etdc[num]); //開始タグ内抜き出し
    let svt = vt.split(',');    //それをカンマ区切りで配列化
    let outv = "";
    
    //alert(svt);
    for (let j = 0; j < svt.length; j++) {  //タグ数回繰り返し
        for (let k = 0; k < tagl.length; k++) { //タグ種類回繰り返し
            if (svt[j].indexOf(tagl[k]) != -1) {    //そのタグが含まれる場合
                tags.push(tagt[k]); 
                outv += `<${tagt[k]}>`;
            }
        }
    }
    tagsn.push(svt.length);
    otc = etdc[num];
    return outv;
}

function tagend() {
    let num = tagsn.pop();
    let outv = "";
    for (let i = 0; i < num; i++) {
        outv += `</${tags.pop()}>`;
    }
    return outv;
}

function initHTML(num) {
    if (num == 0) {
        return '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<link rel="stylesheet" href="nCMD.css" type="text/css">\n\t\t<title>\n\t\t\tMade by nCMD\n\t\t</title>\n\t</head>\n\t<body>\n\t\t';
    }
    if (num == 9) {
        return '\n\t</body>\n</html>';
    }
    //めっちゃ汚いコードですまんの
}

function output(text) {
    document.getElementById("previewtext").textContent = text;
}