<?php
require_once 'lib/payjp_init.php';
require_once 'lib/database_init.php';

/**
 * PayJPAPI連携用モジュール
 * PayJPConnectorクラスは参考URLの仕様に従って実装（各処理内の引数、戻り値はURL内に記載のパラメータに対応）
 * JSONをそのまま返しても上手くいかない（先頭にPayJPCollectionの文字列が入ってしまう）ので、一度オブジェクトに整形しエンコード後返却
 * @see https://pay.jp/docs/api/?php
 */
class PayJPConnector {

    private $currency = 'jpy';
    private $secretKey = 'sk_test_24bc7421e2a88ee6a962b4b3';
    private $clientToken = '';

    /**
     * コンストラクタ（サーバトークンセット）
     */
    function __construct() {
        Payjp\Payjp::setApiKey($this->secretKey);
    }

    /********************************************************
     * プラン系API連携
     ********************************************************/
    
     /**
     * 登録済みプラン情報一覧の取得
     */
    function getPlan($planId){
        $result = Payjp\Plan::retrieve($planId);
        if (isset($result['error'])) {
            throw new Exception();
        }

        $obj['id'] = $result['id'];
        $obj['name'] = $result['name'];
        $obj['amount'] = $result['amount'];
        $obj['billing_day'] = $result['billing_day'];
        $obj['interval'] = $result['interval'];
        return $obj;
    }

    /**
     * 登録済みプラン情報一覧の取得
     */
    function getPlanList(){
        $result = Payjp\Plan::all();
        if (isset($result['error'])) {
            throw new Exception();
        }
        $obj;
        foreach($result['data'] as $index => $element){
            $obj[$index]['id'] = $element['id'];
            $obj[$index]['amount'] = $element['amount'];
            $obj[$index]['name'] = $element['name'];
            $obj[$index]['billing_day'] = $element['billing_day'];
            $obj[$index]['interval'] = $element['interval'];
        }
        return $obj;
    }

    /********************************************************
     * 顧客系API連携
     ********************************************************/

    /**
     * 顧客IDに紐づく顧客情報取得
     */
    function getCustomer($customerId){

        $result = Payjp\Customer::retrieve($customerId);
        if (isset($result['error'])) {
            throw new Exception();
        }
        $obj;
        $obj['default_card'] = $result['default_card'];
        $obj['metadata']['user_id'] = $result['metadata']['user_id'];
        return $obj;
    }

    /**
     * メールアドレスに一致する顧客ID取得
     */
    function getCustomerByMail($email){
        $result = Payjp\Customer::all();
        if (isset($result['error'])) {
            throw new Exception();
        }
        foreach($result['data'] as $element){
            if($email == $element['email']){
                $customerInfo = Payjp\Customer::retrieve($element['id']);
                $obj['id'] = $customerInfo['id'];
                $obj['email'] = $customerInfo['email'];
                $obj['userid'] = $customerInfo['metadata']['user_id'];
                return $obj;
            }
        }
        return "";
    }

    /**
     * 顧客IDに紐づくカード情報のリスト取得
     */
    function getCustomerCardList($customerId){
        $result = Payjp\Customer::retrieve($customerId)->cards->all();

        if (isset($result['error'])) {
            throw new Exception();
        }
        $obj['card']['count'] = $result['count'];
        foreach($result['data'] as $i => $element){
            $obj['card']['data'][$i]['id'] = $element['id'];
            $obj['card']['data'][$i]['name'] = $element['name'];                        
            $obj['card']['data'][$i]['last4'] = $element['last4'];
            $obj['card']['data'][$i]['brand'] = $element['brand'];
            $obj['card']['data'][$i]['exp_month'] = $element['exp_month'];
            $obj['card']['data'][$i]['exp_year'] = $element['exp_year'];
        }
        return $obj;
    }

    /**
     * 顧客とカードIDに紐づくカード情報取得
     */
    function getCustomerCard($customerId, $cardId){

        $cu = Payjp\Customer::retrieve($customerId);
        $result = $cu->cards->retrieve($cardId);
        if (isset($result['error'])) {
            throw new Exception();
        }
        $obj;
        $obj['id'] = $result['id'];
        $obj['name'] = $result['name'];                        
        $obj['last4'] = $result['last4'];
        $obj['brand'] = $result['brand'];
        $obj['exp_month'] = $result['exp_month'];
        $obj['exp_year'] = $result['exp_year'];
        return $obj;
    }

    /**
     * 顧客IDに紐づく定期課金情報取得
     */
    function getCustomerSubscriptionList($customerId){
        $result = Payjp\Customer::retrieve($customerId)->subscriptions->all();

        if (isset($result['error'])) {
            throw new Exception();
        }
        $obj['subscription']['count'] = $result['count'];
        foreach($result['data'] as $i => $element){
            $obj['subscription']['data'][$i]['id'] = $element['id'];
            $obj['subscription']['data'][$i]['plan']['id'] = $element['plan']['id'];
            $obj['subscription']['data'][$i]['plan']['name'] = $element['plan']['name'];
            
        }
        return $obj;
    }

    /**
     * 顧客情報生成
     * @return 顧客情報生成結果
     */
    function createCustomer($userId, $mailaddress, $cardToken){
        
        // 顧客情報の追加
        $result = Payjp\Customer::create(array(
            "metadata[user_id]" => $userId,
            "email" => $mailaddress,
            "card" => $cardToken
        ));
        if (isset($result['error'])) {
            throw new Exception();
        }
        return $result['id'];
    }

    /**
     * 顧客カードを追加する（デフォルトカードとして登録を行う）
     */
    function updateCustomerCard($customerId, $cardToken){
        $cu = Payjp\Customer::retrieve($customerId);
        $cu->cards->create(array(
                "card" => $cardToken,
                "default" => true
        ));
        return "success";
    }
    /********************************************************
     * 定期課金系API連携
    ********************************************************/
    /**
     * 定期課金生成処理
     * @return 定期課金生成結果
     */
    function createSubscription($customerId, $planId){
        $result = Payjp\Subscription::create(array(
            "customer" => $customerId,
            "plan" => $planId
        ));
        if (isset($result['error'])) {
            throw new Exception();
        }

        return $result;
    }

    /**
     * 定期課金停止処理
     */
    function pauseSubscription($subscriptionId){
        $su = Payjp\Subscription::retrieve($subscriptionId);
        $su->pause();
        return "success";
    }

    /**
     * 定期課金再開処理
     */
    function resumeSubscription($subscriptionId){
        $su = Payjp\Subscription::retrieve($subscriptionId);
        $su->resume();
        return "success";
    }

    /**
     * 定期課金キャンセル処理
     */
    function cancelSubscription($subscriptionId){
        $su = Payjp\Subscription::retrieve($subscriptionId);
        $su->cancel();
        return "success";
    }

    /**
     * 定期課金削除処理
     */
    function deleteSubscription($subscriptionId){
        $su = Payjp\Subscription::retrieve($subscriptionId);
        $su->delete();
        $dao = new Dao();
        $dao->deleteSubscription($subscriptionId);
        return "success";
    }
}

/********************************************************
 * ビジネスロジック記載（API連携クラスを使用したデータ取得の組み合わせ）
********************************************************/
/**
 * メールアドレスに紐づくユーザ情報、カード情報、定期課金情報を取得する
 */
function getCustomerDetail($mailaddress, $connection){
    $customer = $connection->getCustomerByMail($mailaddress);
    if($customer == ""){
        return null;
    }

    $cards = $connection->getCustomerCardList($customer['id']);
    if($cards['count'] != '0'){
        $customer = array_merge($customer, $cards);
    }

    $subscriptions = $connection->getCustomerSubscriptionList($customer['id']);
    if($subscriptions['count'] != '0'){
        $customer = array_merge($customer, $subscriptions);
    }

    return $customer;
}

/**
 * 選択可能なプランの一覧から顧客が未契約のプランを返却する
 */
function getSelectablePlanList($customerId, $connection){
    // プランの一覧を取得
    $plans = $connection->getPlanList();
    if($customerId == ''){
        return $plans;
    }

    // 顧客IDに紐づく定期課金リストを取得する(存在しなければ全プランを出力する))
    $subscriptions = $connection->getCustomerSubscriptionList($customerId);
    if($subscriptions['subscription']['count'] == '0'){
        return $plans;
    }

    // 未契約のプランを抽出する
    $obj;
    $count = 0;
    foreach($plans as $i => $plan){
        $isPush = true;
        foreach($subscriptions['subscription']['data'] as $j => $subscript){
            if($plan['id'] == $subscript['plan']['id']){
                $isPush = false;
                break;
            }
        }
        if($isPush){
            $obj[$count]['id'] = $plan['id'];
            $obj[$count]['amount'] = $plan['amount'];
            $obj[$count]['name'] = $plan['name'];
            $obj[$count]['billing_day'] = $plan['billing_day'];
            $obj[$count]['interval'] = $plan['interval'];
            $count++;
        }
    }
    return $obj;
}

/**
 * 定期課金情報を作成し、DBへひもづく情報を格納する
 */
function createSubscriptionAndUpdateDatabase($customerId, $planId, $connection){

    $subscription = $connection->createSubscription($customerId, $planId);

    // DB登録用定期課金情報
    $data['subscription_id'] = $subscription['id'];
    $data['customer_id'] = $customerId;

    // DB登録用顧客情報
    $customerInfo = $connection->getCustomer($customerId);
    $data['card_id'] = $customerInfo['default_card'];
    $data['user_id'] = $customerInfo['metadata']['user_id'];
    
    // DB登録用カード情報
    $card = $connection->getCustomerCard($customerId, $data['card_id']);
    $data['card_brand'] = $card['brand'];
    $data['card_name'] = $card['name'];
    $data['card_last4'] = $card['last4'];
    $data['card_exp_month'] = $card['exp_month'];
    $data['card_exp_year'] = $card['exp_year'];
    //$data['card_cvc'] = $card[''];

    $dao = new Dao();
    $dao->insertPayjpUser($data);
    $dao->updateUserStatus($data['user_id'], 1);
    return "success";
}

/**
 * 顧客カード情報を追加する（デフォルトカードとして登録を行う）
 */
function updateCustomerCardDefault($customerId, $tokenId, $connection){
    $result = $connection->updateCustomerCard($_POST['customerid'], $_POST['tokenid']);
    if($result != "success"){
        return $result;
    }

    // DBへの登録処理を実行
    $customerInfo = $connection->getCustomer($customerId);
    $data['customerid'] = $customerId;
    $data['card_id'] = $customerInfo['default_card'];
    $data['user_id'] = $customerInfo['metadata']['user_id'];
    
    // DB登録用カード情報
    $card = $connection->getCustomerCard($customerId, $data['card_id']);
    $data['card_brand'] = $card['brand'];
    $data['card_name'] = $card['name'];
    $data['card_last4'] = $card['last4'];
    $data['card_exp_month'] = $card['exp_month'];
    $data['card_exp_year'] = $card['exp_year'];
    //$data['card_cvc'] = $card[''];

    $dao = new Dao();
    $dao->updatePayjpUser($data);
    return "success";
}

/********************************************************
 * リクエストルーティング
********************************************************/
/**
 * リクエスト時のパラメータに応じた処理を実行
 * 基本的にGETにて取得したコマンド値に対応した関数を呼び出す
 */
$result = '';

try{
    $connection = new PayJPConnector();
    $command = $_GET['command'];
    switch($command){
        case 'get_plan':
            echo json_encode($connection->getPlan($_POST['planid']));
            break;
        case 'get_plan_list':
            echo json_encode($connection->getPlanList());
            break;
        case 'get_customer':
            echo json_encode($connection->getCustomer($_POST['userid']));
            break;
        case 'get_customer_card':
            echo json_encode($connection->getCustomerCard($_POST['customerid'],$_POST['cardid']));
            break;
        case 'get_customer_card_list':
            echo json_encode($connection->getCustomerCardList($_POST['customerid']));
            break;
        case 'get_customer_detail':
            echo json_encode(getCustomerDetail($_POST['mailaddress'], $connection));
            break;
        case 'get_customer_subscription_list':
            echo json_encode($connection->getCustomerSubscriptionList($_POST['customerid']));
            break;
        case 'get_selectable_plan_list':
            echo json_encode(getSelectablePlanList($_POST['customerid'], $connection));
            break;
        case 'create_customer':
            echo json_encode($connection->createCustomer($_POST['userid'], $_POST['mailaddress'], $_POST['tokenid']));
            break;
        case 'update_customer_card':
            echo json_encode(updateCustomerCardDefault($_POST['customerid'], $_POST['tokenid'], $connection));
            break;
        case 'create_subscription':
            echo json_encode(createSubscriptionAndUpdateDatabase($_POST['customerid'], $_POST['planid'], $connection));
            break;
        case 'pause_subscription':
            echo $connection->pauseSubscription($_POST['subscriptionid']);
            break;
        case 'resume_subscription':
            echo $connection->resumeSubscription($_POST['subscriptionid']);
            break;
        case 'cancel_subscription':
            echo $connection->cancelSubscription($_POST['subscriptionid']);
            break;
        case 'delete_subscription':
            echo $connection->deleteSubscription($_POST['subscriptionid']);
            break;
        default:
            echo "command not found.";
            break;
    }
}catch(Exception $e){
    // エラーハンドリング後は下記の構成でメッセージを返す（Payjp.jsが同様のフォーマットのため統一）
    $obj['error']['message'] = $e->getMessage();
    echo json_encode($obj);
}