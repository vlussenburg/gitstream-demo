

const patterns = {
  bugs: /\[(\d+)\s+New issues\]/i,
  vulnerabilities: /\[(\d+)\s+Vulnerabilities\]/i,
  code_smells: /\[(\d+)\s+Code Smells\]/i,
  duplications: /\[(\d+(?:\.\d+)?)%\s+Duplication on New Code\]/i,
  coverage: /\[(\d+(?:\.\d+)?)%\s+Coverage on New Code\]/i,
  security_hotspots: /\[(\d+)\s+Security Hotspots\]/i
};


function defaultMetrics() {
  return {
    bugs: { count: null, rating: "" },
    vulnerabilities: { count: null, rating: "" },
    code_smells: { count: null, rating: "" },
    duplications: null,
    coverage: null,
    security_hotspots: { count: null, rating: "" }
  };
}

function extractSonarFindings(pr) {
  const comments = pr.comments || [];
  const sonarComment = comments.find(c =>
    c.commenter?.toLowerCase().includes("sonarqubecloud")
  );

  if (!sonarComment?.content) return defaultMetrics();

  // Normalize whitespace just in case
  const content = sonarComment.content.replace(/\s+/g, ' ');
  const findings = defaultMetrics();

  for (const [key, regex] of Object.entries(patterns)) {
    const match = content.match(regex);
    if (!match) continue;

    if (key === "coverage" || key === "duplications") {
      findings[key] = parseFloat(match[1]) || 0;
    } else {
      findings[key] = {
        count: match[1] !== "0" ? parseInt(match[1]) : 0,
        rating: ""
      };
    }
  }

  return findings;
};

module.exports = extractSonarFindings;

console.log(extractSonarFindings({

  comments: [
      {
        "commenter": "sonarqubecloud",
        "content": "## [![Quality Gate Passed](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/checks/QualityGateBadge/qg-passed-20px.png 'Quality Gate Passed')](https://sonarcloud.io/dashboard?id=vlussenburg_gitstream-demo&pullRequest=116) **Quality Gate passed**  \nIssues  \n![](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/common/passed-16px.png '') [10 New issues](https://sonarcloud.io/project/issues?id=vlussenburg_gitstream-demo&pullRequest=116&issueStatuses=OPEN,CONFIRMED&sinceLeakPeriod=true)  \n![](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/common/accepted-16px.png '') [1 Accepted issues](https://sonarcloud.io/project/issues?id=vlussenburg_gitstream-demo&pullRequest=116&issueStatuses=ACCEPTED)\n\nMeasures  \n![](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/common/passed-16px.png '') [5 Security Hotspots](https://sonarcloud.io/project/security_hotspots?id=vlussenburg_gitstream-demo&pullRequest=116&issueStatuses=OPEN,CONFIRMED&sinceLeakPeriod=true)  \n![](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/common/passed-16px.png '') [10.0% Coverage on New Code](https://sonarcloud.io/component_measures?id=vlussenburg_gitstream-demo&pullRequest=116&metric=new_coverage&view=list)  \n![](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/common/passed-16px.png '') [20.0% Duplication on New Code](https://sonarcloud.io/component_measures?id=vlussenburg_gitstream-demo&pullRequest=116&metric=new_duplicated_lines_density&view=list)  \n  \n[See analysis details on SonarQube Cloud](https://sonarcloud.io/dashboard?id=vlussenburg_gitstream-demo&pullRequest=116)\n\n",
        "created_at": "2025-05-20T21:37:10Z",
        "nodeId": "IC_kwDOOlGlhs6sm8yL",
        "id": 2895891595
      }
  ]
}));

console.log(extractSonarFindings({

  comments: [
      {
        "commenter": "sonarqubecloud",
        "content": "## [![Quality Gate Passed](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/checks/QualityGateBadge/qg-passed-20px.png 'Quality Gate Passed')](https://sonarcloud.io/dashboard?id=vlussenburg_gitstream-demo&pullRequest=116) **Quality Gate passed**  \nIssues  \n![](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/common/passed-16px.png '') [0 New issues](https://sonarcloud.io/project/issues?id=vlussenburg_gitstream-demo&pullRequest=116&issueStatuses=OPEN,CONFIRMED&sinceLeakPeriod=true)  \n![](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/common/accepted-16px.png '') [0 Accepted issues](https://sonarcloud.io/project/issues?id=vlussenburg_gitstream-demo&pullRequest=116&issueStatuses=ACCEPTED)\n\nMeasures  \n![](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/common/passed-16px.png '') [0 Security Hotspots](https://sonarcloud.io/project/security_hotspots?id=vlussenburg_gitstream-demo&pullRequest=116&issueStatuses=OPEN,CONFIRMED&sinceLeakPeriod=true)  \n![](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/common/passed-16px.png '') [0.0% Coverage on New Code](https://sonarcloud.io/component_measures?id=vlussenburg_gitstream-demo&pullRequest=116&metric=new_coverage&view=list)  \n![](https://sonarsource.github.io/sonarcloud-github-static-resources/v2/common/passed-16px.png '') [0.0% Duplication on New Code](https://sonarcloud.io/component_measures?id=vlussenburg_gitstream-demo&pullRequest=116&metric=new_duplicated_lines_density&view=list)  \n  \n[See analysis details on SonarQube Cloud](https://sonarcloud.io/dashboard?id=vlussenburg_gitstream-demo&pullRequest=116)\n\n",
        "created_at": "2025-05-20T21:37:10Z",
        "nodeId": "IC_kwDOOlGlhs6sm8yL",
        "id": 2895891595
      }
  ]
}));