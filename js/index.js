/**
 * 画面起動時処理
 */
$(document).ready(function(){
    //　各ボタンクリックのイベントを定義
    document.querySelector('#move_input_button').addEventListener('click',moveInputPage);
    document.querySelector('#search_customer_button').addEventListener('click',searchCustomer);
    document.querySelector('#pause_button').addEventListener('click',pauseService);
    document.querySelector('#resume_button').addEventListener('click',resumeService);
    document.querySelector('#cancel_button').addEventListener('click',cancelService);
    document.querySelector('#delete_button').addEventListener('click',deleteService);

    // フォームのメールアドレスから顧客情報と紐づくカード、定期課金情報を取得
    searchCustomer();

    // 選択可能なプランのリストを取得し選択形式に整形して出力
    getPlanList();
});

/**
 * 入力されたメールアドレスに紐付く顧客情報を取得
 * 顧客に紐付くカード情報および契約している定期決済情報を画面へ表示する
 */
function searchCustomer(){
    var mail = $('input[name="mail"]').val();
    $.post(
        "server.php?command=get_customer",
        { 'mail': mail},
        function(response){
            $('#cards').html('');
            $('#subscriptions').html('');
            // 契約情報がなければその旨を通知
            if(response == ''){
                $('#customerId').html('新規登録');
                $('#cards').append('<label class="btn"><input name="card" type="radio" value="new" checked="true">新しいカードで申し込む</label><br>');
                $('#subscriptions').append('<label>契約情報はまだありません</label><br>');
            }else{
                // 正常取得時
                var parsed = $.parseJSON(response);

                // JSONデータをパース
                $('#customerId').html(parsed.id);
                
                // カード情報の一覧を出力
                $('#cards').append('<label class="btn"><input name="card" type="radio" value="new" checked>新しいカードで申し込む</label><br>');
                $.each(parsed.card, function(index, element){
                    $('#cards').append('<label class="btn"><input name="card" type="radio" value="'+ element.id +'">XXXX - XXXX - XXXX - '+ element.last4 + '</label>');
                    $('#cards').append('<input type="hidden" id="name_' +element.id+ '" value="' + element.name + '">');
                    $('#cards').append('<input type="hidden" id="last4_' +element.id+ '" value="' + element.last4 + '">');
                    $('#cards').append('<input type="hidden" id="brand_' +element.id+ '" value="' + element.brand + '">');
                    $('#cards').append('<input type="hidden" id="exp_month_' +element.id+ '" value="' + element.exp_month + '">');
                    $('#cards').append('<input type="hidden" id="exp_year_' +element.id+ '" value="' + element.exp_year + '">');
                });

                // 顧客が契約している定期課金情報の一覧を出力
                $.each(parsed.subscription, function(index, element){
                    $('#subscriptions').append('<label>・' + element.plan.name + '</label><br>');
                    $('#cards').append('<input type="hidden" id="' +element.plan.id+ '" value="' + element.id + '">');
                });
            }
        }
    );
}

/**
 * 選択可能なプランの一覧を選択形式で出力する
 */
function getPlanList(){
    $.post(
        "server.php?command=get_plan_list",
        {  },
        function(response){
            var parsed = $.parseJSON(response);
            $.each(parsed, function(index, element){
                $("#planSelect").append( function(){
                    if($("#planSelect option[value='"+ element.id +"']").length == 0) {
                        var billingDay = element.billing_day == null? "":element.billing_day + "日";
                        var planStr = 
                            element.name + " :(" + element.amount + " 円)/ 毎月" + billingDay + "支払い"
                        return $("<option>").val(element.id).text(planStr);
                    }
                });
            });
        }
    );
}

/**
 * クレジットカード情報入力画面への遷移
 * 事前にページ上に保持しているユーザー情報を取得する
 */
function moveInputPage(){
    var name = $('input[name="name"]').val();
    var mail = $('input[name="mail"]').val();
    var planId = $('[name="plan"] option:selected').val();
    var planName = $('[name="plan"] option:selected').text();
    var customerId = $('#customerId').html();
    
    var subscriptionId = $('#' + planId).val();
    if(subscriptionId != undefined){
        alert('すでに契約済みのプランを選択しています。');
    }else{
        // 新規であればカード情報入力画面へ遷移
        if($('input[name="card"]:checked').val() == "new"){
            var data = {'name':name, 'mail':mail, 'planid':planId,'planname':planName, 'customerid':customerId};
            postForm( './input.php', data );
        }else{
            // 登録済みカードが選択されている場合は紐づく情報を元に確認画面へ遷移
            var cardId = $('input[name="card"]:checked').val();
            var cardName = $('#name_' + cardId).val();
            var last4 = $('#last4_' + cardId).val();
            var brand = $('#brand_' + cardId).val();
            var exp_month = $('#exp_month_' + cardId).val();
            var exp_year = $('#exp_year_' + cardId).val();
            var data = {
                'name':name,
                'mail':mail,
                'planid':planId,
                'planname':planName,
                'customerid':customerId,
                'cardid':cardId,
                'cardname':cardName,
                'last4':last4,
                'brand':brand,
                'exp_month':exp_month,
                'exp_year':exp_year,
            };
            postForm( './confirm.php', data );
        }
    }
}

/**
 * 定期課金停止処理
 */
function pauseService(){
    var planId = $('[name="plan"] option:selected').val();
    var subscriptionId = $('#' + planId).val();
    if(subscriptionId != undefined){
        $.post(
            "server.php?command=pause_subscription",
            { 'subscriptionid': subscriptionId},
            function(response){
                if(response == "success"){
                    alert('完了しました。');
                }else{
                    alert('エラーが発生しました。再度実行してください。');
                }
            }
        );    
    }else{
        alert('選択中のプランは未契約です。');
    }
}

/**
 * 定期課金再開処理
 */
function resumeService(){
    var planId = $('[name="plan"] option:selected').val();
    var subscriptionId = $('#' + planId).val();
    if(subscriptionId != undefined){
        $.post(
            "server.php?command=resume_subscription",
            { 'subscriptionid': subscriptionId},
            function(response){
                if(response == "success"){
                    alert('完了しました。');
                }else{
                    alert('エラーが発生しました。すでに適用されている可能性があります。確認の後再度実行してください。');
                }
            }
        );
    }else{
        alert('選択中のプランは未契約です。');
    }
}

/**
 * 定期課金キャンセル処理
 */
function cancelService(){
    var planId = $('[name="plan"] option:selected').val();
    var subscriptionId = $('#' + planId).val();
    if(subscriptionId != undefined){
        $.post(
            "server.php?command=cancel_subscription",
            { 'subscriptionid': subscriptionId},
            function(response){
                if(response == "success"){
                    alert('完了しました。');
                }else{
                    alert('エラーが発生しました。再度実行してください。');
                }
            }
        );
    }else{
        alert('選択中のプランは未契約です。');
    }
}

/**
 * 定期課金削除処理
 */
function deleteService(){
    var planId = $('[name="plan"] option:selected').val();
    var subscriptionId = $('#' + planId).val();
    if(subscriptionId != undefined){
        $.post(
            "server.php?command=delete_subscription",
            { 'subscriptionid': subscriptionId},
            function(response){
                if(response == "success"){
                    alert('完了しました。');
                }else{
                    alert('エラーが発生しました。再度実行してください。');
                }
            }
        );
    }else{
        alert('選択中のプランは未契約です。');
    }
}
