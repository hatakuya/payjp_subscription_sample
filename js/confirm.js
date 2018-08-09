/**
 * 画面起動時処理
 */
$(document).ready(function(){
    // 決済実行および完了ページへの遷移
    document.querySelector('#move_complete_button').addEventListener('click',moveThanksPage);
    document.querySelector('#move_previous_button').addEventListener('click',movePreviousPage);

    // アラート表示領域の初期化
    $('#danger_area').hide();
    $('#danger_area').addClass('alert-danger');
});

/**
 * 前の画面へ遷移する
 */
function movePreviousPage(){
    var customerId = $('#customerid').val();
    // トークンが入っていれば入力画面へ
    if(customerId == '未登録'){
        postForm( './input.php', {} );
    }else{
        postForm( './index.php', {} );
    }
}

/**
 * 決済処理を実行後完了ページへ遷移
 */
function moveThanksPage(){
    $('#danger_area').hide();
    var tokenId = $('#tokenid').val();
    var planId = $('#planid').val();
    var userId = $('#userid').val();
    var customerId = $('#customerid').val();
    var mail = $('#mail').val();
    // トークンが入っていれば新規顧客登録
    if(customerId == '未登録'){
        $.post(
            "server.php?command=create_customer",
            { 'userid':userId, 'mail': mail, 'tokenid':tokenId},
            function(response){
                var parsed = $.parseJSON(response);
                if (parsed.error) {
                    $('#danger_area').html("決済エラーが発生しました。カードが使用できません。入力内容を再確認してください。エラー詳細（" + parsed.error.message + "）");
                    $('#danger_area').show();
                }else{
                    createSubscription(parsed, planId);
                }
            }
        );
    }else{
        createSubscription(customerId, planId);
    }
}

/**
 * 定期課金作成
 * @param {*} customerId 
 * @param {*} planId 
 */
function createSubscription(customerId, planId){
    $.post(
        "server.php?command=create_subscription",
        { 'customerid': customerId, 'planid':planId},
        function(response){
            // 登録済みカードの場合は顧客IDを使って決済
            var parsed = $.parseJSON(response);
            if (parsed.error) {
                $('#danger_area').html("決済エラーが発生しました。カードが使用できません。入力内容を再確認してください。エラー詳細（" + parsed.error.message + "）");
                $('#danger_area').show();
            }else{
            // 正常終了なら完了ページへ
                postForm( './complete.php', {} );
            }
        }
    );

}