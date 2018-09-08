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
 * 決済処理を実行後完了ページへ遷移
 */
function moveThanksPage(){
    $('#danger_area').hide();
    var subscriptionId = $('#subscriptionid').val();

    // トークンが入っていれば新規顧客登録
    deleteSubscription(subscriptionId);
}

/**
 * 継続課金情報法削除
 * @param {*} subscriptionId
 */
function deleteSubscription(subscriptionId){
    $.post(
        "../module/payjp_wrapper.php?command=delete_subscription",
        { 'subscriptionid': subscriptionId},
        function(response){
            console.log(response);
            if (response != 'success') {
                $('#danger_area').html("プラン解除中にエラーが発生しました。管理者へ問い合わせて下さい。");
                $('#danger_area').show();
            }else{
                postForm("./complete.php",{});
            }
        }
    );
}

/**
 * 前の画面へ遷移する
 */
function movePreviousPage(){
    var userId = $('#userid').val(); 
    var mail = $('#mail').val();
    var customerId = $('#customerid').val();
    var planId = $('#planid').val();
    var data = {'userid': userId, 'mail':mail, 'customerid':customerId, 'planid':planId};

    // 登録済みであるか、否かで遷移先を切り替える
    postForm( './index.php', data );
}
