/**
 * 画面起動時処理
 */
$(document).ready(function(){
    document.querySelector('#search_customer_button').addEventListener('click',getUsers);
    document.querySelector('#move_admin_page_button').addEventListener('click',moveUserPage);
});

/**
 * ユーザ一覧へ遷移する
 */
function moveUserPage(){
    postForm( '/index.php', {} );
}

/**
 * ユーザ情報をDBより取得する
 */
function getUsers(){
    var id = $('input[name="userid"]').val();
    $.post(
        "/module/database_wrapper.php?command=select_users",
        { 'userid': id},
        function(response){
            // 表示領域初期化
            $('#users-table').html('');

            // 契約情報がなければその旨を通知
            if(response == 'null'){
                alert("検索結果0件");
            }else{
                // JSONデータをパース
                var parsed = $.parseJSON(response);
                if(parsed.error){
                    alert(parsed.error.message);
                    return;
                }

                $.each(parsed, function(index, element){

                    var statusText = '通常';
                    var applyButton = '<button type="button" class="apply_subscription_button btn btn-primary" disabled="true">契約内容操作</button>';

                    if(element.paying_status != '0'){
                        var statusText = '有料';
                        var applyButton = '<button type="button" class="apply_subscription_button btn btn-primary">契約内容操作</button>';
                    }

                    $("#users-table").append(
                        $("<tr></tr>")
                            .append($('<th scope="row"></th>').text(element.user_id))
                            .append($('<td></td>').text(element.mailaddress))
                            .append($('<td></td>').text(statusText))
                            .append($('<td></td>')
                                .append(applyButton))
                        );
                });
                addEvent();
            }
        }
    );
}

/**
 * 契約内容の更新アクションを追加
 */
function addEvent(){
    // 契約ボタンアクションの追加
    var subscriptions = $('.apply_subscription_button');
    $.each(subscriptions, function(index,element){
        element.addEventListener('click',function(){
            var userid = $(this).closest('tr').children("th").text();
            
            $.post(
                "/module/database_wrapper.php?command=select_payjp_user",
                { 'userid': userid},
                function(response){
                    // JSONデータをパース
                    console.log(response);
                    var parsed = $.parseJSON(response);
                    if(parsed.error){
                        alert(parsed.error.message);
                        return;
                    }
                    postForm("controllplan/index.php",{'customerid': parsed[0].customer_id});
                }
            );

        });
    });

}
