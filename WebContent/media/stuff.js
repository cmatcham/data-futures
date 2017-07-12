/*<!DOCTYPE html>

<html>

<head>

<script src="media/lz-string.js"></script>

<meta charset="UTF-8">

<title>Insert title here</title>

</head>

<body>

<p>CSS, canvas, or image??</p>

<p>Must be image-mappable to handle onclick event. Or have vanilla html for on click</p>

<h2>Value</h2>

<ul>

<li class="question" data-data-futures-question="0">What will my data be used for?</li>

<li class="question" data-data-futures-question="1">What are the benefits and who will benefit?</li>

<li class="question" data-data-futures-question="2">Who will be using my data?</li>

</ul>

<h2>Protections</h2>

<ul>

<li class="question" data-data-futures-question="3">Is my data secure?</li>

<li class="question" data-data-futures-question="4">Will my data be anonymous?</li>

<li class="question" data-data-futures-question="5">Can I see and correct data about me?</li>

<li class="question" data-data-futures-question="6">Could my data be sold?</li>


</ul>

<h2>

Choice

</h2>

<ul>

<li class="question" data-data-futures-question="7">

Will I be asked for consent?

</li>

</ul>  



<div id="answers">



</div>



<script>

(function(window, document, version, callback) {

    var j, d;

    var loaded = false;

    if (!(j = window.jQuery) || version > j.fn.jquery || callback(j, loaded)) {

        var script = document.createElement("script");

        script.type = "text/javascript";

        script.src = "media/jquery-3.2.1.js";

        script.onload = script.onreadystatechange = function() {

            if (!loaded && (!(d = this.readyState) || d == "loaded" || d == "complete")) {

                callback((j = window.jQuery).noConflict(1), loaded = true);

                j(script).remove();

            }

        };

        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script);

    }

})(window, document, "3.0", function($, jquery_loaded) {

console.log('in here, should have a version of jquery.');

console.log(jquery_loaded);

console.log($);


$( document ).ready(init);


});



function init($) {

console.log('initing');

console.log($);

$("ul li.question").on("click", function() {

console.log('clicked ', $(this).data("dataFuturesQuestion"));

var index = $(this).data("dataFuturesQuestion");

$('#answers').text(object.answers[index].answer);

});

}



var answers = {

'answers':[

{

answer:'Data is used to make us a lot of profit',

moreInfo:'http://www.standards.co.nz'

},

{

answer:'The benefits to you are that we will make lots of money',

moreInfo:'http://www.standards.co.nz'

},

{

answer:'We will be using your data',

moreInfo:'http://www.standards.co.nz'

},



]

}



var answers = JSON.stringify(answers);

var encoded = LZString.compressToBase64(answers);

console.log('encoded',encoded);

var decoded = LZString.decompressFromBase64(encoded);

console.log('decoded', decoded);

var object = JSON.parse(decoded);

console.log(object);



console.log('csjm');

</script>

</body>

</html>
*//**
 * 
 */