function storeTemplate() {
	var template;
  var new_offer_template;

	$("#save_template").on("click", function() {
		template = $("#template").val();
    new_offer_template = $("#new_offer_template").val();
		$("#missing-elements").text("");
		if (checkTemplate(template) === 0) {
			if (!template && !new_offer_template) {
				//Failure message for user here
				console.log('Error: No value specified');
		       return;
			} else {
				chrome.storage.local.set({"template": template, "new_offer_template": new_offer_template}, function(obj) {
					$("#success-message").fadeIn();
					$("#failure-message").hide();
					console.log("template saved");
				});
			}
		} else {
			$("#success-message").hide();
			$("#failure-message").fadeIn();
			console.log("template not saved");
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
			console.log(elements[i] + " is missing!");
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
