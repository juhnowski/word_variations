var transitionTable = [
	["a","A"], 
	["i","I"], 
	["u","U"], 
	["r","R","RR"], 
	["l","lR","lRR"],
	["e", "ai", "o", "au"],
	["h","H"],
	["M","n","N","J","G"],
	["z","S","s"],
	["b","v"],
	["k","kh"],
	["g","gh"],
	["c","ch"],
	["j","jh"],
	["T","Th","t","th"], 
	["D","Dh","d","dh"],
	["p","ph"], 
	["b","bh"],
	["y","r","v"]
]

var searchList;

function doVariant(pref, word) {

	if (pref.length == 0) {
		searchList.push(word);
	}

	if (word.length==0) {
		return;
	 }

	var varChar = getChar(word);

	if (word.length > 1) {
		doVariant(pref + word[0], word.substring(1));	
	}

	transitionTable.forEach(function(variants) {
    	var cases = [];
    	var isExist = false;
    	
    	variants.forEach(function(variant) {
    		if (variant == varChar) {
    			isExist = true;
    		} else {
    			cases.push(variant);
    		}
		});

    	if (isExist == true) {
    		cases.forEach(function(newChar) {
    			var subWord = word.substring(varChar.length);
    			searchList.push(pref + newChar + subWord);
    			if (word.length > 1) {
    				doVariant(pref + newChar, subWord);
    			}
			});
    	}
	});
}

function getChar(word) {
	
	var newChar = "";
	
	transitionTable.forEach(function(variants) {
		variants.forEach(function(variant) {
			var ln = variant.length;	
			if (word.substring(0,ln) == variant) {
				if ( ln > newChar.length) {
					newChar = variant;
				}
			}
		});
	});

	return newChar;
}

function getVariants(word){
	searchList = [];	
	//console.log(word);

	doVariant("",word);

	//console.log(searchList.toString());

	return searchList;
}