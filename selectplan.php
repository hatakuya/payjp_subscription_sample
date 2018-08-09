<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>定期購入</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./css/bootstrap/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <h1>プラン選択</h1>
    </div>
    <div class="container">
        選択形式に変更
        <div class="form-group">
            <select id="planSelect" name="plan">
            </select>
        </div>
    </div> 
    <div class="container">
        <div class="form-group">
            <h3>プランお申込</h3>
            <span class="text-muted">
            顧客IDとプランIDを指定して、定期課金を開始することができます。
            trial_endを指定することで、プラン情報を上書きするトライアル設定も可能です。 
            最初の支払いは定期課金作成時に実行されます。課金日(billing_day)が指定されている月次プランの場合は
            日割り設定(prorate)を有効化しない限り、作成時よりもあとの課金日に最初の支払いが行われます。
            </span>
            <div id="cards" class="form-group"></div>
            <button id="move_input_button" type="button" class="btn btn-primary">申込</button>
        </div>
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="js/jquery/min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="js/bootstrap/bootstrap.min.js"></script>
    <script src="js/common.js"></script>
    <script src="js/index.js"></script>
</body>
</html>
