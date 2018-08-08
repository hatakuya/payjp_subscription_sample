/**
 * 画面起動時処理
 */
$(document).ready(function(){
    // 決済実行および完了ページへの遷移
    document.querySelector('#move_complete_button').addEventListener('click',moveThanksPage);
    // アラート表示領域の初期化
    $('#danger_area').hide();
    $('#danger_area').addClass('alert-danger');

});

/**
 * 確認画面への遷移ロジック
 * 画面上の情報を収集
 */
function moveThanksPage(){
    $('#danger_area').hide();
    var mail = $('#mail').val();
    var tokenId = $('#tokenid').val();
    var planId = $('#planid').val();
    var customerId = $('#customerid').val();
    // 顧客IDがセットされていない場合（ユーザー登録）
    if(customerId == "新規登録"){
            $.post(
            "server.php?command=create_customer",
            { 'mail': mail, 'tokenid':tokenId},
            function(response){
                var parsed = $.parseJSON(response);
                if (parsed.error) {
                    $('#danger_area').html("決済エラーが発生しました。カードが使用できません。入力内容を再確認してください。エラー詳細（" + parsed.error.message + "）");
                    $('#danger_area').show();
                }else{
                    createSubscription(response, planId);
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