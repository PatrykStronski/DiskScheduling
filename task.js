const disk = require('./disk.js');
const utils = require('./utils.js');

function main(){
	const size = 1000;
	const taskNmb = 20;
	let tasks = [];
	let report = {};
	for (let x = 0; x <taskNmb; x++){
		tasks.push(utils.createTask(size));
	}
	report.fcfs = utils.fcfs(JSON.parse(JSON.stringify(tasks)),taskNmb,size);
	report.sstf = utils.sstf(JSON.parse(JSON.stringify(tasks)),taskNmb,size);
	//report.scan = utils.scan(JSON.parse(JSON.stringify(tasks)),taskNmb,size);
	console.log(report);
}

main();
