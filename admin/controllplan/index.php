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
        <h1>プランの操作</h1>
    </div>
    <br>
    <div class="container">
        <h3>プラン選択</h3>
        <div class="form-group">
            <select id="planSelect" name="plan"></select><br>
            <span class="text-muted">※未契約のプランは非表示となります。</span>
        </div>
    </div>
    <div class="container">
        <div class="form-group">
            <h3>ご利用停止</h3>
            <span class="text-muted">
            引き落としの失敗やカードが不正である、また定期課金を停止したい場合はこのリクエストで定期購入を停止させます。
            定期課金を停止させると、再開されるまで引き落とし処理は一切行われません。
            </span><br>
            <button id="pause_button" type="button" class="btn btn-primary">停止</button>
        </div>
        <div class="form-group">
            <h3>ご利用再開</h3>
            <span class="text-muted">
            停止もしくはキャンセル状態の定期課金を再開させます。
            </span><br>
            <button id="resume_button" type="button" class="btn btn-primary">再開</button>
        </div>
        <div class="form-group">
            <h3>ご契約キャンセル</h3>
            <span class="text-muted">
            定期課金をキャンセルし、現在の周期の終了日をもって定期課金を終了させます。
            終了日以前であれば、定期課金の再開リクエスト(/resume)を行うことで、 
            キャンセルを取り消すことができます。終了日をむかえた定期課金は、自動的に削除されますのでご注意ください。
            </span><br>
            <button id="cancel_button" type="button" class="btn btn-primary">キャンセル</button>
        </div>
        <div class="form-group">
            <h3>ご契約削除</h3>
            <span class="text-muted">
            定期課金をすぐに削除します。次回以降の課金は行われずに、一度削除した定期課金は、再び戻すことができません。
            </span><br>
            <button id="delete_button" type="button" class="btn btn-primary">削除</button>
        </div>
        <button id="move_previous_button" type="button" class="btn btn-secondary">戻る</button>  
    </div>
    <!-- POST値格納領域 -->
    <div class="container">
        <input type="hidden" id="customerid" value="<?php echo $_POST['customerid']; ?>">
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="/js/jquery/min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="/js/bootstrap/bootstrap.min.js"></script>
    <script src="/js/common.js"></script>
    <script src="/js/admin/controllplan/index.js"></script>
</body>
</html>
