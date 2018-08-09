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

/**
 * 選択可能なプランの一覧を返却する
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