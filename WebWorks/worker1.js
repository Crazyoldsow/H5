onmessage = function(event){
	var data = event.data;
	// postMessage(data.cmd)
	if(data.cmd == 'start'){
		postMessage("WORKER STARTED:"+data.msg);
	}else if(data.cmd == 'stop'){
		postMessage('WORKER STOPPED:'+data.msg + "all buttons will no longer work!");
		close();
	}else{
		postMessage("Unknown message:" + data.msg)
	}
}