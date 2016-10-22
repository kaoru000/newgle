var apiUrl = 'https://api.apigw.smt.docomo.ne.jp/dialogue/v1/dialogue?APIKEY=';
var apiKey = '7968654a504f6c6c5355716e424f34504338536e55764346494a787a63396d6d546f6b3863493446744131';
var api = apiUrl + apiKey;
var apiJson = {
    'utt': '', // ←ここに雑話キーワードを入れる。テキスト入力ができるといいかも
    't': ''
}

//キャラクタは、下記のいずれかを指定
//20 : 関西弁キャラ
//30 : 赤ちゃんキャラ
//指定なし : デフォルトキャラ

var testText = "";

// API送受信関数
function callBot(mymsg,mychara) {
    apiJson.utt = mymsg;
    apiJson.t = mychara;
    var botClassName = "";
    var chatMessageClassName = "chatMessage";
    if (mychara == 20) {
        botClassName = "girl";
    } else {
        botClassName = "man";
    }
    $.ajax({
            type: 'post',
            url: api,
            data: JSON.stringify(apiJson),
            contentType: 'application/JSON',
            dataType: 'JSON',
            scriptCharset: 'utf-8'
        })
        .done(function (data) {
            var botMessage = data.utt;
            console.log(botMessage); // ←いろんな雑話が返ってくる
//            console.log(data.yomi); // ←いろんな雑話が返ってくる
//            testText = data.utt.toString();
//            return data.utt.toString();
//            return 1;
        $("#board").append("<li class = \"" + botClassName + " " + chatMessageClassName + "\" >" + botMessage + "</li>");
        $('#msg').text(botMessage);
        })
        .fail(function (data) {
            console.log(data.responseText); // ←エラー時の処理
        })
}

// あとは色んなタイミングで実行
//callBot();
// 例：やっほー => やっほっほー
// ※毎回同じとは限らない。結構いろんな回答が返ってきます

function sendMessage () {
    var curentMessage = $('#msg').val();
    var curentChara = $('#chara').val();
    callBot(curentMessage,curentChara);
    if (curentChara == 20) {
        $('#chara').val('');
    } else {
        $('#chara').val(20);
    }
}

$('#sendButton').on('click', function () {
    console.log("#sendButton");
    sendMessage ();
//    callBot();
//    console.dir(callBot());
    //    var currentBoard = $('#board').val();
//    var returnedMessage = callBot();
//    $("#board").append("<li>" + returnedMessage + "</li>");
    //    $('#board').text(callBot());
});

