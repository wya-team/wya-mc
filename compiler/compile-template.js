const path = require('path');
const fs = require('fs-extra');
const del = require('del');
const through = require('through2');
const platform = require('./platform');

let transform = (v) => {
	return v
		.replace(/wx:/g, `${platform.globalApi}:`)
		.replace(new RegExp(`(<|<\\/|\\.)(${platform.scripts.join('|')})`, 'g'), `$1${platform.script}`);

};
let fn = (options) => {
	return through.obj(function (file, enc, cb) {

		// 如果文件为空，不做任何操作，转入下一个操作，即下一个 .pipe()
		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		// 插件不支持对 Stream 对直接操作，跑出异常
		if (file.isStream()) {
			this.emit('error', 'mp-cli/json: Streaming not supported');
			return cb();
		}

		file.contents = Buffer.from(
			transform(file.contents.toString())
		);
		
		this.push(file);
		cb();
	});
};

fn.transform = transform;

module.exports = fn;