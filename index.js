'use strict';
const crypto = require('crypto');
const line = require('@line/bot-sdk');
const client = new line.Client({channelAccessToken: process.env.ACCESSTOKEN});

exports.handler = function (event, context) {

 let signature = crypto.createHmac('sha256', process.env.CHANNELSECRET).update(event.body).digest('base64');
 let checkHeader = (event.headers || {})['X-Line-Signature'];
 let body = JSON.parse(event.body);

 if (signature === checkHeader) {
  // lineの接続チェック用
  if (body.events[0].replyToken === '00000000000000000000000000000000') {
   let lambdaResponse = {
    statusCode: 200,
    headers: { "X-Line-Status" : "OK"},
    body: '{"result":"connect check"}'
   };
   context.succeed(lambdaResponse);
  } else {
   let text = body.events[0].message.text;
   let message;
   
   var uedaMeigen = [
    "斯様に思います～",
    "俺マザー・テレサかって言われるわ！優しすぎて",
    "まぁでも要は数字よ。",
    "いやいやいやお前はゴミだよ。",
    "(番組ディレクターに対して)コイツら『モー娘。』より入れ替わり激しいからね",
    "やかましいったらありゃしないよ！",
    "昭和の文豪か！",
    "ラジオネームせんずり、ん？　あーせんずり",
    "なんだこのわがまま放題。かぐや姫か。",
    "お前は名字を「支離」名前を「滅裂」にしろ。",
    "マラドーナ一家か！",
    "レディース&ジェントルメンうんこを漏らした奴がいる",
    "鎌倉の末期と考えてもらってかまわんよ。",
    "ナイフorフォーク？",
    "上田の押し売りです。",
    "まめひろくーん、上田ですー。",
    "満タンなるまで４、５０分",
    "スッポン屋『ウエッポン』オープン。お前ら明日学校で3人に勧めろよ〜",
    "ほら、ね？なんのほらだ！",
    "(パワプロしながらビンビンになってしまった有田に対して)お前のバットが一番極大だったわけだ。お前が一番の“ぶんぶん丸”だな。",
    "チンカスばぁちゃーん。上田ですー。",
    "みんなの笑顔が見られりゃいいんじゃねぇか？それで。(Wii買い占め事件)",
    "でもマックミランだからねぇ。",
    "あったかくしてねろよ～。",
    "俺イズムだもん。",
    "高田文夫か！",
    "でも、まぁ....楽しかったよね？",
    "ariue@allnightnippon.com, ariue@allnightnippon.com",
    "相変わらずババァは飛ばしてはくれてんのね",
    "電波から何から飛ばしてはくれてんのね",
    "作治の話はもういいよ！",
    "これロッキーの撮影じゃないのよ～",
    "手頃だねえ",
    "文化放送を聴け！",
    "アン・ルイスと半ライスぐらい違うよ",
    "1月3日の中央高速ぐらい遅いよ",
    "インリンの水着の面積ぐらい狭いよ",
    "お前のところでは今頃フラフープ大流行か",
    "お前の審査ゆるいなぁ、アコムでももうちょっと厳しいよ",
    "レベル200のテトリスぐらい早いよ",
    "ややこしいよ！ベーコンレタスエッグつくねライスバーガーか",
    "振り返り過ぎだろ！初めてのブラジャー装着か！",
    "二度手間だよ、ライス定食か",
    "そんなに広がんないだろ、マエケンのアナルじゃないんだから",
    "センターへのファールフライくらい有り得ないよ",
    "暗いなぁ、江戸時代の夜か！",
    "しつこいよ、お前は！エイリアン２か！",
    "幼稚園児が里見浩太朗に会ったときぐらいピンとこないよ",
    "何を言っているか分からないよ、カンボジアのニュースか！",
    "ゾロゾロ付いてきているけど、これロッキーの撮影じゃないのよ",
    "あれやってくれ、これやってくれって.....かぐや姫"
    
   ];
   
   var aritaMeigen = [
    "いやぁ、まいったね",
    "まいったね！(テノール編)",
    "まいったね。。",
    "寒いわね",
    "うーん、いや待てよ、うーん、いやまいったね",
    "あの…確認なんですけど、上田さんって有馬記念に出走してましたか…?",
    "また例のこそピンですか…",
    "僕から以上!!",
    "上田さん！怒らないで言ってあげてください！",
    "まぁ、なんというか時間の無駄ったというか",
    "そいつはすげぇや",
    "チキチキ",
    "コックピットの皆様、スターダスト有田です",
    "今回で一旦くりぃむのオールナイトニッポンは終了…と言う形になります…",
    "タマキンの裏の肛門の…あ、上田さん誕生日おめでとうございます。んで、タマキンの裏の肛門がですね…"
   ]
   
   var uedaMeigenRandom = uedaMeigen[Math.floor(Math.random() * uedaMeigen.length)];
   var aritaMeigenRandom = aritaMeigen[Math.floor(Math.random() * aritaMeigen.length)];
   
   if (body.events[0].message.text == "上田晋也"){
     message = {
        "type": "text",
        "text": uedaMeigenRandom
     };
   } else if (body.events[0].message.text == "有田哲平"){
     message = {
        "type": "text",
        "text": aritaMeigenRandom
   };
  };  
  
   client.replyMessage(body.events[0].replyToken, message)
   .then((response) => {
    let lambdaResponse = {
     statusCode: 200,
     headers: { "X-Line-Status" : "OK"},
     body: '{"result":"completed"}'
    };
    context.succeed(lambdaResponse);
   }).catch((err) => console.log(err));
  }
 }else{
  console.log('署名エラー');
 }
};