<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>TOPページ</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./css/bootstrap/bootstrap.min.css">
</head>
<body>
    <div class="container"  style="margin-bottom:10px;">
        <h2>ユーザ検索</h2>
        <div class="form-group">
            <input name="userid" type="number" class="form-control" value="">
        </div>
        <button id="search_customer_button" type="button" class="btn btn-primary">検索</button>
    </div>
    <br>
    <div class="container">
        <h3>検索結果</h3>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">メールアドレス</th>
                    <th scope="col">有料会員区分</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody id="users-table">
            </tbody>
        </table>
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