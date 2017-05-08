/**
 * @author Administrator
 */
$("#credit_cardNum").bind("keypress",function(){
	$("#confirmNum").val($(this).val());
});
