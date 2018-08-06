/**
 * 画面起動時処理
 * ボタン押下時のイベントを定義
 */
$(document).ready(function(){
    document.querySelector('#move_input_button').addEventListener('click',moveInputPage);
    document.querySelector('#stop_button').addEventListener('click',stopService);
    document.querySelector('#restart_button').addEventListener('click',restartService);
});

/**
 * クレジットカード情報入力画面への遷移
 * 事前にページ上に保持しているユーザー情報を取得する
 */
function moveInputPage(){
    var data = {'name':'大塚', 'mail':'otsuka@example.com'};
    postForm( './input.php', data );
}

/**
 * 継続課金停止処理
 */
function stopService(){
    alert('継続課金停止の処理を行います');
}

/**
 * 継続課金再開処理
 */
function restartService(){
    alert('継続課金再開の処理を行います');
}

/**
 * POSTにて画面遷移するための汎用関数
 * @param {*} url 
 * @param {*} data 
 */
function postForm(url, data) {
    var $form = $('<form/>', {'action': url, 'method': 'post'});
    for(var key in data) {
            $form.append($('<input/>', {'type': 'hidden', 'name': key, 'value': data[key]}));
    }
    $form.appendTo(document.body);
    $form.submit();
};