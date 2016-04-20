onmessage = function(event){
	var sum = 0;
	var num = event.data;
	for(var i=0;i<num; i++){
		sum += i;
	}

	postMessage(sum);
}
