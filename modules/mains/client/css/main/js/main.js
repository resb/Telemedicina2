$(function(){
  $("#btn-menu-lateral").on("click",function(e){
    e.preventDefault();
    $(this).find("i.fa").toggleClass("open");
    $("nav#main-menu").toggleClass('open');
  });
  $('#select-tabs').on('change', function (e) {
    // With $(this).val(), you can **(and have to!)** specify the target in your <option> values.
    $('#tabs li a').eq($(this).val()).tab('show');
    // If you do not care about the sorting, you can work with $(this).index().
    // $('#the-tab li a').eq($(this).index()).tab('show');
});
})