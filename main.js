exports.issues_add = async function(pat,repo) {
    const { Octokit } = require("@octokit/rest");
    const octokit = new Octokit({
        auth: pat
    });
    const user = await octokit.request('GET /user')
    const issues = await octokit.paginate('GET /repos/{owner}/{repo}/issues', {
        owner: user.data.login,
        repo: repo,
        state: 'all'
      });
    for(issue of issues) {
        if(!issue.pull_request) {
            await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
                owner: user.data.login,
                repo: repo,
                issue_number: issue.number,
                labels: ['SpaceGame']
              })
        }
    }
}