<?php
/**
 * ショートカット関数ファイル
 *
 * 定義名が長過ぎる、毎回同じ設定をして無駄に引数をつらつら書く
 * そんなお悩みを解決すべく、短縮用の関数群ファイルを作りました！
 * 全体的に使用する関数をここで短い名前で書く事で便利にします。
 *
 * PHP 5.1 以上
 *
 * @category Short
 * @package  Short Function
 * @author   望月@スタイルサーチ
 * @category 2013 - StyleSearch
 * @version  1.0.1
 * @since    2013-02-15
 */

/**
 * htmlentities — 特殊文字を HTML エンティティに変換する( HTML 4.01 )
 * @param string $string 変換される文字列
 * @return string 変換後の文字列を返します。
 */
function html4( $string ) { return( htmlentities( $string , ENT_QUOTES | ENT_HTML401 , CHAR_CODE ) ); }

/**
 * htmlentities — 特殊文字を HTML エンティティに変換する( XHTML )
 * @param string $string 変換される文字列
 * @return string 変換後の文字列を返します。
 */
function htmlX( $string ) { return( htmlentities( $string , ENT_QUOTES | ENT_XHTML , CHAR_CODE ) ); }

/**
 * htmlentities — 特殊文字を HTML エンティティに変換する( HTML 5 )
 * @param string $string 変換される文字列
 * @return string 変換後の文字列を返します。
 */
function html5( $string ) { return( htmlentities( $string , ENT_QUOTES | ENT_HTML5 , CHAR_CODE ) ); }

/**
 * urlencode — 文字列を URL エンコードする
 * @param string $string エンコードする文字列
 * @return string URL エンコードされた文字列
 */
function url( $string ) { return( urlencode( $string ) ); }

/**
 * number_format — 数字を千位毎にグループ化してフォーマットする
 * @param float $number フォーマットする数値
 * @return string number をフォーマットした結果を返します。
 */
function num( $number ) { return( number_format( $number ) ); }
