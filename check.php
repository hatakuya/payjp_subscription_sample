<?php 
require_once 'init.php';
 

var_dump($_POST);

//◆支払い以外のアクセスは弾く
if (!isset($_POST['payjp-token'])) {
    echo "トークンがセットされていない";
    exit;
}
 
//失敗時のメッセージ
$err            = '';
//送られてきた、顧客のカード情報を使って作成されたトークン
$token          = $_POST['payjp-token'];
//支払い価格
$amount = 500;
//秘密鍵
$secret = 'sk_test_24bc7421e2a88ee6a962b4b3';
//通貨(通常は日本円を表す'jpy'を指定する)
$currency = 'jpy';
 
try {
    //◆新しい課金の作成
    Payjp\Payjp::setApiKey($secret);
    $result = Payjp\Charge::create(array(
            "card" => $token,
            "amount" => $amount,
            "currency" => $currency
    ));
    if (isset($result['error'])) {
        throw new Exception();
    }
} catch (Exception $e) {
    // カードが拒否された場合
    $err = $result['error']['message'];
    echo $err;
    exit;
}
 
echo "支払いが完了しました。";