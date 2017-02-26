// 初回読み込み時稼働
$(function(){
// $(document).ready(function(){
// $(window).on('load', function(){
    hsize = $(window).height();
    hsize = hsize - 56;
    // $("#map_canvas").css("height", hsize + "px"); //この高さ指定がないと表示はなされない
    $("#mapid").css("height", hsize + "px"); //この高さ指定がないと表示はなされない
    initialize();
});

$(function(){
// $(window).on('load', function(){
    hsize = $(window).height();
    hsize = hsize - 356;
    $("#play_canvas").css("height", hsize + "px"); //この高さ指定がないと表示はなされない
    initialize_play();
});

$(function(){
    initialize_pop();
});

$(window).on('resize', function(){
    hsize = $(window).height();
    hsize1 = hsize - 56;
    hsize2 = hsize - 356;
    // $("#map_canvas").css("height", hsize1 + "px"); //この高さ指定がないと表示はなされない
    $("#mapid").css("height", hsize1 + "px"); //この高さ指定がないと表示はなされない
    $("#play_canvas").css("height", hsize2 + "px"); //この高さ指定がないと表示はなされない
});


// ２回目以降（pjax遷移）
$.pjax({
    area: '#main'
});

$(document).on('pjax:ready', function () {
// $(document).on('pjax:render', function () {
    hsize = $(window).height();
    hsize = hsize - 56;
    // $("#map_canvas").css("height", hsize + "px"); //initializeを前にしちゃうと、実行途中でこっち読み込んじゃって潰れる
    $("#mapid").css("height", hsize + "px"); //initializeを前にしちゃうと、実行途中でこっち読み込んじゃって潰れる
    initialize();
});

$(document).on('pjax:render', function () {
    hsize = $(window).height();
    hsize = hsize - 356;
    $("#play_canvas").css("height", hsize + "px"); //initializeを前にしちゃうと、実行途中でこっち読み込んじゃって潰れる
    initialize_play();

    // モーダルのbackdrop（グレー背景）を削除
    $('#myModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();    // console.log("あああ")
});