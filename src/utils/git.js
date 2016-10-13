import { execSync } from 'child_process';
import * as AppConst from '../appconst.js';

import { Commit, CommitFile } from '../models/commit.js';

export default class GitUtils {
    constructor(path) {
        this.path = path;
        this.branches = [];
        this.remoteBranches = [];
        this.currentBranch = '';
    }

    /**
     * Check if the directory specified in this.path is a Git directory or not
     * @return {Boolean}
     */
    isValid() {
        try {
            process.chdir(this.path);
            let cmd = 'git rev-parse --is-inside-work-tree';
            execSync(cmd);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    collectData() {
        try {
            // Get all branches
            let cmd = 'git branch -a';
            let output = execSync(cmd).toString();
            let branches = output.split(/[\r\n]+/g);
            for (let i = 0; i < branches.length; i++) {
                let branch = branches[i].trim();
                if (branch.substring(0, 2) === '* ') {
                    this.currentBranch = branch.substring(2);
                    this.branches.push(this.currentBranch);
                } else if (branch.substring(0, 7) === 'remotes') {
                    this.remoteBranches.push(branch);
                } else {
                    this.branches.push(branch);
                }
            }

            // Todo: Get all users
        } catch (err) {
            console.error(err);
        }


    }

    getCommitsCount(branch = this.currentBranch) {
        let cmd = 'git rev-list --count ' + branch;
        try {
            let output = execSync(cmd).toString();
            return parseInt(output);
        } catch (err) {
            console.error(err);
            return 0;
        }
    }

    getCommits(page = 1, pageSize = AppConst.PAGER_DEFAULT_SIZE, branch = this.currentBranch) {
        if (isNaN(page) || page < 1) {
            page = 1;
        }
        if (isNaN(pageSize) || pageSize < 1) {
            pageSize = AppConst.PAGER_DEFAULT_SIZE;
        }
        let cmd = 'git log --pretty=[%H][%cn][%ce][%cd][%s] --date=format:"%Y/%m/%d %H:%M:%S"';
        cmd += ' --max-count=' + pageSize + ' --skip=' + (page - 1) * pageSize;
        cmd += ' ' + branch;
        try {
            let commits = [];
            let output = execSync(cmd).toString();
            let regexp = /\[(.+?)\]\[(.+?)\]\[(.+?)\]\[(.+?)\]\[(.+)\][\r\n]+/g;
            let match = regexp.exec(output);
            while (match !== null) {
                let commit = new Commit(match[1], match[2], match[3], match[4], match[5]);
                // let files = this.getFilesByCommitHash(commit.hash);
                // commit.files = files;
                commits.push(commit);
                match = regexp.exec(output);
            }
            return commits;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    getFilesByCommitHash(hash) {
        let cmd = 'git log -m -1 --pretty= --name-status ' + hash;
        try {
            let files = [];
            let output = execSync(cmd).toString();
            let regexp = /(\w+)\s+(\S+)(\s+(\S+))?[\r\n]+/g;
            let match = regexp.exec(output);
            while (match !== null) {
                let file = new CommitFile(match[1], match[2]);
                files.push(file);
                match = regexp.exec(output);
            }
            return files;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}
