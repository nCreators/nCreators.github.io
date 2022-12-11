var cvw = 640; var cvh = 640;//キャンバスの大きさ
var pxw =  10; var pxh =  10;//ゲーム内1pxの大きさ指定
var paw = cvw/pxw; var pah = cvh/pxh; //ゲーム内のpx数算出
var writeF = false; var cdelF = false; var simF = false;
var setcolor = "#000000";
var pxinfo  = new Array(paw*pah);
var pxbuff  = new Array(paw*pah);
var pxprev;
var pxcolor = new Array(); var pxname = new Array();
//各ピクセルの色
pxcolor[0] = "#F5F5F5";//none   whitesmoke
pxcolor[1] = "#000000";//picell black
pxcolor[2] = "#00FF00";;//meal   green
pxcolor[3] = "#0000FF";//water  blue
pxcolor[4] = "#FF0000";//poison red
pxcolor[5] = "#000000";//picell black
pxcolor[6] = "#000000";//picell black
pxcolor[7] = "#000000";//picell black
//各ピクセルの名前
pxname[0] = "delete";   //none   
pxname[1] = "picell"; //picell 
pxname[2] = "meal";   //meal   
pxname[3] = "water";  //water  
pxname[4] = "";//unused 
pxname[5] = ""//picell
pxname[6] = "";//picell
pxname[7] = "";//picell 
//	後で考える

for (let i = 0; i < pxinfo.length; i++) {
	pxinfo[i] = "#F5F5F5";//init array
}

function drawpixel(x, y, c) {
//	alert(0);
	ctx.beginPath();
		ctx.rect(x*10,y*10,9,9);
		ctx.fillStyle = c;
		ctx.fill();
	ctx.closePath();
//	alert(1);
}

function loadpixel() {
	for (let y = 0; y < pah; y++) {
		for (let x = 0; x < paw; x++) {
			drawpixel(x, y, pxinfo[x+y*pah]);
		}
	}
}

function setpixel(i) {
	setcolor = pxcolor[i];
	pxT.innerText = "ピクセル選択:" + pxname[i];
}

function playsim() {
	simF = true;
	pxbaff = Array.from(pxinfo);
	simT.innerText = "シミュレーション:再生中";
}

function stopsim() {
	simF = false;
	simT.innerText = "シミュレーション:一時停止中";
}

function resetsim() {
	simF = false;
	pxinfo = Array.from(pxbaff);
	loadpixel();
	simT.innerText = "シミュレーション";
}

canvas.addEventListener('click', function(e){
	offsetX = e.offsetX; // =>要素左上からのx座標
	offsetY = e.offsetY; // =>要素左上からのy座標
});

ctx.beginPath();
	for (let y = 0; y < pah; y++) {//横線グリッド
		ctx.rect(0, y*10+9, cvw, 1);
		ctx.fillStyle = "#CCCCCC";
		ctx.fill();
//		alert(y);
	}
	for (let x = 0; x < paw; x++) {//縦線グリッド
		ctx.rect(x*10+9, 0, 1, cvh);
		ctx.fillStyle = "#CCCCCC";
		ctx.fill();
//		alert(x);
	}
ctx.closePath();
function mainloop(){
	if (simF){
		console.log(1);
	}
}
setInterval(mainloop, 100);

canvas.addEventListener('mousemove', function(e){
	let xi = e.offsetX/pxw|0;
	let yi = e.offsetY/pxh|0;
	loadpixel();
	if (writeF) {
		pxinfo[xi+yi*pah] = setcolor
//		alert(xi+yi*pah);
	}else{//ここ、elseifじゃないの？って思ったそこのお前、ここがelseとifに分かれている理由を考えてみよう！！
		if　((xi+yi*pah) != pxprev) {
			drawpixel(xi, yi, setcolor);
			pxprev = xi+yi*pah;
		}else{
			loadpixel();
			drawpixel(xi, yi, setcolor);
		}
	}
});

canvas.addEventListener('mousedown', function(e){
	writeF = true;
});

canvas.addEventListener('mouseup', function(e){
	writeF = false;
});