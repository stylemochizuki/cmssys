<?php
/** @var string データベースの場所 */
define( 'DATABASE' , "data/" );

/**
 * データベース
 *
 * PHP versions 4 and 5
 *
 * @author    望月＠スタイルサーチ<t.mochizuki@stylesearch.jp>
 * @copyright 2013 StyleSearch
 * @version   2.0.0
 * @since     2013/07/30
 */
class Database
{
	/* -- 基本API -- */

	/** @var string データベースの名前 */
	public $name = "";
	/** @var string データベースのパス */
	public $path = "";
	/** @var int 自動番号 */
	public $auto = 1;

	/**
	 * データベース
	 *
	 * @param string データベースの名前
	 */
	public function Database( $name , $path = "" )
	{
		// データベースの名前
		$this->name = $name;
		// データベースのパス
		$this->path = $path . DATABASE . $name;
		// データが存在する
		if ( is_readable( $this->path . ".ini" ) ){
			// 内容の読み込み
			$this->auto = intval( file_get_contents( $this->path . ".ini" ) );
		}
		// 一時ファイルが存在する場合は削除する
		if ( is_readable( $this->path . ".tmp" ) ) unlink( $this->path . ".tmp" );
	}

	/**
	 * データベースの存在を確かめる
	 *
	 * @return boolean 存在する場合は true , 存在しない場合は false
	 */
	public function is()
	{
		return( is_readable( $this->path . ".dat" ) );
	}

	/**
	 * エスケープ処理
	 *
	 * @param string $src エスケープ処置をしたい文字列
	 * @return string エスケープ処置された文字列
	 */
	public function esc( $src )
	{
		return( str_replace( array( '\\' , "'" ) , array( '\\\\' , "\\'" ) , $src ) );
	}

	/**
	 * データの追加
	 *
	 * @param array $data 追加するデータ
	 * @return boolen true:成功時  false:失敗時
	 */
	public function add( $data )
	{
		/* -- 変数 -- */

		$fp = null;     // ファイル
		$add = array(); // 追加するデータ
		$key = "";      // 要素名
		$value = "";    // 要素内容


		/* -- 実行 -- */

		// 一時データがある場合は待機
		while ( is_readable( $this->path . ".tmp" ) ) sleep( 1 );

		// ファイルを開く
		if ( $fp = fopen( $this->path . ".dat" , "ab" ) ) {
			// 追加するデータの作成
			foreach ( $data as $key => $value ) {
				$add[] = $key;
				if ( $value === "AUTO_INSERT" ) $add[] = $this->auto++; else $add[] = $value;
			}
			// CSVとして出力する
			$this->fputcsv( $fp , $add );
			// ファイルを閉じる
			fclose( $fp );

			// 設定ファイルへ書き込み
			file_put_contents( $this->path . ".ini" , $this->auto );
		}
		// ファイルを開けなかった
		else return( false );
	}

	/**
	 * データの編集
	 *
	 * @param array $data  編集するデータ
	 * @param array $where 条件
	 * @return int 更新した件数
	 */
	public function edit( $data , $where = false )
	{
		/* -- 変数 -- */

		$edit = array(); // 編集するデータ
		$tp = null;      // ファイル(一時)
		$fp = null;      // ファイル
		$info = array(); // 情報
		$key = "";       // 要素名
		$value = "";     // 要素内容
		$csv = array();  // CSVデータ
		$num = 0;        // 更新した件数


		/* -- 実行 -- */

		// 一時データがある場合は待機
		while ( is_readable( $this->path . ".tmp" ) ) sleep( 1 );

		// 一時データを開く
		if ( $tp = fopen( $this->path . ".tmp" , "wb" ) ) {
			// ファイルを開く
			if ( $fp = fopen( $this->path . ".dat" , "rb" ) ) {
				// 絞り込みデータの最適化
				if ( $where ) {
					// カラム名の変更
					$where = preg_replace( '/`(\w+)`/' , '\$info[ "$1" ]' , $where );
				}
				// ファイルの内容
				while ( $csv = fgetcsv( $fp ) ) {
					// データの分解
					$info = array();
					while ( list( , $key ) = each( $csv ) ) list( , $info[ $key ] ) = each( $csv );
					// 絞り込み
					if ( isset( $where ) ) {
						// 比較
						if ( eval( 'return( ' . $where . ' );' ) === false ) {
							// 一時データに書き込み
							$this->fputcsv( $tp , $csv );
							// 次のデータ
							continue;
						}
					}
					// データを更新
					foreach ( $data as $key => $value ) $info[ $key ] = $value;
					// 追加するデータの作成
					$edit = array();
					foreach ( $info as $key => $value ) {
						$edit[] = $key;
						$edit[] = $value;
					}
					// 一時データに書き込み
					$this->fputcsv( $tp , $edit );
					// 更新した件数
					++$num;
				}
				// ファイルを閉じる
				fclose( $fp );
			}
			// ファイルを開けなかった
			else return( $num );
			// 一時データを閉じる
			fclose( $tp );

			// ファイルを削除
			unlink( $this->path . ".dat" );
			// リネーム
			rename( $this->path . ".tmp" , $this->path . ".dat" );
		}
		// ファイルを開けなかった
		else return( $num );
		// 成功
		return( $num );
	}

	/**
	 * データの取得
	 *
	 * @param array $param 条件データ
	 * @param int   $total 総データ件数
	 * @return array データ
	 */
	public function get( $param = array() , &$total )
	{
		/* -- 変数 -- */

		$fp = null;      // ファイル
		$data = array(); // データ
		$info = array(); // 情報
		$key = "";       // 要素名
		$value = "";     // 要素内容
		$csv = array();  // CSVデータ
		$total = 0;      // 総データ件数


		/* -- 実行 -- */

		// 一時データがある場合は待機
		while ( is_readable( $this->path . ".tmp" ) ) sleep( 1 );

		// ファイルを開く
		if ( is_readable( $this->path . ".dat" ) && $fp = fopen( $this->path . ".dat" , "rb" ) ) {
			// 絞り込みデータの最適化
			if ( isset( $param[ 'where' ] ) ) {
				// カラム名の変更
				$param[ 'where' ] = preg_replace( '/`(\w+)`/' , '\$info[ "$1" ]' , $param[ 'where' ] );
			}
			// 表示件数の自動制限
			if ( !isset( $param[ 'end' ] ) && !isset( $param[ 'sort' ] ) && !isset( $param[ 'index' ] ) && isset( $param[ 'limit' ] ) ) {
				// 制限を検索上限に変更
				$param[ 'end' ] = $param[ 'limit' ];
				unset( $param[ 'limit' ] );
			}
			// ファイルの内容
			while ( $csv = fgetcsv( $fp ) ) {
				// データの分解
				$info = array();
				while ( list( , $key ) = each( $csv ) ) list( , $info[ $key ] ) = each( $csv );
				// 絞り込み
				if ( isset( $param[ 'where' ] ) ) {
					// 比較
					if ( eval( 'return( ' . $param[ 'where' ] . ' );' ) === false ) continue;
				}
				// 取得データを格納
				$data[] = $info;
				// 総データ件数
				++$total;
				// 絶対件数条件
				if ( isset( $param[ 'end' ] ) && $total === $param[ 'end' ] ) break;
			}
			// ファイルを閉じる
			fclose( $fp );
			// 並び替え
			if ( isset( $param[ 'sort' ] ) ) {
				// 並び替えを初期化
				$this->sort = array();
				// 空白を削除
				$param[ 'sort' ] = str_replace( " " , "" , $param[ 'sort' ] );
				// ","で区切る
				$info = explode( "," , $param[ 'sort' ] );
				foreach ( $info as $value ) {
					// "`"で区切る
					$key = explode( "`" , substr( $value , 1 ) );
					// 要素名
					$this->sort[ $key[ 0 ] ] = ( strtoupper( $key[ 1 ] ) === "DESC" );
				}
				// 並び替える
				usort( $data , array( $this , "sort" ) );
			}
			// 位置
			if ( isset( $param[ 'index' ] ) && $param[ 'index' ] > 0 && $param[ 'index' ] < $total ) {
				$key = 0;
				if ( !is_int( $param[ 'index' ] ) ) $param[ 'index' ] = intval( $param[ 'index' ] );
				foreach ( array_keys( $data ) as $value ) {
					if ( $key++ !== $param[ 'index' ] ) unset( $data[ $value ] ); else break;
				}
			}
			// 制限
			if ( isset( $param[ 'limit' ] ) && $param[ 'limit' ] > 0 && $param[ 'limit' ] < count( $data ) ) {
				$key = 0;
				if ( !is_int( $param[ 'limit' ] ) ) $param[ 'limit' ] = intval( $param[ 'limit' ] );
				foreach ( array_keys( $data ) as $value ) {
					if ( ++$key > $param[ 'limit' ] ) unset( $data[ $value ] );
				}
			}
		}

		// データを返す
		return( $data );
	}

	/**
	 * データの削除
	 *
	 * @param array $where 条件
	 * @return int 削除した件数
	 */
	public function del( $where = false )
	{
		/* -- 変数 -- */

		$tp = null;      // ファイル(一時)
		$fp = null;      // ファイル
		$info = array(); // 情報
		$key = "";       // 要素名
		$csv = array();  // CSVデータ
		$num = 0;        // 更新した件数


		/* -- 実行 -- */

		// 一時データがある場合は待機
		while ( is_readable( $this->path . ".tmp" ) ) sleep( 1 );

		// 一時データを開く
		if ( $tp = fopen( $this->path . ".tmp" , "wb" ) ) {
			// ファイルを開く
			if ( $fp = fopen( $this->path . ".dat" , "rb" ) ) {
				// 絞り込みデータの最適化
				if ( $where ) {
					// カラム名の変更
					$where = preg_replace( '/`(\w+)`/' , '\$info[ "$1" ]' , $where );
				}
				// ファイルの内容
				while ( $csv = fgetcsv( $fp ) ) {
					// データの分解
					$info = array();
					while ( list( , $key ) = each( $csv ) ) list( , $info[ $key ] ) = each( $csv );
					// 絞り込み
					if ( $where ) {
						// 比較
						if ( eval( 'return( ' . $where . ' );' ) === false ) {
							// 一時データに書き込み
							$this->fputcsv( $tp , $csv );
							// 次のデータ
							continue;
						}
					}
					// 削除した件数
					++$num;
				}
				// ファイルを閉じる
				fclose( $fp );
			}
			// ファイルを開けなかった
			else return( $num );
			// 一時データを閉じる
			fclose( $tp );

			// ファイルを削除
			unlink( $this->path . ".dat" );
			// リネーム
			rename( $this->path . ".tmp" , $this->path . ".dat" );
		}
		// ファイルを開けなかった
		else return( $num );
		// 成功
		return( $num );
	}

	/**
	 * 並び替え規則
	 * @param array $base 基準
	 * @param array $comp 比較対象
	 * @return 0:同じ  1:大きい  -1:小さい
	 */
	private function sort( $base , $comp )
	{
		// 展開
		foreach ( $this->sort as $key => $value ) {
			if      ( $base[ $key ] <  $comp[ $key ] ) return( $value ? 1 : -1 );
			else if ( $base[ $key ] != $comp[ $key ] ) return( $value ? -1 : 1 );
		}
		// Equal
		return( 0 );
	}

	/**
	 * ファイルポインタからファイルへCSV出力をする
	 * @param resource $handle ファイルポインター
	 * @return 書き込みデータ数
	 */
	private function fputcsv( &$handle , $data ) {
		// 出力
		$put = "";
		// 展開
		foreach ( $data as $value ) {
			// 一部を除く半角英数字記号以外
			if ( $value !== "" && preg_match( '/^[!#$%&\'()*+\-.\/0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ\[\]^_`abcdefghijklmnopqrstuvwxyz{|}~]+$/' , $value ) === 0 ) {
				// "を退避
				$value = '"' . str_replace( '"' , '""' , $value ) . '"';
			}
			// 出力に足す
			if ( $put !== "" ) $put .= ",";
			$put .= $value;
		}
		// 書き込む
		return( fputs( $handle , $put . "\n" ) );
	}


	/* -- 拡張API -- */

	/**
	 * データの件数を取得
	 *
	 * @param string $where 条件文
	 * @return int 総データ件数
	 */
	public function get_count( $where = "" )
	{
		/* -- 変数 -- */

		$fp = null;      // ファイル
		$info = array(); // 情報
		$key = "";       // 要素名
		$value = "";     // 要素内容
		$csv = array();  // CSVデータ
		$total = 0;      // 総データ件数


		/* -- 実行 -- */

		// 一時データがある場合は待機
		while ( is_readable( $this->path . ".tmp" ) ) sleep( 1 );

		// 出力データの初期化
		$data = array();
		// ファイルを開く
		if ( is_readable( $this->path . ".dat" ) && $fp = fopen( $this->path . ".dat" , "rb" ) ) {
			// 絞り込みデータの最適化
			if ( isset( $where ) ) {
				// カラム名の変更
				$where = preg_replace( '/`(\w+)`/' , '\$info[ "$1" ]' , $where );
			}
			// ファイルの内容
			while ( $csv = fgetcsv( $fp ) ) {
				// データの分解
				$info = array();
				while ( list( , $key ) = each( $csv ) ) list( , $info[ $key ] ) = each( $csv );
				// 絞り込み
				if ( isset( $where ) ) {
					// 比較
					if ( eval( 'return( ' . $where . ' );' ) === false ) continue;
				}
				// 総データ件数
				++$total;
			}
			// ファイルを閉じる
			fclose( $fp );
		}

		// データを返す
		return( $total );
	}

	/**
	 * 1件のデータを取得
	 *
	 * @param array $param 条件データ
	 * @return array データ
	 */
	public function get_line( $param = array() )
	{
		// 1件のみ
		$param[ 'end' ] = 1;
		$data = $this->get( $param );
		// 戻り値
		return( ( isset( $data[ 0 ] ) ? $data[ 0 ] : array() ) );
	}

	/**
	 * 1つのデータを取得
	 *
	 * @param array $param 条件データ
	 * @return array データ
	 */
	public function get_one( $param = array() )
	{
		// 名前指定がない
		if ( empty( $param[ 'name' ] ) ) return( array() );
		// 1件のみ
		$param[ 'end' ] = 1;
		$data = $this->get( $param );
		// 1つのデータ
		return( ( isset( $data[ 0 ] ) ? $data[ 0 ][ $param[ 'name' ] ] : array() ) );
	}
}