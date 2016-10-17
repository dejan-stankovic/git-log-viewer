import Git from '../utils/git.js';

export default class thissitory {
	constructor() {
		this.url = '';
		this.currentBranch = '';
		this.branches = [];
		this.users = [];
		this.commitsCount = 0;
	}

	collectData() {
		this.url = Git.getURL();
        this.currentBranch = Git.getCurrentBranch();
        this.branches = Git.getBranches();
        this.users = Git.getUsers(this.currentBranch);
        this.commitsCount = Git.getCommitsCount(this.currentBranch);
	}
}