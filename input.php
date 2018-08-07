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
        <h1>お支払情報入力画面</h1>
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
        <h3>お支払情報</h3>
        <p id="danger_area" class="alert"></p>
        <label for="cardname">カード名義</label>
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-user"></i></span>
            </div>
            <input type="text" class="form-control" name="cardname" placeholder="TARO YAMADA" required="">
        </div> <!-- input-group.// -->

        <div class="form-group">
            <label for="number">カード番号</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-credit-card"></i></span>
                </div>
                <input type="text" class="form-control cc-num" name="number" placeholder="XXXX XXXX XXXX XXXX">
            </div> <!-- input-group.// -->
        </div> <!-- form-group.// -->

        <label><span class="hidden-xs">有効期限</span> </label>
        <div class="form-inline">
            <input type="text" class="form-control" name="exp_month" placeholder="MM" style="width:45%;">
            <span style="width:10%; text-align: center"> / </span>
            <input type="text" class="form-control" name="exp_year" placeholder="YYYY" style="width:45%;">
        </div>
        <label data-toggle="tooltip" title="">CVC</label>
        <input class="form-control" style="width:25%" name="cvc" required="" type="text">

    </div>
    <br>
    <div class="container text-center">
        <button id="move_confirm_button" type="button" class="btn btn-primary">確認画面へ</button>
        <input id="tokenid" type="hidden" value=""> 
    </div>
    <!-- Optional JavaScript -->
    <script type="text/javascript" src="js/jquery/min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script type="text/javascript" src="js/bootstrap/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://js.pay.jp/"></script>
    <script type="text/javascript" src="js/jquery-payment/min.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
    <script type="text/javascript" src="js/input.js"></script>
</body>
</html>
