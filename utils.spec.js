const utils = require('./utils.js');
const assert = require('chai').assert;

// getShortestSeekTime
{
const data = [{cluster: 40}, {cluster: 55}, {cluster: 21}];
const head = 20;
let answ = utils.getShortestSeekTime(data,head);
assert.equal(answ,2,"getShortestSeekTime wrong index");
}
{
const data = [{cluster: 40}, {cluster: 55}, {cluster: 21}];
const head = 41;
let answ = utils.getShortestSeekTime(data,head);
assert.equal(answ,0,"getShortestSeekTime wrong index");
}
