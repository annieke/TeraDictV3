$(document).ready(function () {
	$('input.lang').change(function(e) {
		var target = $(e.target);
		$.post('/set', { param: target.attr('list'), value: target.val(), csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]').val() });
	});

	panlexQuery('/lv', { lc: "eng", sort: "vc" })
	.done(function (data) {
		data.result.forEach(function (lv) {
			$('#form').append(lv.uid + ' ' + lv.tt + '<br>');
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