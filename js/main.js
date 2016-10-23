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

var previousMessage = ""; //雑談apiが返したテキスト保存用、未使用

var keyPhrases = [];

var testText = "";

var recommendMsg = "こんな記事があるよ。";
var recommendUrl = "http://money-goround.jp/article/2016/10/21/3234.html";
var linkInMessageClassName = "linkInMessage";
var recommendUrl_html = '<a class=\"' + linkInMessageClassName + '\" href="' + recommendUrl +'">' + recommendUrl + '</a>'

$("#msg_article").text(recommendMsg);
$("#recommendUrl").text(recommendUrl);

//メッセージの数
var messageCounter = 0;

//ボットから帰ってきたメッセージ
var returnedMessage = "";

//
var insertArticleNumber = 6;

// API送受信関数
function callBot(mymsg,mychara) {
    apiJson.utt = mymsg;
    apiJson.t = mychara;
    //css関連のクラス名等
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
            console.log(botMessage); // ←雑話が返る
            returnedMessage = botMessage;
//        $("#board").append("<li class = \"" + botClassName + " " + chatMessageClassName + "\" >" + botMessage + "</li>");
//        //テキストボックスにボットからのメッセージを入れる
//        $('#msg').val(botMessage);
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
    var curentMessage = "";
    if (messageCounter == 0) {
        curentMessage = $('#msg_1st').val();
    } else if (messageCounter == insertArticleNumber) {
        curentMessage = $('#msg_article').val();
        curentMessage = curentMessage + "<br>" + recommendUrl_html;
    } else {
        curentMessage = returnedMessage;
//        console.log(returnedMessage);
    }
    var curentChara = $('#chara').val();
    //css関連のクラス名等
    var botClassName = "";
    var chatMessageClassName = "chatMessage comment";
    var charaClassPre = "";
    var charaClassAfter = "";
//    前のメッセージが女性か男性かで変える
    if (curentChara == 20) {
        botClassName = "man";
        charaClassPre ="<div class=\"answer_box\"><div class=\"arrow_answer\">"
        charaClassAfter = "</div></div><img src=\"img/hiroshi_icon1.png\" alt=\"質問者\" class=\"left-image\"/></div>"
//        botClassName = "girl";
    } else {
//        botClassName = "man";
        botClassName = "girl";
        charaClassPre ="<img src=\"img/mika_icon1.png\" alt=\"質問者\" class=\"left-image\"/><div class=\"question_box\"><div class=\"arrow_question\">"
        charaClassAfter = "</div></div></div>"

    }

    $("#board").append("<li class = \"" + botClassName + " " + chatMessageClassName + "\" >" +charaClassPre+ curentMessage + charaClassAfter +"</li>");
    if (messageCounter == insertArticleNumber) {
        curentMessage = $("#keyPhrase").val();
        console.log("#keyPhrase:" + curentMessage);
    }
    callBot(curentMessage,curentChara);

    if (curentChara == 20) {
        $('#chara').val('');
    } else {
        $('#chara').val(20);
    }
    messageCounter++;
    $('#display').animate({
        scrollTop: $('#display')[0].scrollHeight
    }, {
        duration: 'normal',
        easing: "swing",
        complete: function () {
            $('#newSound')[0].currentTime = 0;
            $('#newSound')[0].play();
        }
    });
    if(messageCounter <10){
        setTimeout(sendMessage,2000);
    }
}

$('#sendButton').on('click', function () {
//    console.log("#sendButton");
    messageCounter = 0;
    sendMessage ();
});
