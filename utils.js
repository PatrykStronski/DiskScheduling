let disk = require('./disk.js');

function sortTasks(tl,head){
	for(let x = 0; x< tl.length-1; x++){
		if(tl[x].cluster>tl[x+1].cluster){
			tmp = tl[x];
			tl[x] = tl[x+1];
			tl[x+1] = tl;
		}
	}
}

function getSeekTime(task,head){ //if + search up, else search down
	return task.cluster-head;
}

function getShortestSeekTime(taskList,head){
	let min = getSeekTime(taskList[0],head);
	let ind = 0;
	for(let x = 1; x<taskList.length; x++){
		let tmp = getSeekTime(taskList[x],head);
		if(min>Math.abs(tmp)){
			min = tmp;
			ind = x;
		}
	}
	return ind;
}

module.exports.getShortestSeekTime = getShortestSeekTime;

function getRandomInt(limit){
	return Math.floor(Math.random() * Math.floor(limit));
}

module.exports.createTask = function(size){
	let t = new disk.Task(getRandomInt(size),getRandomInt(size),getRandomInt(size));
	return t;
}

// To ALL FUNCTIONS THE COPY OF TASKlIST MUST BE PASSED 

module.exports.fcfs = function(taskList,taskNmb,size){
	let dev = new disk.Disk(size);
	reports = {};
	for(let x in taskList){
		let rep = new disk.Report(x,dev.getTime());
		if(taskList[x].arrival>=dev.getTime()){
			rep.delay = dev.idle(taskList[x].arrival);
		}
		dev.searchUpBS(taskList[x],rep);
		rep.endTime = dev.getTime();
		reports[x] = (rep);
	}
	return reports;
}

module.exports.sstf = function(taskList,taskNmb,size) {
	let dev = new disk.Disk(size);
	let reports = {};
	while(taskList.length>0){
		let ind = getShortestSeekTime(taskList,dev.getHeadPosition());
		let rep = new disk.Report(ind,dev.getTime());
		if(taskList[ind].arrival>dev.getTime()){
			rep.delay=dev.idle(taskList[ind].arrival);
		}
		dev.searchUpBS(taskList[ind],rep);
		rep.endTime = dev.getTime();
		reports[ind] = rep;
		taskList.splice(ind,1);
	}
	return reports;
}

module.exports.scan = function(taskList,taskNmb,size) {
	let dev = new disk.Disk(size);
	sortTasks(taskList);
	let reports = dev.scan(taskList);
	return reports;
}
