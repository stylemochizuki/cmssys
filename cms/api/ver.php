<?php
/**
 * PHPバージョン差異による関数の緩衝
 *
 * PHPバージョンによって存在していない関数を再現します。
 * 使用しているPHPによっては存在する関数が記述されている可能性があります。
 * 存在する関数に関してはPHP関数を使用するようになっています。
 * PHP関数によってはバージョンにより差異が出る事もあるので絶対の信用は危険です。
 *
 * PHP Versions 4 or 5
 *
 * @author    望月＠スタイルサーチ<t.mochizuki@stylesearch.jp>
 * @copyright 2012 StyleSearch
 * @version   1.0.0
 * @since     2012/10/11
 **/

if ( !function_exists( "str_getcsv" ) ) {
	/**
	 * CSV 文字列をパースして配列に格納する
	 *
	 * @param string $input     パースする文字列。
	 * @param string $delimiter フィールド区切り文字 (1 文字のみ)。
	 * @param string $enclosure フィールド囲み文字 (1 文字のみ)。
	 * @return array  読み込んだフィールドの内容を配列で返します。失敗時は false を返します。
	 */
	function str_getcsv( $input , $delimiter = ',' , $enclosure = '"' , $escape = "\\" )
	{
		/* -- 変数 -- */

		$i = 0;            // ループ用
		$encircle = false; // フィールド囲み文字
		$escflg = 0;       // 処理飛ばし数
		$dechar = true;    // 登録文字の判定
		$depth = 0;        // 深さ
		$split = array();  // 区切られた文字


		/* -- 実行 -- */

		// 1文字づつ
		for ( $i = 0 ; $i < strlen( $input ) ; $i++ ) {
			// 登録判定の初期化
			$dechar = true;
			// エスケープ文字
			if ( $input[ $i ] == $escape && $escflg == 0 ) $escflg = 2;
			// 処理飛ばしがない
			if ( $escflg == 0 ) {
				// フィールド囲み文字開始判定
				if ( $input[ $i ] == $enclosure ) $encircle = !$encircle;
				// 囲み判定がない
				if ( $encircle == false ) {
					// 区切り文字判定
					if ( $input[ $i ] == $delimiter ) {
						// 次へ
						$depth++;
						// 区切り文字は登録しない
						$dechar = false;
					}
				}
			}
			// 文字の登録
			if ( $dechar ) $split[ $depth ] .= $input[ $i ];
			// 処理飛ばし
			if ( $escflg > 0 ) $escflg--;
		}

		// 結果を返す
		return( ( array )$split );
	}
}

// PHP終了タグで閉じられないのは故意に行っています。
// 閉じない事で無駄な改行を出力させないようにしています。
