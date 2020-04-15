'use strict'; //厳格モード
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子供をすべて削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) { //最初の子供の要素が存在する限り、その最初の子供の要素を削除し続ける
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) { //名前が空の時は処理を終了する：ガード句
        return;
    }

    //todo 診断結果表示エリアの作成
    removeAllChildren(resultDivided);

    const header = document.createElement('h3')
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName)
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph)

    //todo ツイートエリアの作成
    removeAllChildren(tweetDivided);

    const anchor = document.createElement('a')
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' 
    + encodeURIComponent('あなたのいいところ') 
    + '&ref_src=twsrc%5Etfw'

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);
    twttr.widgets.load();
}

userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
      assessmentButton.onclick()  
    }
}

const answers = [ //置き換え不可能
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName string：文字列
 * @return {string} 診断結果 
 */
function assessment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfcharCode = 0;
    for (let i =0; i < userName.length; i++) { //文字数分ループ
        sumOfcharCode += userName.charCodeAt(i);
    }
    //文字コード番号の合計を回答の数で割って添字の数値を求める
    let index = sumOfcharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);
    //todo {userName}をユーザーの名前に置き換える
    return result;
}
