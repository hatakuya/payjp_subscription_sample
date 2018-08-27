/**
 * 画面起動時処理
 */
$(document).ready(function(){
    // 顧客IDを元に契約中プランを取得
    getSubscriptionList();
    //　ボタンクリックのイベントを定義
    document.querySelector('#pause_button').addEventListener('click',pauseService);
    document.querySelector('#resume_button').addEventListener('click',resumeService);
    document.querySelector('#cancel_button').addEventListener('click',cancelService);
    document.querySelector('#delete_button').addEventListener('click',deleteService);
    document.querySelector('#move_previous_button').addEventListener('click',movePreviousPage);
});

/**
 * 選択可能なプランの一覧を選択形式で出力
 */
function getSubscriptionList(){ 
    var customerId = $('#customerid').val();
    $.post(
        "/module/payjp_wrapper.php?command=get_customer_subscription_list",
        { 'customerid':customerId },
        function(response){
            console.log(response);
            if(response == 'null'){
                $("#planSelect").append('<option>選択可能なプランはありません</option>');
                return;
            }

            var parsed = $.parseJSON(response);
            if(parsed.error){
                alert("エラーが発生しました。詳細：" + parsed.error.message);
                return;
            }

            if(parsed.subscription.count > 0){
                $.each(parsed.subscription.data, function(index, element){
                    $("#planSelect").append( function(){
                        if($("#planSelect option[value='"+ element.id +"']").length == 0) {
                            var planStr = element.plan.name + " (ID：" + element.plan.id + ")";
                            return $("<option>").val(element.id).text(planStr);
                        }
                    });
                });    
            }else{
                alert("操作可能なプランがありません。TOPページへ遷移します。");
                location.href = "/index.php";
            }

        }
    );
}

/**
 * 定期課金停止処理
 */
function pauseService(){
    var subscriptionId = $('[name="plan"] option:selected').val();
    $.post(
        "/module/payjp_wrapper.php?command=pause_subscription",
        { 'subscriptionid': subscriptionId},
        function(response){
            if(response == "success"){
                alert('完了しました。');
            }else{
                alert('エラーが発生しました。再度実行してください。');
            }
        }
    );
}

/**
 * 定期課金再開処理
 */
function resumeService(){
    var subscriptionId = $('[name="plan"] option:selected').val();
    $.post(
        "/module/payjp_wrapper.php?command=resume_subscription",
        { 'subscriptionid': subscriptionId},
        function(response){
            if(response == "success"){
                alert('完了しました。');
            }else{
                alert('エラーが発生しました。すでに適用されている可能性があります。確認の後再度実行してください。');
            }
        }
    );
}

/**
 * 定期課金キャンセル処理
 */
function cancelService(){
    var subscriptionId = $('[name="plan"] option:selected').val();
    $.post(
        "/module/payjp_wrapper.php?command=cancel_subscription",
        { 'subscriptionid': subscriptionId},
        function(response){
            if(response == "success"){
                alert('完了しました。');
            }else{
                alert('エラーが発生しました。再度実行してください。');
            }
        }
    );
}

/**
 * 定期課金削除処理
 */
function deleteService(){
    var subscriptionId =$('[name="plan"] option:selected').val();
    $.post(
        "/module/payjp_wrapper.php?command=delete_subscription",
        { 'subscriptionid': subscriptionId},
        function(response){
            if(response == "success"){
                alert('完了しました。');
            }else{
                alert('エラーが発生しました。再度実行してください。');
            }
        }
    );
}

/**
 * 前の画面へ遷移する
 */
function movePreviousPage(){
    postForm( './index.php', {} );
}