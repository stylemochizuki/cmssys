<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8">
	<title>ログイン｜CMS(カスタム・マネジメント・システム)</title>
	<base href="<?php echo $_URL[ 'ROOT' ]; ?>">
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<script src="js/jquery-1.8.3.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
</head>
<body>
<div class="container" style="padding-top: 40px">
	<div class="hero-unit">
		<div class="row-fluid">
			<!-- ▽ タイトル ▽ -->
			<div class="span9" style="border-right:1px solid #ddd">
				<h3>カスタム・マネジメント・システム</h3>
				<h1>CMS</h1>
				<p style="margin-top: 1em">
					CMS(カスタム・マネジメント・システム)のログイン画面です。<br>
					アカウントがない方は新規作成からアカウントを作成してください。
				</p>
				<!-- a href="acount-new/" class="btn btn-primary btn-large"><i class="icon-pencil icon-white"></i> 新規作成</a -->
				<a href="reminde/" class="btn btn-info btn-large"><i class="icon-question-sign icon-white"></i> 忘れた方はこちら</a>
			</div>
			<!-- △ タイトル △ -->
	
			<!-- ▽ ログイン ▽ -->
			<div class="span3">
				<h4>ログイン</h4>
				<form action="<?php echo $_URL[ 'MY' ]; ?>" method="post">
					<input type="text" name="id" value="<?php echo html4( $id ); ?>" placeholder="ユーザーID" required>
					<input type="password" name="password" value="<?php echo html4( $password ); ?>" placeholder="パスワード">
					<label class="checkbox"><input type="checkbox" name="checked" value="1"<?php if ( $checked ) echo " checked"; ?>> ログイン状態を記憶</label>
					<button class="btn btn-success"><i class="icon-user icon-white"></i> ログイン</button>
				</form>
<?php if ( $error ) : // Error -> ?>
				<div class="alert alert-error">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					<small>IDまたはパスワードが違います</small>
				</div>
<?php endif; // <- Error ?>
			</div>
			<!-- △ ログイン △ -->
		</div>
	</div>
</div>
</body>
</html>
