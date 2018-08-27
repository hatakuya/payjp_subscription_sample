/**
 * 画面起動時処理
 */
$(document).ready(function(){

    // 顧客IDを元に契約中のプランを設定
    setUserSelectable();
        
    //　各ボタンクリックのイベントを定義
    document.querySelector('#apply_subscription_button').addEventListener('click',moveConfirmPage);
});

/**
 * 選択可能なプランの一覧を選択形式で出力
 */
function setUserSelectable(){

    var userId = $('#userid').val();
    $.post(
        "../module/database_wrapper.php?command=select_payjp_user",
        { 'user_id':userId },
        function(response){
            if(response != 'null'){
                var parsed = $.parseJSON(response);
                if(parsed.error){
                    alert("エラーが発生しました。詳細：" + parsed.error.message);
                    return;
                }
                getSelectablePlanList(parsed[0].customer_id);
                $('#customerid').val(parsed[0].customer_id);
            }            
        }
    );
}

function getSelectablePlanList(customerId){
    $.post(
        "../module/payjp_wrapper.php?command=get_customer_subscription_list",
        { 'customerid':customerId },
        function(response){
            if(response != 'null'){
                var parsed = $.parseJSON(response);
                console.log(parsed.subscription.data);
                $.each(parsed.subscription.data, function(index, element){
                    $("#planSelect").append( function(){
                        if($("#planSelect option[value='"+ element.id +"']").length == 0) {
                            return $("<option>").val(element.id).text(element.plan.name);
                        }
                    });
                });
            }else{
                $("#planSelect").append('<option>選択可能なプランはありません</option>');
                $('#move_paymentselect_button').prop("disabled", true);                    
            }
        }
    );
}

/**
 * クレジットカード情報入力画面への遷移
 * 事前にページ上に保持しているユーザー情報を取得する
 */
function moveConfirmPage(){
    var userId = $('#userid').val();
    var subscriptionId = $('[name="plan"] option:selected').val();
    var planName = $('[name="plan"] option:selected').text();
    var customerId = $('#customerid').val();

    var data = {'userid':userId, 'subscriptionid':subscriptionId,'planname':planName ,'customerid':customerId};
    postForm('./confirm.php', data);
}