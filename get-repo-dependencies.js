#!/usr/bin/env node

require('dotenv').config()

const [, , org, repo] = process.argv

let { graphql } = require('@octokit/graphql')
graphql = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.hawkgirl-preview+json'
  }
})

DumpDependabotAlerts()

async function DumpDependabotAlerts() {
  let pagination = null
  const query =
    `query ($org: String! $repo: String! $cursor: String){
      repository(owner: $org name: $repo) {
        name
        dependencyGraphManifests(first: 100 after: $cursor) {
          pageInfo {
            hasNextPage
            endCursor
          }
          
          nodes {
            dependenciesCount
            dependencies {
              nodes {
                packageManager
                packageName
                requirements
                hasDependencies
              }
            }
          }
        }
      }
    }`

  try {
    console.log("org,repo,ecosystem,packageName,version,hasDependencies")
    let hasNextPage = false
    do {
      const getDepsResult = await graphql({ query, org: org, repo: repo, cursor: pagination })

      hasNextPage = getDepsResult.repository.dependencyGraphManifests.pageInfo.hasNextPage
      const repoDependencies = getDepsResult.repository.dependencyGraphManifests.nodes


      for (const repoDependency of repoDependencies) {
        for (const dep of repoDependency.dependencies.nodes) {
          console.log(`${org},${repo},${dep.packageManager},${dep.packageName},${dep.requirements},${dep.hasDependencies}`)
        }
      }

      if (hasNextPage) {
        pagination = getVulnResult.repository.vulnerabilityAlerts.pageInfo.endCursor
      }
    } while (hasNextPage)
  } catch (error) {
    console.log('Request failed:', error.request)
    console.log(error.message)
  }
}

