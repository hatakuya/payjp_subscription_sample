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