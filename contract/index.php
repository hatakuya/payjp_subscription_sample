<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>定期購入</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/css/bootstrap/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <h2>プラン選択</h2>
        <div class="form-group">
            <select id="planSelect" name="plan"></select><br>
            <span class="text-muted">※すでに契約済みのプランは非表示となります。</span>
        </div>
    </div>
    <div class="container">
        <h2>支払い方法選択</h2>
    </div>
    <div class="container">
        <h3>PayJP</h3>
        <div class="container">
            <div id="cards" class="form-group"></div>
        </div>
    </div>
    <div class="container" style="margin-top:20px;">
        <button id="move_previous_button" type="button" class="btn btn-secondary">戻る</button>        
        <button id="apply_subscription_button" type="button" class="btn btn-primary">お申し込み</button>
    </div>
    <hr>
    <div class="container"  style="margin-top:20px;">
        <h3>プラン一覧</h3>
        <div id="planList" class="form-group"></div>
    </div>
    <div class="container" style="margin-top:20px;">
        <h4 class="text-muted">定期課金開始について</h4>
        <span class="text-muted">
            顧客IDとプランIDを指定して、定期課金を開始することができます。
            trial_endを指定することで、プラン情報を上書きするトライアル設定も可能です。 
            最初の支払いは定期課金作成時に実行されます。課金日(billing_day)が指定されている月次プランの場合は
            日割り設定(prorate)を有効化しない限り、作成時よりもあとの課金日に最初の支払いが行われます。
        </span>
    </div>
    <div class="container">
        <input type="hidden" id="userid" value="<?php echo $_POST['userid']; ?>">
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="/js/jquery/min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="/js/bootstrap/bootstrap.min.js"></script>
    <script src="/js/common.js"></script>
    <script src="/js/contract/index.js"></script>
</body>
</html>
