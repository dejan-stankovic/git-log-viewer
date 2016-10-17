import { execSync } from 'child_process';
import * as AppConst from '../appconst.js';

import { Commit, CommitFile } from '../models/commit.js';
import User from '../models/user.js';

export default class GitUtils {

    static getURL() {
        try {
            let cmd = 'git config --get remote.origin.url';
            return execSync(cmd).toString();
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    static getCurrentBranch() {
        try {
            let cmd = 'git rev-parse --abbrev-ref HEAD';
            return execSync(cmd).toString();
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    static getBranches() {
        try {
            let cmd = 'git branch -a';
            let output = execSync(cmd).toString();
            let branches = output.split(/[\r\n]+/g);
            let result = [];
            for (let branch of branches) {
                branch = branch.trim();
                if (branch === '') continue;
                if (branch.substring(0, 2) === '* ') {
                    branch = branch.substring(2);
                }
                result.push(branch);
            }
            return result;
        } catch (err) {
            console.error(err);
        }
    }

    static getUsers(branch) {
        let cmd = 'git log --pretty=[%cE][%cN] ' + branch;
        try {
            let output = execSync(cmd).toString();
            let regexp = /\[(.+?)\]\[(.+?)\][\r\n]+/g;
            let match = regexp.exec(output);
            let emails = [];
            let users = [];
            while (match !== null) {
                let email = match[1].toLowerCase();
                if (emails.indexOf(email) === -1) {
                    emails.push(email);
                    users.push(new User(match[2], email));
                }
                match = regexp.exec(output);
            }
            return users;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    static getCommitsCount(branch) {
        let cmd = 'git rev-list --count ' + branch;
        try {
            let output = execSync(cmd).toString();
            return parseInt(output);
        } catch (err) {
            console.error(err);
            return 0;
        }
    }

    static getCommits(page = 1, pageSize = AppConst.PAGER_DEFAULT_SIZE, branch) {
        if (isNaN(page) || page < 1) {
            page = 1;
        }
        if (isNaN(pageSize) || pageSize < 1) {
            pageSize = AppConst.PAGER_DEFAULT_SIZE;
        }
        let cmd = 'git log --pretty=[%H][%cN][%cE][%cd][%s] --date=format:"%Y/%m/%d %H:%M:%S"';
        cmd += ' --max-count=' + pageSize + ' --skip=' + (page - 1) * pageSize;
        cmd += ' ' + branch;
        try {
            let commits = [];
            let output = execSync(cmd).toString();
            let regexp = /\[(.+?)\]\[(.+?)\]\[(.+?)\]\[(.+?)\]\[(.+)\][\r\n]+/g;
            let match = regexp.exec(output);
            while (match !== null) {
                let commit = new Commit(match[1], match[2], match[3], match[4], match[5]);
                commits.push(commit);
                match = regexp.exec(output);
            }
            return commits;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    static getFilesByCommitHash(hash) {
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
