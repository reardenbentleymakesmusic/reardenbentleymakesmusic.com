
$(document).ready(function(){

  $("[id^='songs']").hide();
  
  $("[id^='count']").click(function(){
    let index = $(this).attr('id').substring(5);
    let name = "songs" + index;
    if($("#" + name).is(':visible')) {
      $("#" + name).toggle();
    } else {
      $("[id^='songs']").hide();
      $("#" + name).toggle();
    }
  });
  
});
