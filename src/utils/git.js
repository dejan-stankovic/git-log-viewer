import { exec } from 'child_process';
import AppConst from 'constants/app.js';
import { Commit, CommitFile } from 'models/commit.js';
import User from 'models/user.js';

module.exports = class Git {
    static getURL() {
        return new Promise((resolve, reject) => {
            let cmd = 'git config --get remote.origin.url';
            exec(cmd, AppConst.EXEC_OPTIONS, (error, stdout, stderr) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                resolve(stdout);
            });
        });
    }

    static getCurrentBranch() {
        return new Promise((resolve, reject) => {
            let cmd = 'git rev-parse --abbrev-ref HEAD';
            exec(cmd, AppConst.EXEC_OPTIONS, (error, stdout, stderr) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                resolve(stdout);
            });
        });
    }

    static getBranches() {
        return new Promise((resolve, reject) => {
            let cmd = 'git branch -a';
            exec(cmd, AppConst.EXEC_OPTIONS, (error, stdout, stderr) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                let branches = stdout.split(/[\r\n]+/g);
                let result = [];
                for (let branch of branches) {
                    branch = branch.trim();
                    if (branch === '' || branch.indexOf('->') > -1) continue;
                    if (branch.substring(0, 2) === '* ') {
                        branch = branch.substring(2);
                    }
                    result.push(branch);
                }
                resolve(result);
            });
        });
    }

    static getUsers(branch = '') {
        return new Promise((resolve, reject) => {
            let cmd = 'git log --pretty=[%cE][%cN]';
            if (branch !== '') cmd += ' ' + branch;
            exec(cmd, AppConst.EXEC_OPTIONS, (error, stdout, stderr) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                let regexp = /\[(.+?)\]\[(.+?)\][\r\n]+/g;
                let match = regexp.exec(stdout);
                let emails = [];
                let users = [];
                while (match !== null) {
                    let email = match[1].toLowerCase();
                    if (emails.indexOf(email) === -1) {
                        emails.push(email);
                        users.push(new User(match[2], email));
                    }
                    match = regexp.exec(stdout);
                }
                resolve(users);
            });
        });
    }

    static getCommitsCount(branch = '', users = [], message = '', fromDate = '', toDate = '') {
        let cmd = 'git log --pretty=%h --regexp-ignore-case';
        for (let user of users) {
            cmd += ' --committer=' + user.email;
        }
        if (message !== '') {
            cmd += ' --grep=' + message.toLowerCase();
        }
        if (fromDate !== '') {
            cmd += ' --since=' + fromDate;
        }
        if (toDate !== '') {
            cmd += ' --before=' + toDate;
        }
        if (branch !== '') cmd += ' ' + branch;
        return new Promise((resolve, reject) => {
            exec(cmd, AppConst.EXEC_OPTIONS, (error, stdout, stderr) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                let lines = stdout.split(/[\r\n]+/g);
                resolve(lines.length);
            });
        });
    }

    static getCommits(page = 1, pageSize = AppConst.PAGER_DEFAULT_SIZE, branch = '', users = [], message = '', fromDate = '', toDate = '') {
        if (isNaN(page) || page < 1) {
            page = 1;
        }
        if (isNaN(pageSize) || pageSize < 1) {
            pageSize = AppConst.PAGER_DEFAULT_SIZE;
        }
        let cmd = 'git log --pretty=[%H][%cN][%cE][%cd][%s] --date=format:"%Y/%m/%d %H:%M:%S" --regexp-ignore-case';
        for (let user of users) {
            cmd += ' --committer=' + user.email;
        }
        if (message !== '') {
            cmd += ' --grep=' + message.toLowerCase();
        }
        if (fromDate !== '') {
            cmd += ' --since=' + fromDate;
        }
        if (toDate !== '') {
            cmd += ' --before=' + toDate;
        }
        cmd += ' --max-count=' + pageSize + ' --skip=' + (page - 1) * pageSize;
        if (branch !== '') cmd += ' ' + branch;
        return new Promise((resolve, reject) => {
            exec(cmd, AppConst.EXEC_OPTIONS, (error, stdout, stderr) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                let commits = [];
                let regexp = /\[(.+?)\]\[(.+?)\]\[(.+?)\]\[(.+?)\]\[(.+)\][\r\n]+/g;
                let match = regexp.exec(stdout);
                while (match !== null) {
                    let commit = new Commit(match[1], match[2], match[3], match[4], match[5]);
                    commits.push(commit);
                    match = regexp.exec(stdout);
                }
                resolve(commits);
            });
        });
    }

    static getFilesByCommitHash(hash) {
        let cmd = 'git log -m -1 --pretty= --name-status ' + hash;
        return new Promise((resolve, reject) => {
            exec(cmd, AppConst.EXEC_OPTIONS, (error, stdout, stderr) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                let files = [];
                let regexp = /(\w+)\s+(\S+)(\s+(\S+))?[\r\n]+/g;
                let match = regexp.exec(stdout);
                while (match !== null) {
                    let file = new CommitFile(match[1], match[2]);
                    files.push(file);
                    match = regexp.exec(stdout);
                }
                resolve(files);
            });
        });
    }

    static getFilesByCommits(commits) {
        return new Promise((resolve, reject) => {
            let promises = [];
            for (let commit of commits) {
                promises.push(this.getFilesByCommitHash(commit.hash));
            }
            Promise.all(promises).then(values => {
                let data = values.map((value, i) => {
                    let commit = commits[i].asMutable({deep: true});
                    commit.files = value;
                    return commit;
                });
                resolve(data);
            }).catch(err => {
                reject(null);
            });
        });
    }

    static fetchAll() {
        let cmd = 'git fetch --all';
        return new Promise((resolve, reject) => {
            exec(cmd, AppConst.EXEC_OPTIONS, (error, stdout, stderr) => {
                if (error) {
                    console.error(error);
                    reject(stderr);
                }
                resolve(stdout);
            });
        });
    }
}
