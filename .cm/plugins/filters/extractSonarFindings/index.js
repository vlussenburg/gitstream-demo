var extractSonarFindings = function parseExtractSonarFindings(Me) {
  return parseSonarParser(Me);
};

var parseSonarParser = function parseSonarParser(Me) {
  var Bn = Me.comments.filter(function (Me) {
    return Me.commenter === "sonarqubecloud";
  });

  if (!Bn.length) {
    return JSON.stringify(defaultMetrics());
  }

  var Hn = Object.keys(patterns).reduce(function (Me, Hn) {
    var zn;
    var ni = patterns[Hn];
    var Ci = Bn[0].content.match(ni);

    if (Hn === "duplications" || Hn === "coverage") {
      var aa;
      var oa = parseFloat(Ci == null ? void 0 : Ci[1].replace("%", ""));
      return Object.assign({}, Me, ((aa = {}), (aa[Hn] = oa || null), aa));
    }

    if (Hn === "security_hotspots") {
      var ca, _a;
      return Object.assign({}, Me, ((_a = {}), (_a[Hn] = {
        count: Ci && (Ci == null || (ca = Ci[1]) == null ? void 0 : ca.toString()) !== "0" ? Ci[1] : null,
        rating: ""
      }), _a));
    }

    return Object.assign({}, Me, ((zn = {}), (zn[Hn] = {
      count: Ci ? 1 : null,
      rating: Ci ? Ci[1] : ""
    }), zn));
  }, defaultMetrics());

  return JSON.stringify(Hn);
};

var patterns = {
  bugs: /(\w+) Bugs?/i,
  vulnerabilities: /(\w+) Vulnerabilities?/i,
  code_smells: /(\w+) Code Smells?/i,
  duplications: /Duplications[^\d]*(\d+\.?\d*)%/i,
  coverage: /Coverage[^\d]*(\d+\.?\d*)%/i,
  security_hotspots: /Security Hotspots[^\d]*(\d+)/i
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

module.exports = extractSonarFindings;
