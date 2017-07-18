/**
 * 
 */
(function(window, document, version, callback) {
    var j, d;
    var loaded = false;
    if (!(j = window.jQuery) || version > j.fn.jquery || callback(j, loaded)) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://code.jquery.com/jquery-3.2.1.js";
        script.onload = script.onreadystatechange = function() {
            if (!loaded && (!(d = this.readyState) || d == "loaded" || d == "complete")) {
                callback((j = window.jQuery).noConflict(1), loaded = true);
                j(script).remove();
            }
        };
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script);
    }
})(window, document, "3.0", function($, jquery_loaded) {
	$( document ).ready(init);
});



function init($) {

	var elem = $('#dataFutures');
	if (!elem.length) {
		console.log('Not able to find Data Futures embed location');
		return;
	}
	
/*	elem.append("<h1>Value</h1>	\
<ul>	\
	<li class='question' data-data-futures-question='0'>What will my data be used for?</li>	\
	<li class='question' data-data-futures-question='1'>What are the benefits and who will benefit?</li>	\
	<li class='question' data-data-futures-question='2'>Who will be using my data?</li>	\
</ul>	\
<h1>Protections</h1>	\
<ul>	\
	<li class='question' data-data-futures-question='3'>Is my data secure?</li>	\
	<li class='question' data-data-futures-question='4'>Will my data be anonymous?</li>	\
	<li class='question' data-data-futures-question='5'>Can I see and correct data about me?</li>	\
	<li class='question' data-data-futures-question='6'>Could my data be sold?</li>	\
</ul>	\
<h1>Choice</h1>	\
<ul>	\
	<li class='question' data-data-futures-question='7'>Will I be asked for consent?</li>	\
</ul>	\
<div id='answers'></div>	\
		");

*/

	$("ul li.question").on("click", function() {
		console.log('clicked ', $(this).data("dataFuturesQuestion"));
		var index = $(this).data("dataFuturesQuestion");
		console.log('elem',elem);
		console.log('embed',elem.data('embed'));
		var responses = LZString.decompressFromBase64(elem.data('embed'));
		var responseObject = JSON.parse(responses);
		$('#answers').text(responseObject.answers[index].answer);
	});

	$("#dataFuturesEmbed ul.wheel li").on("click", function() {
		var index = $(this).data("dataFuturesQuestion");
		
		var rotate = $(this).css("transform");
		var rotation = getCssRotation($(this)[0]);
		
		var difference = rotation - 90;

		var elements = $("#dataFuturesEmbed ul.wheel li");
		for (var i = 0; i < 8; i++) {
			
			if ($(elements[i]).is(':animated')) {
				continue;
			};
			var currentRotation = getCssRotation(elements[i]);
			if (currentRotation < 1) {
				currentRotation = 360 + currentRotation;
			}
			$(elements[i]).css('border-spacing',currentRotation+'px');  

			if (currentRotation > 360) {
				currentRotation = currentRotation - 360;
				$(elements[i]).css('transform','rotate('+currentRotation+'deg)');  
				$(elements[i]).css('border-spacing',currentRotation+'px');  
			}
			
			
			var newRotation = currentRotation-difference;
			
			if (difference < 0  && newRotation < currentRotation) {
				newRotation = newRotation + 360;
			}  

			if (currentRotation === 360 && newRotation === 0) {
				continue;
			}
			if (currentRotation == newRotation) {
				continue;
			}

			if (newRotation < 0) {
				newRotation = 360 + newRotation;
				$(elements[i]).css('transform','rotate('+(currentRotation+360)+'deg)');  
				$(elements[i]).css('border-spacing',(currentRotation+360)+'px');  
			}

			$(elements[i]).animate({  borderSpacing: newRotation }, {
			    step: function(now,fx) {
			      $(this).css('transform','rotate('+now+'deg)');  
			    },
			    duration:'slow'
			},'linear');
			
			var index = $(this).data("dataFuturesQuestion");
			$('#dataFuturesGuidelinesAnswers').text(answers.answers[index].answer);
			if (answers.answers[index].link) {
				$('#dataFuturesGuidelinesAnswers').append("<p><a href="+answers.answers[index].link+">More info</a></p>");
			}

		}
		
	});
}

var answers = {
		'answers':[
			{
				"answer":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas iaculis nisi quis porttitor venenatis. Vestibulum lobortis nulla massa, id imperdiet libero ullamcorper et. Praesent gravida sit amet odio id commodo. Praesent rutrum ex nisl, non pulvinar purus interdum vitae. Donec tempus ultricies gravida. In in elit imperdiet, egestas tortor consequat, tincidunt mi. Nullam consectetur ex eu nisi ornare, vitae gravida metus rhoncus.",
				"link":"http://www.datafutures.co.nz"
			},
			{
				"answer":"Sed euismod metus dignissim sem molestie mattis. Nunc aliquet molestie lectus, ut vehicula metus pellentesque in. Vestibulum sollicitudin justo viverra nisl suscipit, id faucibus nulla egestas. Morbi diam turpis, tempor in sagittis sed, malesuada sit amet elit. Donec volutpat erat et libero faucibus, eu lobortis mi ultricies. Nullam risus urna, condimentum eget pretium nec, auctor sit amet erat. Nam suscipit, mi nec condimentum mattis, velit elit dapibus sem, ullamcorper tincidunt ex leo sit amet justo."
			},
			{	
				"answer":"Praesent posuere ipsum ac felis malesuada tincidunt. Suspendisse ut risus vel erat maximus accumsan at molestie mauris. Proin id odio eu eros mattis efficitur ac eu urna. Integer nec turpis purus. Mauris a nisi ac arcu faucibus dapibus in a orci. Fusce egestas turpis id neque sagittis molestie. Vestibulum ultrices felis quis libero dictum mattis.",
				"link":"http://www.datafutures.co.nz"
			},
			{
				"answer":"Sed feugiat dictum massa, vel ullamcorper nisi vestibulum eleifend. Pellentesque gravida faucibus massa, vulputate malesuada erat gravida in. Duis vel metus vestibulum, interdum velit pretium, faucibus eros. Aenean metus nulla, pharetra hendrerit turpis eu, bibendum fermentum nunc. Etiam in feugiat arcu. Curabitur scelerisque euismod posuere. Proin quis eros vitae ex efficitur feugiat sit amet nec purus. Vivamus ligula nulla, iaculis sed enim at, consequat tincidunt neque."
			},
			{
				"answer":"Cras iaculis nec risus eu gravida. Vivamus scelerisque mi nec feugiat posuere. Vivamus lacinia viverra orci, sit amet vulputate ipsum pellentesque nec. Donec sagittis est elit, in consequat nisi pharetra ut. Phasellus eget leo placerat, rutrum neque quis, interdum lectus. Vivamus id metus sit amet tortor mattis dapibus. Nunc sed ullamcorper orci. Fusce nec tincidunt lectus, vitae elementum ligula. Sed eu magna arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
			},
			{
				"answer":"Nulla facilisi. Aenean ultricies, risus id pulvinar gravida, metus arcu rutrum tortor, sed auctor velit ante quis diam. Pellentesque elementum imperdiet faucibus. Sed elementum lorem quis mollis ullamcorper. Quisque fermentum ullamcorper euismod. Sed a diam erat. Nunc euismod erat augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam lobortis quam in cursus efficitur. Integer laoreet semper nulla, in euismod turpis tristique nec. Integer facilisis erat eu lectus sodales sollicitudin ut ac tortor. Quisque eget risus magna."
			},
			{
				"answer":"Fusce faucibus, elit a lacinia consequat, metus massa commodo nisi, eu hendrerit metus purus nec sapien. Maecenas maximus id libero sed ultricies. Ut eu venenatis lacus. Sed nulla orci, fringilla ut nulla id, pharetra malesuada mauris. Nullam sed dui auctor, maximus magna sit amet, iaculis felis. Praesent elementum, mi ut lacinia venenatis, diam leo feugiat enim, ac ultrices leo velit quis justo. Vestibulum faucibus cursus diam, ut sollicitudin nisi molestie nec. Duis in dui quis nulla egestas hendrerit sed vel ipsum. Vivamus vestibulum semper consectetur."
			},
			{
				"answer":"Quisque semper dictum orci, vel mattis neque. Quisque tincidunt pellentesque dolor a viverra. Suspendisse ornare pellentesque velit interdum faucibus. Aenean sed orci sed sem pulvinar scelerisque. Mauris urna magna, egestas quis neque id, interdum iaculis justo. Quisque nec rutrum velit. Maecenas turpis ex, rutrum vitae volutpat a, volutpat in elit. Nulla a porta diam, a tincidunt risus. Morbi bibendum ligula nibh, ut porttitor velit pharetra in. Pellentesque urna massa, efficitur vitae arcu rutrum, eleifend tempor ex. Duis dictum magna vel orci luctus, iaculis vestibulum neque semper."
			}
			]
};


function getCssRotation(el) {
	var st = window.getComputedStyle(el, null);
	var tr = st.getPropertyValue("-webkit-transform") ||
	         st.getPropertyValue("-moz-transform") ||
	         st.getPropertyValue("-ms-transform") ||
	         st.getPropertyValue("-o-transform") ||
	         st.getPropertyValue("transform") ||
	         "FAIL";

	// rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix

	if (tr === 'FAIL') {
		return 90;
	}
	
	var values = tr.split('(')[1].split(')')[0].split(',');
	var a = values[0];
	var b = values[1];
	var c = values[2];
	var d = values[3];

	var scale = Math.sqrt(a*a + b*b);

	// arc sin, convert from radians to degrees, round
	var sin = b/scale;

	var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

	return angle;
}


//Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
//This work is free. You can redistribute it and/or modify it
//under the terms of the WTFPL, Version 2
//For more information see LICENSE.txt or http://www.wtfpl.net/
//
//For more information, the home page:
//http://pieroxy.net/blog/pages/lz-string/testing.html
//
//LZ-based compression algorithm, version 1.4.4
var LZString = (function() {

//private property
var f = String.fromCharCode;
var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
var baseReverseDic = {};

function getBaseValue(alphabet, character) {
if (!baseReverseDic[alphabet]) {
 baseReverseDic[alphabet] = {};
 for (var i=0 ; i<alphabet.length ; i++) {
   baseReverseDic[alphabet][alphabet.charAt(i)] = i;
 }
}
return baseReverseDic[alphabet][character];
}

var LZString = {
compressToBase64 : function (input) {
 if (input == null) return "";
 var res = LZString._compress(input, 6, function(a){return keyStrBase64.charAt(a);});
 switch (res.length % 4) { // To produce valid Base64
 default: // When could this happen ?
 case 0 : return res;
 case 1 : return res+"===";
 case 2 : return res+"==";
 case 3 : return res+"=";
 }
},

decompressFromBase64 : function (input) {
 if (input == null) return "";
 if (input == "") return null;
 return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
},

compressToUTF16 : function (input) {
 if (input == null) return "";
 return LZString._compress(input, 15, function(a){return f(a+32);}) + " ";
},

decompressFromUTF16: function (compressed) {
 if (compressed == null) return "";
 if (compressed == "") return null;
 return LZString._decompress(compressed.length, 16384, function(index) { return compressed.charCodeAt(index) - 32; });
},

//compress into uint8array (UCS-2 big endian format)
compressToUint8Array: function (uncompressed) {
 var compressed = LZString.compress(uncompressed);
 var buf=new Uint8Array(compressed.length*2); // 2 bytes per character

 for (var i=0, TotalLen=compressed.length; i<TotalLen; i++) {
   var current_value = compressed.charCodeAt(i);
   buf[i*2] = current_value >>> 8;
   buf[i*2+1] = current_value % 256;
 }
 return buf;
},

//decompress from uint8array (UCS-2 big endian format)
decompressFromUint8Array:function (compressed) {
 if (compressed===null || compressed===undefined){
     return LZString.decompress(compressed);
 } else {
     var buf=new Array(compressed.length/2); // 2 bytes per character
     for (var i=0, TotalLen=buf.length; i<TotalLen; i++) {
       buf[i]=compressed[i*2]*256+compressed[i*2+1];
     }

     var result = [];
     buf.forEach(function (c) {
       result.push(f(c));
     });
     return LZString.decompress(result.join(''));

 }

},


//compress into a string that is already URI encoded
compressToEncodedURIComponent: function (input) {
 if (input == null) return "";
 return LZString._compress(input, 6, function(a){return keyStrUriSafe.charAt(a);});
},

//decompress from an output of compressToEncodedURIComponent
decompressFromEncodedURIComponent:function (input) {
 if (input == null) return "";
 if (input == "") return null;
 input = input.replace(/ /g, "+");
 return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
},

compress: function (uncompressed) {
 return LZString._compress(uncompressed, 16, function(a){return f(a);});
},
_compress: function (uncompressed, bitsPerChar, getCharFromInt) {
 if (uncompressed == null) return "";
 var i, value,
     context_dictionary= {},
     context_dictionaryToCreate= {},
     context_c="",
     context_wc="",
     context_w="",
     context_enlargeIn= 2, // Compensate for the first entry which should not count
     context_dictSize= 3,
     context_numBits= 2,
     context_data=[],
     context_data_val=0,
     context_data_position=0,
     ii;

 for (ii = 0; ii < uncompressed.length; ii += 1) {
   context_c = uncompressed.charAt(ii);
   if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
     context_dictionary[context_c] = context_dictSize++;
     context_dictionaryToCreate[context_c] = true;
   }

   context_wc = context_w + context_c;
   if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
     context_w = context_wc;
   } else {
     if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
       if (context_w.charCodeAt(0)<256) {
         for (i=0 ; i<context_numBits ; i++) {
           context_data_val = (context_data_val << 1);
           if (context_data_position == bitsPerChar-1) {
             context_data_position = 0;
             context_data.push(getCharFromInt(context_data_val));
             context_data_val = 0;
           } else {
             context_data_position++;
           }
         }
         value = context_w.charCodeAt(0);
         for (i=0 ; i<8 ; i++) {
           context_data_val = (context_data_val << 1) | (value&1);
           if (context_data_position == bitsPerChar-1) {
             context_data_position = 0;
             context_data.push(getCharFromInt(context_data_val));
             context_data_val = 0;
           } else {
             context_data_position++;
           }
           value = value >> 1;
         }
       } else {
         value = 1;
         for (i=0 ; i<context_numBits ; i++) {
           context_data_val = (context_data_val << 1) | value;
           if (context_data_position ==bitsPerChar-1) {
             context_data_position = 0;
             context_data.push(getCharFromInt(context_data_val));
             context_data_val = 0;
           } else {
             context_data_position++;
           }
           value = 0;
         }
         value = context_w.charCodeAt(0);
         for (i=0 ; i<16 ; i++) {
           context_data_val = (context_data_val << 1) | (value&1);
           if (context_data_position == bitsPerChar-1) {
             context_data_position = 0;
             context_data.push(getCharFromInt(context_data_val));
             context_data_val = 0;
           } else {
             context_data_position++;
           }
           value = value >> 1;
         }
       }
       context_enlargeIn--;
       if (context_enlargeIn == 0) {
         context_enlargeIn = Math.pow(2, context_numBits);
         context_numBits++;
       }
       delete context_dictionaryToCreate[context_w];
     } else {
       value = context_dictionary[context_w];
       for (i=0 ; i<context_numBits ; i++) {
         context_data_val = (context_data_val << 1) | (value&1);
         if (context_data_position == bitsPerChar-1) {
           context_data_position = 0;
           context_data.push(getCharFromInt(context_data_val));
           context_data_val = 0;
         } else {
           context_data_position++;
         }
         value = value >> 1;
       }


     }
     context_enlargeIn--;
     if (context_enlargeIn == 0) {
       context_enlargeIn = Math.pow(2, context_numBits);
       context_numBits++;
     }
     // Add wc to the dictionary.
     context_dictionary[context_wc] = context_dictSize++;
     context_w = String(context_c);
   }
 }

 // Output the code for w.
 if (context_w !== "") {
   if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
     if (context_w.charCodeAt(0)<256) {
       for (i=0 ; i<context_numBits ; i++) {
         context_data_val = (context_data_val << 1);
         if (context_data_position == bitsPerChar-1) {
           context_data_position = 0;
           context_data.push(getCharFromInt(context_data_val));
           context_data_val = 0;
         } else {
           context_data_position++;
         }
       }
       value = context_w.charCodeAt(0);
       for (i=0 ; i<8 ; i++) {
         context_data_val = (context_data_val << 1) | (value&1);
         if (context_data_position == bitsPerChar-1) {
           context_data_position = 0;
           context_data.push(getCharFromInt(context_data_val));
           context_data_val = 0;
         } else {
           context_data_position++;
         }
         value = value >> 1;
       }
     } else {
       value = 1;
       for (i=0 ; i<context_numBits ; i++) {
         context_data_val = (context_data_val << 1) | value;
         if (context_data_position == bitsPerChar-1) {
           context_data_position = 0;
           context_data.push(getCharFromInt(context_data_val));
           context_data_val = 0;
         } else {
           context_data_position++;
         }
         value = 0;
       }
       value = context_w.charCodeAt(0);
       for (i=0 ; i<16 ; i++) {
         context_data_val = (context_data_val << 1) | (value&1);
         if (context_data_position == bitsPerChar-1) {
           context_data_position = 0;
           context_data.push(getCharFromInt(context_data_val));
           context_data_val = 0;
         } else {
           context_data_position++;
         }
         value = value >> 1;
       }
     }
     context_enlargeIn--;
     if (context_enlargeIn == 0) {
       context_enlargeIn = Math.pow(2, context_numBits);
       context_numBits++;
     }
     delete context_dictionaryToCreate[context_w];
   } else {
     value = context_dictionary[context_w];
     for (i=0 ; i<context_numBits ; i++) {
       context_data_val = (context_data_val << 1) | (value&1);
       if (context_data_position == bitsPerChar-1) {
         context_data_position = 0;
         context_data.push(getCharFromInt(context_data_val));
         context_data_val = 0;
       } else {
         context_data_position++;
       }
       value = value >> 1;
     }


   }
   context_enlargeIn--;
   if (context_enlargeIn == 0) {
     context_enlargeIn = Math.pow(2, context_numBits);
     context_numBits++;
   }
 }

 // Mark the end of the stream
 value = 2;
 for (i=0 ; i<context_numBits ; i++) {
   context_data_val = (context_data_val << 1) | (value&1);
   if (context_data_position == bitsPerChar-1) {
     context_data_position = 0;
     context_data.push(getCharFromInt(context_data_val));
     context_data_val = 0;
   } else {
     context_data_position++;
   }
   value = value >> 1;
 }

 // Flush the last char
 while (true) {
   context_data_val = (context_data_val << 1);
   if (context_data_position == bitsPerChar-1) {
     context_data.push(getCharFromInt(context_data_val));
     break;
   }
   else context_data_position++;
 }
 return context_data.join('');
},

decompress: function (compressed) {
 if (compressed == null) return "";
 if (compressed == "") return null;
 return LZString._decompress(compressed.length, 32768, function(index) { return compressed.charCodeAt(index); });
},

_decompress: function (length, resetValue, getNextValue) {
 var dictionary = [],
     next,
     enlargeIn = 4,
     dictSize = 4,
     numBits = 3,
     entry = "",
     result = [],
     i,
     w,
     bits, resb, maxpower, power,
     c,
     data = {val:getNextValue(0), position:resetValue, index:1};

 for (i = 0; i < 3; i += 1) {
   dictionary[i] = i;
 }

 bits = 0;
 maxpower = Math.pow(2,2);
 power=1;
 while (power!=maxpower) {
   resb = data.val & data.position;
   data.position >>= 1;
   if (data.position == 0) {
     data.position = resetValue;
     data.val = getNextValue(data.index++);
   }
   bits |= (resb>0 ? 1 : 0) * power;
   power <<= 1;
 }

 switch (next = bits) {
   case 0:
       bits = 0;
       maxpower = Math.pow(2,8);
       power=1;
       while (power!=maxpower) {
         resb = data.val & data.position;
         data.position >>= 1;
         if (data.position == 0) {
           data.position = resetValue;
           data.val = getNextValue(data.index++);
         }
         bits |= (resb>0 ? 1 : 0) * power;
         power <<= 1;
       }
     c = f(bits);
     break;
   case 1:
       bits = 0;
       maxpower = Math.pow(2,16);
       power=1;
       while (power!=maxpower) {
         resb = data.val & data.position;
         data.position >>= 1;
         if (data.position == 0) {
           data.position = resetValue;
           data.val = getNextValue(data.index++);
         }
         bits |= (resb>0 ? 1 : 0) * power;
         power <<= 1;
       }
     c = f(bits);
     break;
   case 2:
     return "";
 }
 dictionary[3] = c;
 w = c;
 result.push(c);
 while (true) {
   if (data.index > length) {
     return "";
   }

   bits = 0;
   maxpower = Math.pow(2,numBits);
   power=1;
   while (power!=maxpower) {
     resb = data.val & data.position;
     data.position >>= 1;
     if (data.position == 0) {
       data.position = resetValue;
       data.val = getNextValue(data.index++);
     }
     bits |= (resb>0 ? 1 : 0) * power;
     power <<= 1;
   }

   switch (c = bits) {
     case 0:
       bits = 0;
       maxpower = Math.pow(2,8);
       power=1;
       while (power!=maxpower) {
         resb = data.val & data.position;
         data.position >>= 1;
         if (data.position == 0) {
           data.position = resetValue;
           data.val = getNextValue(data.index++);
         }
         bits |= (resb>0 ? 1 : 0) * power;
         power <<= 1;
       }

       dictionary[dictSize++] = f(bits);
       c = dictSize-1;
       enlargeIn--;
       break;
     case 1:
       bits = 0;
       maxpower = Math.pow(2,16);
       power=1;
       while (power!=maxpower) {
         resb = data.val & data.position;
         data.position >>= 1;
         if (data.position == 0) {
           data.position = resetValue;
           data.val = getNextValue(data.index++);
         }
         bits |= (resb>0 ? 1 : 0) * power;
         power <<= 1;
       }
       dictionary[dictSize++] = f(bits);
       c = dictSize-1;
       enlargeIn--;
       break;
     case 2:
       return result.join('');
   }

   if (enlargeIn == 0) {
     enlargeIn = Math.pow(2, numBits);
     numBits++;
   }

   if (dictionary[c]) {
     entry = dictionary[c];
   } else {
     if (c === dictSize) {
       entry = w + w.charAt(0);
     } else {
       return null;
     }
   }
   result.push(entry);

   // Add w+entry[0] to the dictionary.
   dictionary[dictSize++] = w + entry.charAt(0);
   enlargeIn--;

   w = entry;

   if (enlargeIn == 0) {
     enlargeIn = Math.pow(2, numBits);
     numBits++;
   }

 }
}
};
return LZString;
})();

if (typeof define === 'function' && define.amd) {
define(function () { return LZString; });
} else if( typeof module !== 'undefined' && module != null ) {
module.exports = LZString
} else if( typeof angular !== 'undefined' && angular != null ) {
angular.module('LZString', [])
.factory('LZString', function () {
 return LZString;
});
}