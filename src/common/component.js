
Object.defineProperty(exports, "__esModule", { value: true });
let basic_1 = require("../mixins/basic");

let relationFunctions = {
	ancestor: {
		linked(parent) {
			this.parent = parent;
		},
		unlinked() {
			this.parent = null;
		},
	},
	descendant: {
		linked(child) {
			this.children = this.children || [];
			this.children.push(child);
		},
		unlinked(child) {
			this.children = (this.children || []).filter(function (it) { return it !== child; });
		},
	},
};
function mapKeys(source, target, map) {
	Object.keys(map).forEach(function (key) {
		if (source[key]) {
			target[map[key]] = source[key];
		}
	});
}
function makeRelation(options, mcOptions, relation) {
	let _a;
	let type = relation.type; let name = relation.name; let linked = relation.linked; let unlinked = relation.unlinked; let
		linkChanged = relation.linkChanged;
	let beforeCreate = mcOptions.beforeCreate; let
		destroyed = mcOptions.destroyed;
	if (type === 'descendant') {
		options.created = function () {
			beforeCreate && beforeCreate.bind(this)();
			this.children = this.children || [];
		};
		options.detached = function () {
			this.children = [];
			destroyed && destroyed.bind(this)();
		};
	}
	options.relations = Object.assign(options.relations || {}, (_a = {},
	_a["../" + name + "/index"] = {
		type,
		linked(node) {
			relationFunctions[type].linked.bind(this)(node);
			linked && linked.bind(this)(node);
		},
		linkChanged(node) {
			linkChanged && linkChanged.bind(this)(node);
		},
		unlinked(node) {
			relationFunctions[type].unlinked.bind(this)(node);
			unlinked && unlinked.bind(this)(node);
		},
	},
	_a));
}
function McComponent(mcOptions) {
	if (mcOptions === undefined) { mcOptions = {}; }
	let options = {};
	mapKeys(mcOptions, options, {
		data: 'data',
		props: 'properties',
		mixins: 'behaviors',
		methods: 'methods',
		beforeCreate: 'created',
		created: 'attached',
		mounted: 'ready',
		relations: 'relations',
		destroyed: 'detached',
		classes: 'externalClasses'
	});
	let relation = mcOptions.relation;
	if (relation) {
		makeRelation(options, mcOptions, relation);
	}
	// add default externalClasses
	options.externalClasses = options.externalClasses || [];
	options.externalClasses.push('custom-class');
	// add default behaviors
	options.behaviors = options.behaviors || [];
	options.behaviors.push(basic_1.basic);
	// map field to form-field behavior
	if (mcOptions.field) {
		options.behaviors.push('wx://form-field');
	}
	// add default options
	options.options = {
		multipleSlots: true,
		addGlobalClass: true
	};
	Component(options);
}
exports.McComponent = McComponent;
