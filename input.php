<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>定期購入設定</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="./css/input.css">    
</head>
<body>
    <div class="container">
        <h1>クレジットカード情報入力画面</h1>
    </div>
    <div class="container">
        <h3>ご注文情報</h3>
        <div class="form-group">
            <label>ID : </label><label id="customerid"><?php echo $_POST['customerid']; ?></label>
        </div>
        <div class="form-group">
            <label>氏名 : </label><label id="name"><?php echo $_POST['name']; ?></label>
        </div>
        <div class="form-group">
            <label>メールアドレス : </label><label id="mail"><?php echo $_POST['mail']; ?></label>
        </div>
        <div class="form-group">
            <label>プラン : </label><label id="planname"><?php echo $_POST['planname']; ?></label>
        </div>
        <input id="planid" type="hidden" value="<?php echo $_POST['planid'];?>">
    </div>
    <div class="container">
        <h2>カード情報入力</h2>
        <div class="card-container">
            <div class="form-group">
                <div class="card-wrapper"></div>
            </div>
            <div class="form-container active form-group">
                <form action="">
                    <input placeholder="カード番号" type="text" name="number">
                    <input placeholder="名義" type="text" name="cardname">
                    <input placeholder="有効期限(月)" type="text" name="exp_month">
                    <input placeholder="有効期限(年)" type="text" name="exp_year">
                    <input placeholder="CVC番号" type="text" name="cvc">
                </form>
            </div>
        </div>
    </div>
    <div class="container">
        <button id="move_confirm_button" type="button" class="btn btn-primary">確認画面へ</button>
        <input id="tokenid" type="hidden" value=""> 
    </div>
    <!-- Optional JavaScript -->
    <script type="text/javascript" src="js/jquery/min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script type="text/javascript" src="js/bootstrap/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/card/dist/jquery.card.js"></script>
    <script type="text/javascript" src="https://js.pay.jp/"></script>
    <script type="text/javascript" src="js/common.js"></script>
    <script type="text/javascript" src="js/input.js"></script>
</body>
</html>
