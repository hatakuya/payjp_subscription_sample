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
            $result = $this->connection->query("select user_id,mail,paying_status from users");
        }else{
            $result = $this->connection->query("select user_id,mail,paying_status from users where user_id like " . $id);
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

        //接続をクローズ
        $this->connection->close();

        // 結果をリターン
        return $data;
    }
}