var modName = "mods/date_test.js";
var haseuliteMod = "mods/haseulite.js";

if(enabledMods.includes(haseuliteMod)) {
	fakeDate = urlParams.get('fakeDate');
	shortenedTest = (urlParams.get('shortenedTest') !== null);

	loonaObject = {
		"01-02": {member: "Jihyo", color: "rgb(250,200,87)", group: "Twice"},
		"03-02": {member: "Rei and Gong Yubin", color: "linear-gradient(90deg, rgba(105,195,45,1) 0%, rgba(105,195,45,1) 20%, rgba(255,227,226,1) 80%, rgba(255,227,226,1) 100%)", group: "IVE and tripleS", gradient: true},
		"09-02": {member: "Kim Yooyeon", color: "rgb(205,102,171)", group: "tripleS"},
		"21-02": {member: "Leeseo", color: "rgb(255,240,1)", group: "IVE"},
		"10-02": {member: "Kim Lip", color: "rgb(234,2,1)", group: "Loona"},
		"24-03": {member: "Mina", color: "rgb(111,197,194)", group: "Twice"},
		"12-04": {member: "Jeong Hyerin", color: "rgb(142,108,255)", group: "tripleS"},
		"23-04": {member: "Chaeyoung", color: "rgb(255,23,68)", group: "Twice"},
		"24-05": {member: "Yves", color: "rgb(125,0,30)", group: "Loona"},
		"28-05": {member: "Dahyun", color: "rgb(255,255,255)", group: "Twice"},
		"04-06": {member: "Choerry", color: "rgb(92,44,146)", group: "Loona"},
		"13-06": {member: "JinSoul", color: "rgb(20,36,176)", group: "Loona"},
		"14-06": {member: "Tzuyu", color: "rgb(2,119,189)", group: "Twice"},
		"06-08": {member: "Yoon Seoyeon", color: "rgb(34,174,255)", group: "tripleS"},
		"18-08": {member: "HaSeul", color: "rgb(0,166,81)", group: "Loona"},
		"31-08": {member: "Wonyoung", color: "rgb(255,0,30)", group: "IVE"}, //stay mad
		"01-09": {member: "Yujin", color: "rgb(255,57,154)", group: "IVE"},
		"22-09": {member: "Nayeon", color: "rgb(129,212,250)", group: "Twice"},
		"24-09": {member: "Gaeul", color: "rgb(0,85,168)", group: "IVE"},
		"03-10": {member: "Kim Soomin", color: "rgb(236,138,165)", group: "tripleS"},
		"13-10": {member: "Kim Nakyoung", color: "rgb(101,153,164)", group: "tripleS"},
		"19-10": {member: "HeeJin", color: "rgb(255,0,146)", group: "Loona"},
		"20-10": {member: "Chuu", color: "rgb(246,144,126)", group: "Loona"},
		"24-10": {member: "Lee Jiwoo", color: "rgb(255,249,36)", group: "tripleS"},
		"01-11": {member: "Jeongyeon", color: "rgb(188,215,118)", group: "Twice"},
		"09-11": {member: "Momo", color: "rgb(248,207,215)", group: "Twice"},
		"11-11": {member: "YeoJin", color: "rgb(244,111,31)", group: "Loona"},
		"13-11": {member: "Olivia Hye", color: "rgb(143,143,143)", group: "Loona"},
		"15-11": {member: "HyunJin", color: "rgb(255,204,0)", group: "Loona"},
		"19-11": {member: "Go Won", color: "rgb(48,195,156)", group: "Loona"},
		"21-11": {member: "Liz", color: "rgb(0,195,245)", group: "IVE"},
		"04-12": {member: "Kim Chaeyeon", color: "rgb(141,191,65)", group: "tripleS"},
		"09-12": {member: "ViVi", color: "rgb(255,152,180)", group: "Loona"},
		"20-12": {member: "Kaede", color: "rgb(255,201,53)", group: "tripleS"},
		"29-12": {member: "Sana", color: "rgb(159,168,218)", group: "Twice"}
	};

	var february10Override = false;

	function getDayMonth() {
		var d = february10Override ? new Date(1549800000000) : new Date();
		var month = (d.getMonth()+1).toString();
		if(month.length == 1) { month = "0" + month };
		var day = d.getDate().toString();
		if(day.length == 1) { day = "0" + day };
		var dayMonth = day + "-" + month;
		return (fakeDate === null ? dayMonth : fakeDate);
	}

	function registerElemClick(name) {
		var fakeDateMessage = "";
		if(fakeDate !== null) {
			fakeDateMessage += "(Fake date) ";
		};
		var shortenedTestMessage = "";
		if(shortenedTest) {
			shortenedTestMessage += "(Shortened to 2) ";
		};
		if(clickedElements[name] === false) {
			clickedElements[name] = true;
		};
		if(evaluateTheClickedElements()) {
			var dayMonth = getDayMonth();
			var memberMessage = loonaObject[dayMonth];
			if(memberMessage == undefined) { memberMessage = "[No such member?]" };
			if(typeof(memberMessage) === "object") {
				memberMessage = memberMessage.member;
			};
alert(`You have clicked on all ${Object.keys(clickedElements).length} birthday messages spread throughout some of the elements.
Member: ${fakeDateMessage}${shortenedTestMessage}${memberMessage}. Stan ${loonaObject[getDayMonth()].group}!`);
		};
	};

	function evaluateTheClickedElements() {
		var done = true;
		for(element in clickedElements) {
			done = done && clickedElements[element];
		};
		return done;
	};

	function highlightButton(element,color,blurRadius="15px",spreadRadius="5px") {
		var button = document.getElementById(`elementButton-${element}`);
		if(button == null) {
			throw new Error(`Nonexistent button for ${element}`)
		};
		if(typeof(blurRadius) == "number") { blurRadius = blurRadius + "px" };
		if(typeof(spreadRadius) == "number") { spreadRadius = spreadRadius + "px" };
		document.getElementById(`elementButton-${element}`).style["-webkit-box-shadow"] = `0px 0px ${blurRadius} ${spreadRadius} ${color}`;
		document.getElementById(`elementButton-${element}`).style["box-shadow"] = `0px 0px ${blurRadius} ${spreadRadius} ${color}`;
	};

	runAfterAutogen(function() {
		
		changingDescElements = ["distance_display","find_toggle","prop","number_adjuster","replace","alt_replace","alt_alt_replace","change","alt_change","alt_alt_change"];

		blacklist = ["toxin","poison","blood","cancer","rotten_meat","frozen_rotten_meat","zombie_blood","plague","stench","infection","acid","acid_gas","rot","shit","shit_gravel","poo","dioxin","lean"];

		dayMonth = getDayMonth();
		
		var baseArray = ["heejinite","heejinite_powder","molten_heejinite","heejinite_gas","haseulite","haseulite_powder","molten_haseulite","haseulite_gas","jinsoulite","jinsoulite_powder","molten_jinsoulite","jinsoulite_gas","haseulite_vent","loona","loona_gravel","molten_loona"];

		if(loonaObject[dayMonth]) {
			randomElements = Object.keys(elements).filter(function(e) {
				var cat = elements[e].category;
				if(cat == undefined) { cat = "other" };
				cat = cat.toLowerCase();
				return (
					cat !== "clouds" &&
					cat !== "auto creepers" &&
					cat !== "auto_bombs" &&
					cat !== "auto_fey" &&
					cat !== "spouts" &&
					cat !== "singularities" &&
					cat !== "random" &&
					cat !== "weapons" &&
					cat !== "idk" &&
					cat !== "corruption" &&
					cat !== "radioactive" &&
					cat !== "piss" &&
					cat !== "shit" &&
					cat !== "vomit" &&
					cat !== "cum" &&
					!e.includes("head") &&
					(!e.includes("body") || e.includes("antibody")) &&
					!cat.includes("random") &&
					!cat.includes("udstone") &&
					!elements[e].nocheer &&
					!changingDescElements.includes(e) &&
					!blacklist.includes(e) &&
					!elements[e].hidden && 
					!baseArray.includes(e)
				);
			}); shuffleArray(randomElements); randomElements = randomElements.slice(0,shortenedTest ? 2 : 12);

			clickedElements = {};
			for(i = 0; i < randomElements.length; i++) {
				var elemName = randomElements[i];
				clickedElements[elemName] = false;
			};

			runAfterButtons(function() {
				var elems = Object.keys(clickedElements);
				for(j = 0; j < elems.length; j++) {
					var name = elems[j];
					var color = loonaObject[dayMonth].color;
					if(data.gradient) {
						color = "rgb(255,255,255)";
					};
					//console.log(name);
					//console.log(color);
					highlightButton(name,color,7,2);
				};
			});
			
			var funnyElements = ["heejinite","heejinite_powder","molten_heejinite","heejinite_gas","haseulite","haseulite_powder","molten_haseulite","haseulite_gas","jinsoulite","jinsoulite_powder","molten_jinsoulite","jinsoulite_gas","haseulite_vent","loona","loona_gravel","molten_loona"].concat(randomElements);

			var data = loonaObject[dayMonth];
			for(ya = 0; ya < funnyElements.length; ya++) {
				var elemName = funnyElements[ya];
				var info = elements[elemName];
				var loonaTheHTML = null;
				if(baseArray.includes(elemName)) {
					loonaTheHTML = `<span style="${data.gradient ? ('background: ' + data.color + '; background-clip: text; -webkit-background-clip: text; text-fill-color: transparent; -webkit-text-fill-color: transparent;') : ('color:' + data.color)}">Happy birthday, ${data.member}!</span>`;
				} else {
					loonaTheHTML = `<em style="${data.gradient ? ('background: ' + data.color + '; background-clip: text; -webkit-background-clip: text; text-fill-color: transparent; -webkit-text-fill-color: transparent;') : ('color:' + data.color)}" onclick=registerElemClick("${elemName}")>Happy birthday, ${data.member}!</em>`
				};
				if(typeof(info.desc) === "undefined") {
					info.desc = loonaTheHTML
				} else if(typeof(info.desc) === "string") {
					info.desc += ("<br/>" + loonaTheHTML);
				};
			};
		};
		
	});
} else {
	if(!enabledMods.includes(haseuliteMod))	{ enabledMods.splice(enabledMods.indexOf(modName),0,haseuliteMod) };
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The "${haseuliteMod}" mod is required and has been automatically inserted (reload for this to take effect).`)
};