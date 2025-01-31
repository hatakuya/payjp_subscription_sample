<?php
class Dao{
    /**
     * DBコネクション格納
     */
    private $connection;

    /**
     * コンストラクタ（コネクション確立）
     */
    function __construct() {
        $this->connection = new mysqli(DB_HOST , DB_USER , DB_PASSWORD , DB_NAME);
        if ($this->connection->connect_error){
            $sql_error = $this->connection->connect_error;
            error_log($sql_error);
            die($sql_error);
        } else {
            $this->connection->set_charset(DB_CHARSET);
        }
    }    

    /**
     * 指定したIDに合致するユーザ情報を取得
     */
    function selectUsers($id){
        $result;
        // IDの指定がなければ全件検索
        if($id == ""){
            $result = $this->connection->query("select user_id,mailaddress,paying_status from users");
        }else{
            $result = $this->connection->query("select user_id,mailaddress,paying_status from users where user_id like " . $id);
        }

        if (!$result) {
            $sql_error = $this->connection->error;
            error_log($sql_error);
            die($sql_error);
            throw new Exception("データベースへの接続が失敗しました。");
        }

        $data = array();
        $duplicate_num = $result->num_rows ;
        if($duplicate_num > 0){
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }else{
            $data = null;
        }

        // 結果をリターン
        return $data;
    }
    
    /**
     * 指定したIDに合致するPayJPユーザ情報を取得
     */
    function selectPayjpUser($id){
        $result = $this->connection->query("select * from payjp_users where user_id = " . $id);

        if (!$result) {
            $sql_error = $this->connection->error;
            error_log($sql_error);
            die($sql_error);
            throw new Exception("データベースへの接続が失敗しました。");
        }

        $data = array();
        $duplicate_num = $result->num_rows ;
        if($duplicate_num > 0){
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }else{
            $data = null;
        }

        // 結果をリターン
        return $data;
    }

     /**
     * 指定したIDに合致するPayJPユーザ情報を取得
     */
    function insertPayjpUser($data){
        $stmt = $this->connection->prepare(
            "insert into payjp_users (user_id, subscription_id, customer_id, card_brand, card_id, card_name ,card_last4 ,card_exp_month, card_exp_year, card_cvc) "
            ."values (?,?,?,?,?,?,?,?,?,?) "
        );
        $stmt->bind_param( 'isssssiiii', // カラムのデータ種別(i=>int,s=>string)
                    $data['user_id'], $data['subscription_id'], $data['customer_id'], $data['card_brand'], $data['card_id'], $data['card_name'], $data['card_last4'], $data['card_exp_month'], $data['card_exp_year'], $data['card_cvc']
                );

        $result = $stmt->execute();
        
        if (!$result) {
            $sql_error = $this->connection->error;
            error_log($sql_error);
            die($sql_error);
            throw new Exception("データベースへの接続が失敗しました。");
        }

        // 結果をリターン
        return "success";
    }

    /**
     * PayjpUser情報（クレジットカード情報）を更新する
     */
    function updatePayjpUser($data){
        // デフォルトカードが変更となるため、顧客の全カード情報を更新
        $stmt = $this->connection->prepare(
            "update payjp_users set "
            ."card_brand=?, card_id=?, card_name=? ,card_last4=? ,card_exp_month=?, card_exp_year=? where customer_id = ?"
        );
        $stmt->bind_param( 'sssiiis', // カラムのデータ種別(i=>int,s=>string)
                    $data['card_brand'], $data['card_id'], $data['card_name'], $data['card_last4'], $data['card_exp_month'], $data['card_exp_year'],$data['customerid']
                );

        $result = $stmt->execute();
        
        if (!$result) {
            $sql_error = $this->connection->error;
            error_log($sql_error);
            die($sql_error);
            throw new Exception("データベースへの接続が失敗しました。");
        }

        // 結果をリターン
        return "success";
    }

    /**
     * ユーザのステータスを更新する
     */
    function updateUserStatus($userid,$status){
        $result = $this->connection->query("update users set paying_status=". $status ." where user_id = " . $userid);
    }

    /**
     * 課金レコードを削除する
     */
    function deleteSubscription($subscriptionId){
        $fromSubscriptionDataSet = $this->connection->query("select * from payjp_users where subscription_id = '" . $subscriptionId. "'");
        $userId;
        while ($row = $fromSubscriptionDataSet->fetch_assoc()) {
            error_log($row['user_id']);
            $userId = $row['user_id'];
        }

        $this->connection->query("delete from payjp_users where subscription_id = '" . $subscriptionId. "'");
        $fromUserIdDataSet = $this->connection->query("select * from payjp_users where user_id = " . $userId);        

        // 0件の場合、会員区分は無料会員へ戻す。
        $duplicate_num = $fromUserIdDataSet->num_rows ;
        if($duplicate_num < 1){
            $this->connection->query("update users set paying_status=0 where user_id = " . $userId);
        }
    }

    /**
     * デストラクタ（コネクションクローズ）
     */
    function __destruct() {
        $this->connection->close();
    }    
}