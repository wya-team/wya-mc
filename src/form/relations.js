export const formComponents = {
	'../input/index': {
		type: 'descendant',
		linked(child) {
			this.children = this.children || [];
			this.children.push(child);
		},
		unlinked(child) {
			this.children = (this.children || []).filter((it) => it !== child);
		}
	},
	'../picker/index': {
		type: 'descendant',
		linked(child) {
			this.children = this.children || [];
			this.children.push(child);
		},
		unlinked(child) {
			this.children = (this.children || []).filter((it) => it !== child);
		}
	},
};