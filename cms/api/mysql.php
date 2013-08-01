<?php
/**
 * デフォルトのログ保存パスを設定します。
 *
 * 特に指定が無い場合の設定になります。
 * 保存パスは絶対パスが望ましいです。( ※相対パスでも動作はします。 )
 * < ... > の間は date での文字列フォーマットが適応されます。
 * ファイル名として < , > は使用できませんのでご注意ください。
 * また、個別で保存パスを指定する場合もこの命名規則は適応されます。
 *
 * @var string ログ保存パス
 */
define( "MYSQL_LOG_PATH" , dirname( dirname( __FILE__ ) ) . "/admin/log/<Y-m-d>.dat" ); // "api"の一つ上から

/**
 * MySQLクラス
 *
 * MySQLiに拡張を施したクラスです。
 * MySQLi命令はPHP APIを見てください。
 *
 * PHP versions 5
 *
 * @category  MySQL Extend
 * @package   MySQL Extend Seting
 * @author    望月@スタイルサーチ
 * @copyright 2013 - StyleSearch
 * @version   1.0.0
 * @since     2013-03-19
 */
class mysqlExt extends mysqli
{
	/** @var string ログ保存パス */
	public $logPath = array( 'default' => MYSQL_LOG_PATH );

	/**
	 * ログ保存パスの設定
	 *
	 * @param string $path ログ保存パス
	 * @param string $name 要素名( 指定しない場合はデフォルトを変更 )
	 */
	function setLogPath( $path , $name = "default" ) { $this->logPath[ $name ] = $path; }

	/**
	 * ログ保存パスの削除
	 *
	 * @param string $name 要素名( 指定しない場合はデフォルトを変更 )
	 */
	function delLogPath( $name ) { if ( isset( $this->logPath[ $name ] ) ) unset( $this->logPath[ $name ] ); }

	/**
	 * ログ保存パス情報を取得
	 *
	 * @param string $name 要素名( 指定しない場合は全てパス情報 )
	 * @return string|array ログ保存パス情報　 $name を指定した場合はその名前のパス設定
	 */
	function getLogPath( $name = "" ) { if ( $name === "" || empty( $this->logPath[ $name ] ) ) return( $this->logPath ); else return( $this->logPath[ $name ] ); }

	/**
	 * SQL文で使用する文字列の特殊文字をエスケープする( mysqli::real_escape_string のエイリアス )
	 *
	 * @param string $escapestr エスケープする文字列。
	 * @return string エスケープ済みの文字列を返します。
	 */
	function esc( $escapestr ) { return( $this->real_escape_string( $escapestr ) ); }

	/**
	 * クエリ結果を連想配列で取得します。
	 *
	 * 一行づつ読み込みしながら処理する際は mysqli_result::fetch_assoc を使用してください。
	 *
	 * @param string $query クエリ文
	 * @param int $index 出力を開始する行番号。0の場合は最初から格納します。( 省略:0 )
	 * @param int $limit 出力する行数。0の場合はすべてを配列に格納します。( 省略:0 )
	 * @return array 連想配列にしたクエリ結果を返します。結果がない、エラーの場合は空の array を返します。
	 */
	function query_assoc( $query , $index = 0 , $limit = 0 )
	{
		/* -- 変数 -- */

		$assoc = array(); // 出力用の連想配列
		$result = null;   // クエリ結果
		$data = array();  // クエリ結果(一行)


		/* -- 実行 -- */

		// クエリ文を実行する
		$result = $this->query( $query );
		// 結果値が空ではない場合は全て取得する
		if ( $result !== false && $result->num_rows > $index ) {
			// 出力位置
			if ( $index !== 0 ) $result->data_seek( $index );
			// クエリ結果
			while ( $data = $result->fetch_assoc() ) {
				// 結果を配列に格納
				$assoc[] = $data;
				// 出力数
				if ( $limit !== 0 && --$limit === 0 ) break;
			}
		}

		// クエリ結果を返す
		return( $assoc );
	}

	/**
	 * 一行のクエリ結果を連想配列で取得します。
	 *
	 * @param string $query クエリ文
	 * @param int $line 出力する行番号。( 省略:0 )
	 * @return array 連想配列にしたクエリ結果を返します。結果がない、エラーの場合は空の array を返します。
	 */
	function query_assoc_one( $query , $line = 0 )
	{
		/* -- 変数 -- */

		$assoc = array(); // 出力用の連想配列
		$result = null;   // クエリ結果
		$data = array();  // クエリ結果(一行)


		/* -- 実行 -- */

		// クエリ文を実行する
		$result = $this->query( $query );
		// 結果値が空ではない場合は全て取得する
		if ( $result !== false && $result->num_rows > $line ) {
			// 出力位置
			if ( $line !== 0 ) $result->data_seek( $line );
			// クエリ結果
			$assoc = $result->fetch_assoc();
		}

		// クエリ結果を返す
		return( $assoc );
	}

	/**
	 * クエリ結果を数値添字配列で取得します。
	 *
	 * 一行づつ読み込みしながら処理する際は mysqli_result::fetch_row を使用してください。
	 *
	 * @param string $query クエリ文
	 * @param int $index 出力を開始する行番号。0の場合は最初から格納します。( 省略:0 )
	 * @param int $limit 出力する行数。0の場合はすべてを配列に格納します。( 省略:0 )
	 * @return array 数値添字配列にしたクエリ結果を返します。結果がない、エラーの場合は空の array を返します。
	 */
	function query_row( $query , $index = 0 , $limit = 0 )
	{
		/* -- 変数 -- */

		$row = array();  // 出力用の数値添字配列
		$result = null;  // クエリ結果
		$data = array(); // クエリ結果(一行)


		/* -- 実行 -- */

		// クエリ文を実行する
		$result = $this->query( $query );
		// 結果値が空ではない場合は全て取得する
		if ( $result !== false && $result->num_rows !== 0 ) {
			// 出力位置
			if ( $index !== 0 ) $result->data_seek( $index );
			// クエリ結果
			while ( $data = $result->fetch_row() ) {
				// 結果を配列に格納
				$row[] = $data;
				// 出力数
				if ( $limit !== 0 && --$limit === 0 ) break;
			}
		}

		// クエリ結果を返す
		return( $row );
	}

	/**
	 * 一行のクエリ結果を数値添字配列で取得します。
	 *
	 * @param string $query クエリ文
	 * @param int $line 出力する行番号。( 省略:0 )
	 * @return array 数値添字配列にしたクエリ結果を返します。結果がない、エラーの場合は空の array を返します。
	 */
	function query_row_one( $query , $line = 0 )
	{
		/* -- 変数 -- */

		$row = array();  // 出力用の数値添字配列
		$result = null;  // クエリ結果
		$data = array(); // クエリ結果(一行)


		/* -- 実行 -- */

		// クエリ文を実行する
		$result = $this->query( $query );
		// 結果値が空ではない場合は全て取得する
		if ( $result !== false && $result->num_rows > $line ) {
			// 出力位置
			if ( $line !== 0 ) $result->fetch_row( $line );
			// クエリ結果
			$row = $result->fetch_assoc();
		}

		// クエリ結果を返す
		return( $row );
	}

	/**
	 * 指定した1項目のクエリ結果を取得します。
	 *
	 * @param string $query クエリ文
	 * @param int $line 出力する行番号。( 省略:0 )
	 * @param int $index 出力する項目番号。( 省略:0 )
	 * @return mixed 指定した1項目のクエリ結果を返します。結果がない、エラーの場合は空の null を返します。
	 */
	function query_one( $query , $line = 0 , $index = 0 )
	{
		/* -- 変数 -- */

		$row = array();  // 出力用の数値添字配列
		$result = null;  // クエリ結果
		$data = array(); // クエリ結果(一行)


		/* -- 実行 -- */

		// クエリ文を実行する
		$result = $this->query( $query );
		// 結果値が空ではない場合は全て取得する
		if ( $result !== false && $result->num_rows !== 0 && $result->field_count > $index ) {
			// クエリ結果
			$row = $result->fetch_row();
			// 指定項目
			return( $row[ $index ] );
		}

		// 空を返す
		return( null );
	}

	/**
	 * クエリ実行で書き込み処理した場合はログに保存します。
	 *
	 * @param string $query クエリ文
	 * @param string $user 実行ユーザー名
	 * @param int $time 書き込みUNIXタイムスタンプ(指定なしの場合は現在)
	 * @return mixed クエリ結果を返します。
	 */
	function query_write( $query , $user = "" , $time = 0 )
	{
		/* -- 変数 -- */

		$result = null;   // クエリ結果
		$affected = 0;    // 適応された数
		$path = "";       // 保存パス
		$match = array(); // 正規表現


		/* -- 実行 -- */

		// クエリ文を実行
		$result = $this->query( $query );
		// 変更がある
		if ( $this->affected_rows > 0 && stripos( trim( $query ) , "SELECT" ) !== 0 ) {
			// 時間
			if ( $time === 0 ) $time = time();
			// ログ保存
			foreach ( $this->logPath as $path ) {
				// ファイル名を作成
				while ( preg_match( '/<([^>]+)>/' , $path , $match ) === 1 ) {
					$path = str_replace( $match[ 0 ] , date( $match[ 1 ] , $time ) , $path );
				}
				// クエリ文をログに書き込む
				if ( $fp = fopen( $path , "ab+" ) ) {
					fputcsv( $fp , array( $user , $query , date( "Y-m-d H:i:s" , $time ) ) );
					fclose( $fp );
				}
			}
		}
		// クエリ結果を返す
		return( $result );
	}
}
