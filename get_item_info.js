function GetItemInfo(current_element) {
	var item = current_element.closest(".item");
	var nickname = item.attr("data-ign");
	var item_name = item.attr("data-name");
	var price = item.attr("data-buyout");
	var league = item.attr("data-league");
	var tab = item.attr("data-tab");
	var positionx = item.attr("data-x");
	var positiony = item.attr("data-y");
	if (price === "") {
		price = "undefined price";
	}
	return ({
		nickname: nickname,
		item_name: item_name,
		price: price,
		league: league,
		tab: tab,
		positionx: positionx,
		positiony: positiony
	});
}

function templateReplace(result, template, item_info) {
	template = result.template;
	template = template.replace(/{nickname}/gi, item_info.nickname);
	template = template.replace(/{item_name}/gi, item_info.item_name);
	template = template.replace(/{price}/gi, item_info.price);
	template = template.replace(/{league}/gi, item_info.league);
	template = template.replace(/{tab}/gi, item_info.tab);
	template = template.replace(/{positionx}/gi, item_info.positionx);
	template = template.replace(/{positiony}/gi, item_info.positiony);
	return template;
}

function copyToClipboard(template) {
	$("#copy_box").text(template);
	document.getElementById("copy_box").select();
	document.execCommand("copy");
}

function generateTemplate() {
	$(".whisper-btn").on("click", function() {
		var template;
		var item_info = GetItemInfo($(this));

		chrome.storage.local.get("template", function(result) {
			if (chrome.runtime.lastError) {
				console.log(chrome.runtime.lastError);
				return;
			} else {
				template = templateReplace(result, template, item_info);
				copyToClipboard(template);
			}
		});
	});
}

function generateTemplateOffer() {
	$(".proplist").on("click", ".whisper-btn-new-offer", function() {
		var template;
		var item_info = GetItemInfo($(this));

		chrome.storage.local.get("template", function(result) {
			if (chrome.runtime.lastError) {
				console.log(chrome.runtime.lastError);
				return;
			} else {
				template = templateReplace(result, template, item_info);
				chrome.storage.local.get("new_offer_template", function(result) {
		      if (chrome.runtime.lastError) {
		        console.log(chrome.runtime.lastError);
						return;
		      } else {
		        template = template + result.new_offer_template;
						copyToClipboard(template);
		      }
		    });
			}
		});
		$(this).text("Copied to clipboard");
	});
}

function initialisation() {
		$(".whisper-btn").parent("li").each(function() {
			$(this).after('<li><a href="#" onclick="return false" class="whisper-btn-new-offer"> New Offer</a></li>');
		});
		$("#main").after("<textarea id='copy_box'></textarea>");
		$("#copy_box").css({width: "0px", height: "0px"});
}

generateTemplate();
generateTemplateOffer();
initialisation();
