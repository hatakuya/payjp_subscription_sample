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
    var name = $('input[name="name"]').val();
    var mail = $('input[name="mail"]').val();
    var data = {'name':name, 'mail':mail};
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

