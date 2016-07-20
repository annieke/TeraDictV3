$(document).ready(function () {
	$('input.lang').change(function(e) {
		var target = $(e.target);
		$.post('/set', { param: target.attr('list'), value: target.val(), csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]').val() });
	});

	// panlexQuery('/lv', { lc: "eng", sort: "vc" })
	// .done(function (data) {
	// 	data.result.forEach(function (lv) {
	// 		$('#form').append(lv.uid + ' ' + lv.tt + '<br>');
	// 	});
	// });

	panlexQuery('/ex', { uid: "eng-000", tt: "hi" })
	.done(function (data) {
		data.result.forEach(function (ex) {
			$('#form').append(ex.ex);
		});
	});

	panlexQuery('/ex', { trex: 435977, uid: "cmn-000", include: "trq", sort: "trq desc", limit: 1 })
	.done(function (data) {
		data.result.forEach(function (ex) {
			$('#form').append(ex.tt);
		}); 
	});

});

function panlexQuery(url, data) {
	return $.ajax({
		url: "https://api.panlex.org" + url,
		data: JSON.stringify(data),
		dataType: "json",
		type: "POST"
	});
}

function findTranslation() { 
	var word = $("#word").val();
	var inlang = $("#lang1").val();
	var outlang = $("#lang2").val();
	var translation = translate(word, inlang, outlang);
	$('#result').text(word + " in " + outlang + " is " + translation); 
}

function translate(word, inlang, outlang) {
	var data1 = { uid: inlang, tt: word };
	var wordID; 
	panlexQuery('/ex', data1)
	.done(function (data) {
		data.result.forEach(function (ex) {
			wordID = ex.ex;
		});
	});
	var data2 = { trex: wordID, uid: outlang, include: "trq", sort: "trq desc", limit: 1 }; 
	var translation;
	panlexQuery('/ex', data2)
	.done(function (data) {
		data.result.forEach(function (ex) {
			translation = ex.tt; 
		}); 
	});
	return translation; 
}