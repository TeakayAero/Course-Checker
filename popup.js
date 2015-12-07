document.addEventListener('DOMContentLoaded', function(){
	var submitButton = document.getElementById('submit');
	var clearButton = document.getElementById('clear');
	info = {active: true,
			currentWindow: true}
	submitButton.addEventListener('click', function() {
		try{
			d = document;
			var xhttp = new XMLHttpRequest();
			var term = d.getElementById("term").value;
			var sub = d.getElementById("subject").value;
			var cod = d.getElementById("code").value;
			var key = '4441d2c807dabc54461f34d117fdc224'
			var request = "https://api.uwaterloo.ca/v2/terms/" + term + '/' + sub + '/' + cod + '/schedule.xml' + '?key=' + key;
			xhttp.open("GET", request, false);
			xhttp.send();
			var response = xhttp.responseXML;
			var root = response.evaluate("/response/data/item", response, null, XPathResult.ANY_TYPE, null);
			var next = root.iterateNext();
			var count = 1;
			while(next){
				var path = "/response/data/item[" + count.toString() + ']';
				var lecname = response.evaluate("string(" + path + "/section)", response, null, XPathResult.ANY_TYPE, null).stringValue;
				if ( lecname.substr(0,3) == 'LEC'){
					var cap = response.evaluate("string(" + path + "/enrollment_capacity)", response, null, XPathResult.ANY_TYPE, null).stringValue;
					var ttl = response.evaluate("string(" + path + "/enrollment_total)", response, null, XPathResult.ANY_TYPE, null).stringValue;
					d.getElementById("reserved").innerHTML += "<h3>" + sub + cod + ' ' + lecname + " : " + ttl + "/" + cap + "<h3>"
				}
				next = root.iterateNext();
				count++;
			}
		} catch(e) {
			print("Exception Occured");
		}
	}, false);
	
	clearButton.addEventListener('click', function() {
		d = document;
		d.getElementById("reserved").innerHTML = '';
	}, false);
	
}, false);