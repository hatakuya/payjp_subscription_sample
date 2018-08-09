<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>定期購入設定</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./css/bootstrap/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <h1>入力内容確認画面</h1>
    </div>
    <br>
    <div class="container">
        <p id="danger_area" class="alert"></p>
        <div class="form-group">
            <label>ユーザID：</label>
            <label><?php echo $_POST['userid']; ?></label>  
        </div>
        <div class="form-group">
            <label>PayJP顧客ID：</label>
            <label><?php echo $_POST['customerid']; ?></label>  
        </div>
        <div class="form-group">
            <label>メールアドレス：</label>
            <label><?php echo $_POST['mail']; ?></label>
        </div>
        <div class="form-group">
            <label>選択プラン：</label>
            <label id="planname"></label>
        </div>
        <div class="form-group">
            <label>クレジットカード番号：</label>
            <label>XXXX - XXXX - XXXX - <label id="disp_last4"><?php echo $_POST['last4']; ?></label></label>
            <label id="disp_brand"><?php echo $_POST['brand']; ?></label>
        </div>
        <div class="form-group">
            <label>クレジットカード名義：</label>
            <label id="disp_cardname"><?php echo $_POST['cardname']; ?></label>
        </div>
        <div class="form-group">
            <label>有効期限：</label>
            <label id="disp_exp"><?php echo $_POST['exp_month']; ?> / <?php echo $_POST['exp_year']; ?></label>
        </div>
    </div>
    <br>
    <div class="container">
        <button id="move_previous_button" type="button" class="btn btn-secondary">戻る</button>        
        <button id="move_complete_button" type="button" class="btn btn-primary">注文確定</button>
    </div>
    <!-- POST値格納領域 -->
    <div class="container">
        <!-- 顧客基本情報 -->
        <input id="userid" type="hidden" value="<?php echo $_POST['userid']; ?>">
        <input id="mail" type="hidden" value="<?php echo $_POST['mail']; ?>">
        <input id="customerid" type="hidden" value="<?php echo $_POST['customerid']; ?>">
        <input id="planid" type="hidden" value="<?php echo $_POST['planid']; ?>">

        <!-- クレジットカード入力情報(新規入力時の表示用) -->
        <input id="last4" type="hidden" value="<?php echo $_POST['last4']; ?>">
        <input id="cardname" type="hidden" value="<?php echo $_POST['cardname']; ?>">
        <input id="exp_month" type="hidden" value="<?php echo $_POST['exp_month']; ?>">
        <input id="exp_year" type="hidden" value="<?php echo $_POST['exp_year']; ?>">        

        <!-- クレジットカード情報(新規入力時発行されたトークン) -->
        <input id="tokenid" type="hidden" value="<?php echo $_POST['tokenid']; ?>">  

        <!-- クレジットカード情報(登録済みのカードID) -->
        <input id="cardid" type="hidden" value="<?php echo $_POST['cardid']; ?>">  
    </div>

    <!-- Optional JavaScript -->
    <script src="js/jquery/min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="js/bootstrap/bootstrap.min.js"></script>
    <script src="js/common.js"></script>
    <script src="js/confirm.js"></script>
</body>
</html>
