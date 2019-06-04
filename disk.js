class Disk{

	constructor(size){
		this.cluster = [];
		this.head = 0;
		this.size = 0;
		this.timer = 0;
		this.size = size;
		for(let x=0;x<size;x++){
			this.cluster.push("cluster"+x);
		}
	}

	getHeadPosition(){
		return this.head;
	}

	getTime(){
		return this.timer;
	}

	idle(arr){
		let delay = arr-this.head;
		this.time+=delay;
		return delay;
	}

	searchUpBS(task,rep) {
		for(; this.head!==task.cluster && this.size>this.head; this.head++){ 
			this.timer++; 
			rep.iterations++; 
		}
		if(this.head===task.cluster) {
				return this.cluster[this.head];
		}
		this.head=this.size;
		return this.searchDownBS(task,rep);
	}

	searchDownBS(task,rep) {
		for(; this.head!==task.cluster && this.size>this.head; this.head--){ 
			this.timer++;
			rep.iterations++; 
		}
		if(this.head===task.cluster) {
			return clusters[this.head];
		}
		this.head = 0;
		return this.searchUpBS(task,rep);
		}

	scan(taskList){
		let reports = {};
		while(taskList.length>0){
			for(this.head = 0; this.head<this.size;this.head++){
				for(let x in taskList){
					if(taskList[x].cluster===this.head && this.timer>taskList[x].arrival){
						reports[x] = new Report(x,0);
						reports[x].endTime = this.timer;
						taskList.splice(x,1);
					}
				}
				this.timer++;
			}
			for(this.head = this.size-1; this.head>=0; this.head--){
				for(let x in taskList){
					if(taskList[x].cluster===this.head && this.timer>taskList[x].arrival ){
						reports[x] = new Report(x,0);
						reports[x].endTime = this.timer;
						taskList.splice(x,1);
					}
				}
				this.timer++;
			}
		}
		return reports;
	}
};

class Task {
	constructor(id,pos,arr) {
		this.id;
		this.iterations = 0;
		this.arrival = 0;
		this.cluster = pos;
		this.id = id;
		this.arrival = arr;
	}

	getStats() {
	}
};

class Report{
	constructor(id,start){
		this.id;
		this.startTime=0;
		this.endTime=0;
		this.id = id;
		this.startTime=start;
		this.iterations=0;
	}
	
	exportReport(){
		return {start: this.startTime, end: this.endTime, iters: this.iters};
	}
};

module.exports.Task = Task;
module.exports.Disk = Disk;
module.exports.Report = Report;
