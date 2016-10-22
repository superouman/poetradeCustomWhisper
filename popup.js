function storeTemplate() {
	var template;
  var new_offer_template;

	$("#save_template").on("click", function() {
		template = $("#template").val();
    new_offer_template = $("#new_offer_template").val();
		$("#missing-elements").text("");
		if (checkTemplate(template) === 0) {
			chrome.storage.local.set({"template": template, "new_offer_template": new_offer_template}, function(obj) {
				$("#success-message").fadeIn();
				$("#failure-message").hide();
			});
		} else {
			$("#success-message").hide();
			$("#failure-message").fadeIn();
		}
	});
}

function getTemplate() {
	chrome.storage.local.get("template", function(result) {
		$("#template").text(result.template);
	});
  chrome.storage.local.get("new_offer_template", function(result) {
		$("#new_offer_template").text(result.new_offer_template);
	});
}

function checkTemplate(template) {
	var elements = ["{nickname}", "{item_name}", "{price}", "{league}", "{tab}", "{positionx}", "{positiony}"];
	var checker = 0;
	var pattern;

	for (var i = 0; i < elements.length; i++) {
		pattern = new RegExp(elements[i]);
		console.log(!pattern.test(template));
		if (!pattern.test(template)) {
			$("#missing-elements").append(elements[i] + " ");
			checker = -1;
		}
	}
	return checker;
}

function validityMessage() {

}

window.onload = function() {
	storeTemplate();
  getTemplate();
	validityMessage();
};
