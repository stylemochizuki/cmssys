<?php
/* -- インクルード -- */
include_once $_PATH[ 'ROOT' ] . "config.php";

/**
 * OAuth用クラス
 *
 * OAuthで取得したデータから様々な情報を取得する際に使用するクラスです。
 *
 * PHP versions 4 and 5
 *
 * @category  OAuth
 * @package   OAuth Pack
 * @author    望月@スタイルサーチ<t.mochizuki@stylesearch.jp>
 * @copyright 2013 StyleSearch
 * @version   1.0.0
 * @since     2013-04-09
 */
class OAuth
{
	/** @var string Oauth情報のSNS種類 */
	public $oauth = "";
	/** @var string Oauth情報のSNS種類番号 */
	public $type = 0;
	/** @var boolean OAuth接続可能フラグ */
	public $state = false;
	/** @var string トークン */
	public $token = "";
	/** @var string トークン( Secret ) */
	public $secret = "";
	/** @var string アプリID */
	public $appid = "";
	/** @var string アプリキー( Secret ) */
	public $appkey = "";
	/** @var array ユーザー情報 */
	public $user = array();

	/**
	 * コンストラクタ
	 * @param array $param OAuthパラメータ
	 */
	public function OAuth( $param = null )
	{
		// OAuth情報
		if ( $param !== null ) $this->setParam( $param );
	}

	/**
	 * パラメーターの取り込み
	 * @param array $param OAuthパラメータ
	 */
	public function setParam( $param )
	{
		// SNS種類
		if ( isset( $param[ 'oauth' ] ) ) $this->oauth = $param[ 'oauth' ];
		// Access Token
		if ( isset( $param[ 'token' ] ) ) $this->token = $param[ 'token' ];
		if ( isset( $param[ 'oauth_token' ] ) ) $this->token = $param[ 'oauth_token' ];
		if ( isset( $param[ 'access_token' ] ) ) $this->token = $param[ 'access_token' ];
		// Secret
		if ( isset( $param[ 'secret' ] ) ) $this->secret = $param[ 'secret' ];
		if ( isset( $param[ 'oauth_token_secret' ] ) ) $this->secret = $param[ 'oauth_token_secret' ];
		// ID
		if ( isset( $param[ 'uid' ] ) ) $this->user[ 'id' ] = $param[ 'uid' ];
		if ( isset( $param[ 'user_id' ] ) ) $this->user[ 'id' ] = $param[ 'user_id' ];
		// Facebook
		if ( $this->oauth === "facebook" ) {
			$this->type = 0;
			$this->appid = APP_ID_FACEBOOK;
			$this->appkey = APP_SECRET_FACEBOOK;
		}
		// Google+
		else if ( $this->oauth === "googleplus" ) {
			$this->type = 1;
			$this->appid = APP_ID_GOOGLEPLUS;
			$this->appkey = APP_SECRET_GOOGLEPLUS;
		}
		// Twitter
		else if ( $this->oauth === "twitter" ) {
			$this->type = 2;
			$this->appid = APP_ID_TWITTER;
			$this->appkey = APP_SECRET_TWITTER;
		}
		// 接続可能
		if ( $this->token ) $this->state = true;
	}

	/**
	 * ユーザー情報を取得する
	 *  id : SNSのID
	 *  uid : ユーザーID
	 *  email : メール
	 *  name : 名前
	 *  gender : 性別( male:男 , female:女性 )
	 *  link : ユーザーページへのリンク
	 *  image : プロフィールイメージ( API )
	 *  picture : プロフィールイメージ( 本体 )
	 *  origin : 各SNS毎のユーザー情報
	 *
	 * @return array ユーザー情報
	 */
	public function getUser()
	{
		/* -- 変数 -- */

		$text = "";      // テキスト
		$data = array(); // データ


		/* -- 実行 -- */

		// 実行できない
		if ( !$this->state ) return( $data );

		// SNS
		switch ( $this->type ) {
			// Facebook
			case 0 :
				// ユーザー情報
				$text = file_get_contents( "https://graph.facebook.com/me?access_token=" . $this->token );
				if ( $text ) {
					$data = json_decode( $text , true );
					$this->user[ 'id' ] = $data[ 'id' ];
					$this->user[ 'uid' ] = $data[ 'username' ];
					$this->user[ 'email' ] = ( isset( $data[ 'email' ] ) ? $data[ 'email' ] : "" );
					$this->user[ 'name' ] = $data[ 'name' ];
					$this->uset[ 'gender' ] = $data[ 'gender' ];
					$this->uset[ 'link' ] = $data[ 'link' ];
					$this->user[ 'origin' ] = $data;
					// プロフィール画像
					$this->user[ 'image' ] = "https://graph.facebook.com/" . $this->user[ 'id' ] . "/picture?type=large";
					$data = get_headers( $this->user[ 'image' ] );
					foreach ( $data as $key => $value ) if ( stripos( $value , "location" ) === 0 ) break;
					$this->user[ 'picture' ] = substr( $data[ $key ] , strpos( $data[ $key ] , "http" ) );
				}
				break;

			// Google+
			case 1 :
				// ユーザー情報
				$text = file_get_contents( "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" . $this->token );
				if ( $text ) {
					$data = json_decode( $text , true );
					$this->user[ 'id' ] = $data[ 'id' ];
					$this->user[ 'uid' ] = $data[ 'id' ]; // ユーザー名みたいのがない
					$this->user[ 'email' ] = ( isset( $data[ 'email' ] ) ? $data[ 'email' ] : "" );
					$this->user[ 'name' ] = $data[ 'name' ];
					$this->uset[ 'gender' ] = $data[ 'gender' ];
					$this->uset[ 'link' ] = $data[ 'link' ];
					$this->user[ 'origin' ] = $data;
					// プロフィール画像
					$this->user[ 'image' ] = "";
					$this->user[ 'picture' ] = ( isset( $data[ 'picture' ] ) ? $data[ 'picture' ] : "" );
				}
				break;

			// Twitter
			case 2 :
				// ユーザー情報
				$text = file_get_contents( "https://api.twitter.com/1/users/show.json?user_id=" . $this->user[ 'id' ] );
				if ( $text ) {
					$data = json_decode( $text , true );
					$this->user[ 'uid' ] = $data[ 'screen_name' ];
					$this->user[ 'email' ] = ( isset( $data[ 'email' ] ) ? $data[ 'email' ] : "" );
					$this->user[ 'name' ] = $data[ 'name' ];
					$this->uset[ 'gender' ] = ( isset( $data[ 'gender' ] ) ? $data[ 'gender' ] : "" );
					$this->uset[ 'link' ] = "https://twitter.com/" . $this->user[ 'uid' ] . "/";
					$this->user[ 'origin' ] = $data;
					// プロフィール画像
					$this->user[ 'image' ] = "https://api.twitter.com/1/users/profile_image?size=original&user_id=" . $this->user[ 'id' ];
					$data = get_headers( $this->user[ 'image' ] );
					foreach ( $data as $key => $value ) if ( stripos( $value , "location" ) === 0 ) break;
					$this->user[ 'picture' ] = substr( $data[ $key ] , strpos( $data[ $key ] , "http" ) );
				}
				break;
		}

		// ユーザー情報
		return( $this->user );
	}

	/**
	 * SNSへの投稿
	 *
	 * Twitter
	 *   つぶやきのみを ( string )$data に入れてください。
	 *   140文字を超えた場合は140字以降を無視されます。
	 * Facebook
	 *   投稿したいデータ ( array )$data に入れてください。
	 *     name : サイトの名前
	 *     caption : サイトのドメイン
	 *     picture : イメージ
	 *     link : サイトのリンク( "picture"に付くリンク )
	 *     discription : "picture"の説明( or サイトの説明 )
	 *     message : 投稿内容
	 * Google+
	 *   投稿APIが存在していないので未実装
	 *
	 * @param string|array $data 投稿内容
	 * @return array 結果内容
	 */
	function send( $data )
	{
		/* -- 変数 -- */

		$ch = null; // CURL
		$param = array(); // パラメーター
		$info = ""; // 情報用
		$key = ""; // 要素名
		$value = ""; // 要素内容
		$text = ""; // テキスト
		$ret = array(); // 結果


		/* -- 実行 -- */

		// 実行できない
		if ( !$this->state ) return( $param );

		// SNS
		switch ( $this->type ) {
			// Facebook
			case 0 :
				// トークン情報を追加
				$data[ 'access_token' ] = $this->token;
				// URL エンコードされたクエリ文字列にする
				$info = http_build_query( $data );
				// POST送信用データの作成
				$param[ 'http' ] = array(
					'method' => "POST" ,
					'header' => "Content-Type: application/x-www-form-urlencoded\r\n" .
					            "Content-Length: " . strlen( $info ) ,
					'content' => $info
				);
				$text = file_get_contents( "https://graph.facebook.com/me/feed" , false , stream_context_create( $param ) );
				break;

			// Google+
			case 1 :
				// Googleにはない
				break;

			// Twitter
			case 2 :
				// Twitter パラメーター
				$param[ 'oauth_consumer_key' ] = $this->appid; // twitterで取得したConsumer key
				$param[ 'oauth_nonce' ] = md5( uniqid( rand() , true ) ); // ランダムな英数字のみからなる文字列32文字を設定
				$param[ 'oauth_signature_method' ] = "HMAC-SHA1"; // HMAC-SHA1固定
				$param[ 'oauth_timestamp' ] = time(); // いわゆるUNIXタイムスタンプ
				$param[ 'oauth_version' ] = "1.0"; // 1.0固定
				$param[ 'oauth_token' ] = $this->token; // アクセストークン
				$param[ 'status' ] = rawurlencode( $data ); // つぶやきの内容。
				// パラメータ名でソートされていないといけないためソート
				ksort( $param );
				// シグネチャ作成用にパラメータを生成
				$info = "";
				foreach ( $param as $key => $value ) {
					if ( $info !== "" ) $info .="&";
					$info .= $key . "=" . $value;
				}
				// シグネチャの生成
				$info = "POST&" . urlencode( "http://api.twitter.com/1/statuses/update.json" ) . "&" . urlencode( $info );
				$key = urlencode( $this->appkey ) . "&" . urlencode( $this->secret );
				$info = base64_encode( hash_hmac( "sha1" , $info , $key , true ) );
				// シグネチャの設定
				$param[ 'oauth_signature' ] = urlencode( $info );
				// 再度パラメータ名でソート
				ksort( $param );
				// 投稿用パラメータを生成
				$info = "";
				foreach ( $param as $key => $value ) {
					if ( $info !== "" ) $info .= "&";
					$info .= $key . "=" . $value;
				}
				// curl初期化
				$ch = curl_init();
				curl_setopt( $ch , CURLOPT_URL , "http://api.twitter.com/1/statuses/update.json" );
				curl_setopt( $ch , CURLOPT_POST , true ); // POSTでアクセス
				curl_setopt( $ch , CURLOPT_POSTFIELDS , $info );
				curl_setopt( $ch , CURLOPT_HEADER , false );
				curl_setopt( $ch , CURLOPT_RETURNTRANSFER , true ); // 文字列として取得する設定
				// POST実行
				$text = curl_exec( $ch );
				// curl終了
				curl_close( $ch );
				break;
		}

		// 結果内容
		if ( $text ) $ret = json_decode( $text , true );
		return( $ret );
	}
}