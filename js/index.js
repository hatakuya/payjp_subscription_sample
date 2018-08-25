/**
 * 画面起動時処理
 */
$(document).ready(function(){
    document.querySelector('#search_customer_button').addEventListener('click',getUsers);
    document.querySelector('#move_admin_page_button').addEventListener('click',moveAdminPage);
});

function moveAdminPage(){
    postForm( './admin/index.php', {} );
}

function getUsers(){
    var id = $('input[name="userid"]').val();
    $.post(
        "module/database_wrapper.php?command=select_users",
        { 'user_id': id},
        function(response){
            // 表示領域初期化
            $('#users-table').html('');

            // 契約情報がなければその旨を通知
            if(response == 'null'){
                alert("検索結果0件");
            }else{
                // JSONデータをパース
                var parsed = $.parseJSON(response);
                console.log(parsed);
                if(parsed.error){
                    alert(parsed.error.message);
                    return;
                }

                $.each(parsed, function(index, element){

                    var statusText = '通常';
                    var applyButton = '<button type="button" class="apply_subscription_button btn btn-primary">プラン契約</button>';
                    var changeCardButton = '<button type="button" class="change_card_button btn btn-primary" disabled="true">カード変更</button>';
                    var cancelButton = '<button type="button" class="cancel_button btn btn-primary" disabled="true">解約</button>';

                    if(element.paying_status != '0'){
                        var statusText = '有料';
                        var changeCardButton = '<button type="button" class="change_card_button btn btn-primary">カード変更</button>';
                        var cancelButton = '<button type="button" class="cancel_button btn btn-primary">解約</button>';
                    }

                    $("#users-table").append(
                        $("<tr></tr>")
                            .append($('<th scope="row"></th>').text(element.user_id))
                            .append($('<td></td>').text(element.mail))
                            .append($('<td></td>').text(statusText))
                            .append($('<td></td>')
                                .append(applyButton))
                            .append($('<td></td>')
                                .append(changeCardButton))
                            .append($('<td></td>')
                                .append(cancelButton))
                        );
                });
                addEvent();
            }
        }
    );
}

function addEvent(){
    // 契約ボタンアクションの追加
    var subscriptions = $('.apply_subscription_button');
    $.each(subscriptions, function(index,element){
        element.addEventListener('click',function(){
            var userid = $(this).closest('tr').children("th").text();
            postForm("contract/index.php",{'user_id': userid});
        });
    });

    // カード情報変更ボタンアクションの追加
    var changeCards = $('.change_card_button');
    $.each(changeCards, function(index,element){
        element.addEventListener('click',function(){
            var userid = $(this).closest('tr').children("th").text();
            postForm("changecard/index.php",{'user_id': userid});
        });
    });
    // キャンセルボタンアクションの追加
    var cancels = $('.cancel_button');
    $.each(cancels, function(index,element){
        element.addEventListener('click',function(){
            var userid = $(this).closest('tr').children("th").text();
            postForm("cancel/index.php",{'user_id': userid});
        });
    });

}
