# Get All Dependencies from a repository

## Overview

This Node script takes in a given `org` and `repo` to dump out all the cataloged dependencies for a repo as a CSV file.

## How to use
1. Clone this repo to your local machine
2. Create a filed called `.env`
3. Create a GitHub [Personal Access Token](https://help.github.com/articles/authorizing-a-personal-access-token-for-use-with-a-saml-single-sign-on-organization/) with `repo` permission
4. Add the token to your `.env` file as `GITHUB_TOKEN=insert-token-here`
5. Run `npm install` then run `get-repo-dependencies.js` with `org` and `repo`
### Example
```.sh
npm install
node get-repo-dependencies.js octodemo activemq > output.csv
```
## License
This project is licensed under the MIT License.