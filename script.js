"use strict";
const PASS_MARK = 30;
const MAX_ATKT_BACKLOGS = 3;
const SAMPLE_SUBJECTS = ["OS", "JS", "DSA", "DBMS", "CN", "OOP", "DAA", "SE", "TOC", "COA", "WT", "MP", "AI", "CC", "IS", "CD", "BDA", "DS"];
const SAMPLE_DATA = [{"rollNo":"2025CS001","name":"Aarav Sharma","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":78,"JS":85,"DSA":72,"DBMS":82,"CN":88,"OOP":79,"DAA":77,"SE":74,"TOC":93,"COA":73,"WT":91,"MP":93,"AI":98,"CC":87,"IS":72,"CD":88,"BDA":83,"DS":71}},{"rollNo":"2025CS002","name":"Diya Patel","branch":"Information Technology","admissionYear":2025,"graduationYear":2029,"marks":{"OS":65,"JS":74,"DSA":58,"DBMS":70,"CN":68,"OOP":62,"DAA":70,"SE":87,"TOC":76,"COA":92,"WT":90,"MP":92,"AI":87,"CC":83,"IS":77,"CD":84,"BDA":88,"DS":78}},{"rollNo":"2025CS003","name":"Rohan Verma","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":24,"JS":62,"DSA":55,"DBMS":45,"CN":58,"OOP":60,"DAA":44,"SE":48,"TOC":56,"COA":41,"WT":40,"MP":59,"AI":41,"CC":57,"IS":57,"CD":73,"BDA":51,"DS":37}},{"rollNo":"2025CS004","name":"Ananya Iyer","branch":"Artificial Intelligence & DS","admissionYear":2025,"graduationYear":2029,"marks":{"OS":88,"JS":92,"DSA":90,"DBMS":85,"CN":95,"OOP":91,"DAA":87,"SE":79,"TOC":96,"COA":90,"WT":89,"MP":98,"AI":97,"CC":81,"IS":88,"CD":76,"BDA":92,"DS":72}},{"rollNo":"2025CS005","name":"Ishaan Nair","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":22,"JS":28,"DSA":45,"DBMS":35,"CN":40,"OOP":50,"DAA":41,"SE":59,"TOC":52,"COA":64,"WT":75,"MP":58,"AI":45,"CC":58,"IS":57,"CD":48,"BDA":77,"DS":52}},{"rollNo":"2025CS006","name":"Sneha Kulkarni","branch":"Information Technology","admissionYear":2025,"graduationYear":2029,"marks":{"OS":18,"JS":25,"DSA":22,"DBMS":26,"CN":32,"OOP":40,"DAA":50,"SE":35,"TOC":47,"COA":37,"WT":35,"MP":44,"AI":42,"CC":38,"IS":50,"CD":52,"BDA":47,"DS":37}},{"rollNo":"2025CS007","name":"Aditya Mehta","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":55,"JS":64,"DSA":70,"DBMS":60,"CN":58,"OOP":65,"DAA":77,"SE":96,"TOC":71,"COA":95,"WT":80,"MP":82,"AI":78,"CC":72,"IS":76,"CD":88,"BDA":98,"DS":92}},{"rollNo":"2025CS008","name":"Pooja Reddy","branch":"Artificial Intelligence & DS","admissionYear":2025,"graduationYear":2029,"marks":{"OS":52,"JS":48,"DSA":25,"DBMS":55,"CN":60,"OOP":28,"DAA":64,"SE":44,"TOC":51,"COA":43,"WT":50,"MP":70,"AI":69,"CC":51,"IS":72,"CD":62,"BDA":72,"DS":60}},{"rollNo":"2025CS009","name":"Vikram Singh","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":15,"JS":20,"DSA":18,"DBMS":22,"CN":25,"OOP":35,"DAA":31,"SE":33,"TOC":34,"COA":50,"WT":35,"MP":51,"AI":43,"CC":49,"IS":32,"CD":42,"BDA":42,"DS":49}},{"rollNo":"2025CS010","name":"Riya Gupta","branch":"Information Technology","admissionYear":2025,"graduationYear":2029,"marks":{"OS":72,"JS":80,"DSA":68,"DBMS":75,"CN":82,"OOP":70,"DAA":91,"SE":93,"TOC":73,"COA":91,"WT":98,"MP":87,"AI":94,"CC":78,"IS":94,"CD":90,"BDA":80,"DS":73}},{"rollNo":"2025CS011","name":"Tanvi Deshmukh","branch":"Computer Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":64,"JS":68,"DSA":60,"DBMS":69,"CN":55,"OOP":85,"DAA":78,"SE":83,"TOC":78,"COA":63,"WT":71,"MP":79,"AI":60,"CC":71,"IS":84,"CD":58,"BDA":82,"DS":75}},{"rollNo":"2025CS012","name":"Aryan Joshi","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":79,"JS":96,"DSA":90,"DBMS":86,"CN":89,"OOP":76,"DAA":74,"SE":81,"TOC":94,"COA":75,"WT":87,"MP":94,"AI":86,"CC":70,"IS":89,"CD":80,"BDA":85,"DS":70}},{"rollNo":"2025CS013","name":"Meera Nambiar","branch":"Artificial Intelligence & DS","admissionYear":2025,"graduationYear":2029,"marks":{"OS":42,"JS":58,"DSA":54,"DBMS":50,"CN":38,"OOP":50,"DAA":71,"SE":17,"TOC":40,"COA":66,"WT":39,"MP":69,"AI":43,"CC":43,"IS":77,"CD":65,"BDA":70,"DS":45}},{"rollNo":"2025CS014","name":"Siddharth Rao","branch":"Information Technology","admissionYear":2025,"graduationYear":2029,"marks":{"OS":63,"JS":71,"DSA":82,"DBMS":74,"CN":68,"OOP":85,"DAA":61,"SE":84,"TOC":72,"COA":79,"WT":78,"MP":77,"AI":61,"CC":77,"IS":64,"CD":67,"BDA":76,"DS":75}},{"rollNo":"2025CS015","name":"Kavya Menon","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":81,"JS":84,"DSA":98,"DBMS":86,"CN":84,"OOP":73,"DAA":77,"SE":77,"TOC":72,"COA":80,"WT":70,"MP":88,"AI":87,"CC":77,"IS":88,"CD":77,"BDA":70,"DS":72}},{"rollNo":"2025CS016","name":"Kabir Malhotra","branch":"Computer Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":75,"JS":38,"DSA":19,"DBMS":39,"CN":37,"OOP":56,"DAA":39,"SE":67,"TOC":19,"COA":52,"WT":77,"MP":23,"AI":48,"CC":69,"IS":43,"CD":71,"BDA":71,"DS":65}},{"rollNo":"2025CS017","name":"Neha Chawla","branch":"Information Technology","admissionYear":2025,"graduationYear":2029,"marks":{"OS":62,"JS":80,"DSA":70,"DBMS":80,"CN":68,"OOP":61,"DAA":58,"SE":58,"TOC":76,"COA":68,"WT":66,"MP":68,"AI":68,"CC":69,"IS":82,"CD":78,"BDA":56,"DS":76}},{"rollNo":"2025CS018","name":"Rahul Bansal","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":41,"JS":38,"DSA":60,"DBMS":56,"CN":41,"OOP":50,"DAA":47,"SE":47,"TOC":69,"COA":63,"WT":43,"MP":62,"AI":46,"CC":52,"IS":64,"CD":50,"BDA":39,"DS":63}},{"rollNo":"2025CS019","name":"Anika Sen","branch":"Artificial Intelligence & DS","admissionYear":2025,"graduationYear":2029,"marks":{"OS":95,"JS":97,"DSA":97,"DBMS":87,"CN":73,"OOP":71,"DAA":90,"SE":87,"TOC":96,"COA":70,"WT":72,"MP":94,"AI":97,"CC":77,"IS":75,"CD":83,"BDA":85,"DS":85}},{"rollNo":"2025CS020","name":"Yashvardhan Singhania","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":36,"JS":42,"DSA":31,"DBMS":35,"CN":42,"OOP":30,"DAA":20,"SE":18,"TOC":28,"COA":26,"WT":44,"MP":39,"AI":43,"CC":52,"IS":47,"CD":51,"BDA":52,"DS":45}},{"rollNo":"2025CS021","name":"Shreya Bhattacharya","branch":"Information Technology","admissionYear":2025,"graduationYear":2029,"marks":{"OS":59,"JS":61,"DSA":64,"DBMS":61,"CN":85,"OOP":56,"DAA":73,"SE":78,"TOC":72,"COA":56,"WT":78,"MP":65,"AI":56,"CC":56,"IS":73,"CD":70,"BDA":71,"DS":84}},{"rollNo":"2025CS022","name":"Varun Kapoor","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":68,"JS":45,"DSA":38,"DBMS":67,"CN":40,"OOP":46,"DAA":17,"SE":73,"TOC":39,"COA":78,"WT":50,"MP":60,"AI":42,"CC":71,"IS":50,"CD":72,"BDA":73,"DS":37}},{"rollNo":"2025CS023","name":"Prisha Hegde","branch":"Artificial Intelligence & DS","admissionYear":2025,"graduationYear":2029,"marks":{"OS":89,"JS":72,"DSA":83,"DBMS":91,"CN":88,"OOP":88,"DAA":86,"SE":80,"TOC":78,"COA":76,"WT":91,"MP":92,"AI":80,"CC":77,"IS":78,"CD":82,"BDA":74,"DS":91}},{"rollNo":"2025CS024","name":"Harshavardhan Rathi","branch":"Computer Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":54,"JS":64,"DSA":55,"DBMS":39,"CN":35,"OOP":64,"DAA":71,"SE":41,"TOC":39,"COA":69,"WT":48,"MP":67,"AI":51,"CC":43,"IS":57,"CD":39,"BDA":50,"DS":58}},{"rollNo":"2025CS025","name":"Simran Kaur","branch":"Information Technology","admissionYear":2025,"graduationYear":2029,"marks":{"OS":64,"JS":60,"DSA":69,"DBMS":81,"CN":72,"OOP":77,"DAA":64,"SE":74,"TOC":80,"COA":75,"WT":71,"MP":55,"AI":76,"CC":81,"IS":72,"CD":64,"BDA":84,"DS":76}},{"rollNo":"2025CS026","name":"Devansh Saxena","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":41,"JS":43,"DSA":51,"DBMS":42,"CN":41,"OOP":70,"DAA":44,"SE":52,"TOC":53,"COA":48,"WT":56,"MP":48,"AI":51,"CC":67,"IS":66,"CD":51,"BDA":38,"DS":40}},{"rollNo":"2025CS027","name":"Avani Pillai","branch":"Artificial Intelligence & DS","admissionYear":2025,"graduationYear":2029,"marks":{"OS":90,"JS":83,"DSA":96,"DBMS":78,"CN":71,"OOP":70,"DAA":80,"SE":94,"TOC":74,"COA":90,"WT":78,"MP":75,"AI":93,"CC":84,"IS":87,"CD":92,"BDA":83,"DS":87}},{"rollNo":"2025CS028","name":"Kunal Gokhale","branch":"Information Technology","admissionYear":2025,"graduationYear":2029,"marks":{"OS":35,"JS":42,"DSA":39,"DBMS":44,"CN":69,"OOP":37,"DAA":58,"SE":72,"TOC":70,"COA":18,"WT":22,"MP":43,"AI":37,"CC":54,"IS":58,"CD":37,"BDA":57,"DS":48}},{"rollNo":"2025CS029","name":"Tara Sundaram","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":76,"JS":62,"DSA":76,"DBMS":58,"CN":66,"OOP":79,"DAA":72,"SE":83,"TOC":82,"COA":68,"WT":74,"MP":78,"AI":59,"CC":84,"IS":84,"CD":62,"BDA":82,"DS":60}},{"rollNo":"2025CS030","name":"Manan Shah","branch":"Computer Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":35,"JS":43,"DSA":14,"DBMS":35,"CN":40,"OOP":26,"DAA":43,"SE":51,"TOC":27,"COA":37,"WT":38,"MP":16,"AI":52,"CC":33,"IS":20,"CD":31,"BDA":45,"DS":17}},{"rollNo":"2025CS031","name":"Ritika Agarwal","branch":"Information Technology","admissionYear":2025,"graduationYear":2029,"marks":{"OS":47,"JS":64,"DSA":57,"DBMS":54,"CN":49,"OOP":49,"DAA":36,"SE":47,"TOC":60,"COA":56,"WT":52,"MP":39,"AI":52,"CC":57,"IS":67,"CD":60,"BDA":69,"DS":56}},{"rollNo":"2025CS032","name":"Ayush Trivedi","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":70,"JS":73,"DSA":98,"DBMS":78,"CN":75,"OOP":88,"DAA":78,"SE":71,"TOC":73,"COA":89,"WT":83,"MP":81,"AI":93,"CC":95,"IS":80,"CD":83,"BDA":89,"DS":86}},{"rollNo":"2025CS033","name":"Bhavna Choudhary","branch":"Artificial Intelligence & DS","admissionYear":2025,"graduationYear":2029,"marks":{"OS":42,"JS":59,"DSA":71,"DBMS":47,"CN":51,"OOP":37,"DAA":62,"SE":35,"TOC":68,"COA":69,"WT":78,"MP":77,"AI":19,"CC":58,"IS":62,"CD":39,"BDA":77,"DS":56}},{"rollNo":"2025CS034","name":"Dhruv Mathur","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":55,"JS":42,"DSA":54,"DBMS":67,"CN":54,"OOP":61,"DAA":55,"SE":60,"TOC":53,"COA":70,"WT":43,"MP":47,"AI":61,"CC":59,"IS":46,"CD":71,"BDA":54,"DS":60}},{"rollNo":"2025CS035","name":"Esha Venkatesh","branch":"Information Technology","admissionYear":2025,"graduationYear":2029,"marks":{"OS":72,"JS":81,"DSA":55,"DBMS":64,"CN":64,"OOP":61,"DAA":68,"SE":80,"TOC":73,"COA":74,"WT":75,"MP":65,"AI":69,"CC":69,"IS":69,"CD":76,"BDA":61,"DS":71}},{"rollNo":"2025CS036","name":"Farhan Akhtar","branch":"Computer Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":65,"JS":45,"DSA":40,"DBMS":53,"CN":67,"OOP":56,"DAA":40,"SE":50,"TOC":54,"COA":49,"WT":47,"MP":44,"AI":36,"CC":37,"IS":50,"CD":65,"BDA":39,"DS":64}},{"rollNo":"2025CS037","name":"Gargi Samant","branch":"Artificial Intelligence & DS","admissionYear":2025,"graduationYear":2029,"marks":{"OS":83,"JS":98,"DSA":90,"DBMS":88,"CN":76,"OOP":92,"DAA":92,"SE":82,"TOC":85,"COA":82,"WT":77,"MP":74,"AI":90,"CC":92,"IS":70,"CD":98,"BDA":94,"DS":97}},{"rollNo":"2025CS038","name":"Himanshu Pandey","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":41,"JS":28,"DSA":62,"DBMS":49,"CN":46,"OOP":68,"DAA":64,"SE":38,"TOC":70,"COA":50,"WT":42,"MP":64,"AI":43,"CC":64,"IS":26,"CD":24,"BDA":70,"DS":73}},{"rollNo":"2025CS039","name":"Ishita Bose","branch":"Information Technology","admissionYear":2025,"graduationYear":2029,"marks":{"OS":65,"JS":85,"DSA":79,"DBMS":83,"CN":69,"OOP":74,"DAA":81,"SE":78,"TOC":83,"COA":71,"WT":68,"MP":81,"AI":84,"CC":72,"IS":69,"CD":83,"BDA":60,"DS":78}},{"rollNo":"2025CS040","name":"Jayant Nanda","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":65,"JS":63,"DSA":51,"DBMS":50,"CN":52,"OOP":68,"DAA":66,"SE":50,"TOC":52,"COA":63,"WT":39,"MP":53,"AI":50,"CC":52,"IS":56,"CD":55,"BDA":69,"DS":40}},{"rollNo":"2025CS041","name":"Kriti Sanon","branch":"Artificial Intelligence & DS","admissionYear":2025,"graduationYear":2029,"marks":{"OS":74,"JS":74,"DSA":77,"DBMS":82,"CN":92,"OOP":74,"DAA":92,"SE":76,"TOC":72,"COA":83,"WT":83,"MP":80,"AI":87,"CC":84,"IS":83,"CD":71,"BDA":76,"DS":96}},{"rollNo":"2025CS042","name":"Lakshya Singhal","branch":"Information Technology","admissionYear":2025,"graduationYear":2029,"marks":{"OS":43,"JS":20,"DSA":48,"DBMS":52,"CN":14,"OOP":48,"DAA":42,"SE":21,"TOC":30,"COA":41,"WT":18,"MP":42,"AI":43,"CC":22,"IS":47,"CD":49,"BDA":37,"DS":45}},{"rollNo":"2025CS043","name":"Maya Krishnan","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":62,"JS":63,"DSA":68,"DBMS":70,"CN":55,"OOP":67,"DAA":65,"SE":76,"TOC":76,"COA":80,"WT":67,"MP":78,"AI":60,"CC":81,"IS":69,"CD":84,"BDA":59,"DS":74}},{"rollNo":"2025CS044","name":"Nakul Shenoy","branch":"Computer Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":69,"JS":36,"DSA":60,"DBMS":25,"CN":71,"OOP":77,"DAA":36,"SE":40,"TOC":76,"COA":62,"WT":43,"MP":64,"AI":46,"CC":38,"IS":51,"CD":59,"BDA":21,"DS":48}},{"rollNo":"2025CS045","name":"Ojasvi Bhatia","branch":"Artificial Intelligence & DS","admissionYear":2025,"graduationYear":2029,"marks":{"OS":84,"JS":80,"DSA":80,"DBMS":94,"CN":98,"OOP":82,"DAA":78,"SE":94,"TOC":96,"COA":83,"WT":78,"MP":96,"AI":72,"CC":85,"IS":70,"CD":93,"BDA":87,"DS":71}},{"rollNo":"2025CS046","name":"Parth Soman","branch":"Information Technology","admissionYear":2025,"graduationYear":2029,"marks":{"OS":57,"JS":49,"DSA":39,"DBMS":37,"CN":36,"OOP":50,"DAA":47,"SE":36,"TOC":44,"COA":50,"WT":43,"MP":65,"AI":42,"CC":71,"IS":48,"CD":64,"BDA":51,"DS":58}},{"rollNo":"2025CS047","name":"Radhika Apte","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":60,"JS":74,"DSA":74,"DBMS":85,"CN":78,"OOP":77,"DAA":58,"SE":79,"TOC":81,"COA":60,"WT":85,"MP":64,"AI":58,"CC":73,"IS":55,"CD":84,"BDA":64,"DS":73}},{"rollNo":"2025CS048","name":"Sameer Kadam","branch":"Computer Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":59,"JS":60,"DSA":47,"DBMS":39,"CN":72,"OOP":50,"DAA":41,"SE":54,"TOC":42,"COA":71,"WT":37,"MP":57,"AI":69,"CC":62,"IS":58,"CD":39,"BDA":67,"DS":56}},{"rollNo":"2025CS049","name":"Trisha Mukherjee","branch":"Information Technology","admissionYear":2025,"graduationYear":2029,"marks":{"OS":35,"JS":61,"DSA":66,"DBMS":41,"CN":62,"OOP":58,"DAA":75,"SE":64,"TOC":44,"COA":62,"WT":46,"MP":68,"AI":76,"CC":52,"IS":74,"CD":69,"BDA":65,"DS":23}},{"rollNo":"2025CS050","name":"Utkarsh Dixit","branch":"Computer Science & Engineering","admissionYear":2025,"graduationYear":2029,"marks":{"OS":20,"JS":48,"DSA":18,"DBMS":40,"CN":27,"OOP":37,"DAA":27,"SE":32,"TOC":18,"COA":44,"WT":17,"MP":44,"AI":23,"CC":49,"IS":51,"CD":42,"BDA":40,"DS":30}}];

let students = clone(SAMPLE_DATA);
let subjects = [...SAMPLE_SUBJECTS];
let isSampleData = true;
let filteredForExport = [];

function clone(x) { return JSON.parse(JSON.stringify(x)); }
function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[ch]));
}
function niceNumber(n) { return Number(n || 0).toLocaleString("en-IN"); }
function pct(n, d) { return d ? (100 * n / d) : 0; }
function pctText(n) { return `${n.toFixed(1)}%`; }

function assess(student) {
  const marks = subjects.map(subject => ({ subject, mark: student.marks[subject] }));
  const valid = marks.filter(x => typeof x.mark === "number" && Number.isFinite(x.mark));
  const missing = marks.length - valid.length;
  const failed = valid.filter(x => x.mark < PASS_MARK);
  const total = valid.reduce((sum, x) => sum + x.mark, 0);
  const percentage = valid.length ? total / (valid.length * 100) * 100 : 0;
  let result, atktEligibility, statusKey;
  if (missing > 0 || valid.length === 0) {
    result = "INCOMPLETE DATA"; atktEligibility = "Cannot determine"; statusKey = "incomplete";
  } else if (failed.length === 0) {
    result = "PASS"; atktEligibility = "Not required"; statusKey = "clear";
  } else if (failed.length <= MAX_ATKT_BACKLOGS) {
    result = "PROMOTED WITH ATKT"; atktEligibility = "Eligible for ATKT"; statusKey = "atkt";
  } else {
    result = "FAIL (YEAR DOWN)"; atktEligibility = "Not eligible"; statusKey = "year-down";
  }
  return {
    ...student, assessedMarks: marks, validCount: valid.length, missingCount: missing,
    failedSubjects: failed, backlogCount: failed.length, totalMarks: total,
    percentage, result, atktEligibility, statusKey
  };
}
function allAssessed() {
  return students.map(assess).sort((a,b) =>
    Number(a.admissionYear || 0) - Number(b.admissionYear || 0) ||
    String(a.rollNo).localeCompare(String(b.rollNo))
  );
}
function statusBadge(s) {
  const styles = {
    clear: "text-bg-success", atkt: "text-bg-warning",
    "year-down":"text-bg-danger", incomplete:"text-bg-secondary"
  };
  const labels = {
    clear:"No backlogs", atkt:"Has ATKT", "year-down":"4+ backlogs", incomplete:"Incomplete"
  };
  return `<span class="badge rounded-pill status-badge ${styles[s.statusKey]}">${labels[s.statusKey]}</span>`;
}
function resultBadge(s) {
  const styles = {clear:"text-bg-success",atkt:"text-bg-warning","year-down":"text-bg-danger",incomplete:"text-bg-secondary"};
  return `<span class="badge rounded-pill status-badge ${styles[s.statusKey]}">${esc(s.result)}</span>`;
}
function computeSummary(data) {
  const complete = data.filter(s => s.statusKey !== "incomplete");
  const pass = data.filter(s => s.statusKey === "clear").length;
  const atkt = data.filter(s => s.statusKey === "atkt").length;
  const yearDown = data.filter(s => s.statusKey === "year-down").length;
  const incomplete = data.length - complete.length;
  const validSubjectMarks = data.reduce((sum,s)=>sum+s.validCount,0);
  const failedSubjectMarks = data.reduce((sum,s)=>sum+s.backlogCount,0);
  return {
    total:data.length, complete:complete.length, pass, atkt, yearDown, incomplete,
    studentPassRate:pct(pass,complete.length),
    studentYearDownRate:pct(yearDown,complete.length),
    studentAtktRate:pct(atkt,complete.length),
    validSubjectMarks, failedSubjectMarks,
    subjectPassed:validSubjectMarks-failedSubjectMarks,
    subjectPassRate:pct(validSubjectMarks-failedSubjectMarks,validSubjectMarks),
    subjectFailRate:pct(failedSubjectMarks,validSubjectMarks)
  };
}
function metricCard(label, value, hint, color) {
  return `<div class="col-6 col-xl-2"><div class="metric-card">
    <div class="metric-label"><span class="metric-dot" style="background:${color}"></span>${label}</div>
    <div class="metric-value mt-2">${value}</div><div class="metric-hint mt-1">${hint}</div>
  </div></div>`;
}
function setOptions(id, values, firstLabel) {
  const element = document.getElementById(id);
  const previous = element.value;
  element.innerHTML = `<option value="all">${esc(firstLabel)}</option>` + values.map(v =>
    `<option value="${esc(v)}">${esc(v)}</option>`).join("");
  if (values.map(String).includes(previous)) element.value = previous;
}
function refreshFilters(data) {
  const years = [...new Set(data.map(s=>String(s.admissionYear || "Unknown")))].sort((a,b)=>Number(a)-Number(b));
  const branches = [...new Set(data.map(s=>s.branch || "Unknown"))].sort((a,b)=>a.localeCompare(b));
  setOptions("yearFilter",years,"All years");
  setOptions("branchFilter",branches,"All branches");
}
function renderKpis(data) {
  const sum = computeSummary(data);
  document.getElementById("kpiCards").innerHTML = [
    metricCard("Total students",niceNumber(sum.total),"Rows imported","#526581"),
    metricCard("Passed",niceNumber(sum.pass),`${pctText(sum.studentPassRate)} of complete students`,"#198754"),
    metricCard("ATKT eligible",niceNumber(sum.atkt),`${pctText(sum.studentAtktRate)} of complete students`,"#d99a00"),
    metricCard("Year down",niceNumber(sum.yearDown),`${pctText(sum.studentYearDownRate)} of complete students`,"#dc3545"),
    metricCard("Subject pass rate",pctText(sum.subjectPassRate),`${niceNumber(sum.subjectPassed)} of ${niceNumber(sum.validSubjectMarks)} marks`,"#0d6efd"),
    metricCard("Subject fail rate",pctText(sum.subjectFailRate),`${niceNumber(sum.failedSubjectMarks)} failed subjects`,"#8b5cf6")
  ].join("");
  document.getElementById("completeCount").textContent = `${sum.complete} complete`;
  document.getElementById("datasetBadge").textContent = `${isSampleData ? "Sample" : "Imported"} dataset · ${sum.total} students`;
  document.getElementById("subjectTotals").textContent = `${niceNumber(sum.subjectPassed)} passed · ${niceNumber(sum.failedSubjectMarks)} failed`;
}
function renderOutcome(data) {
  const sum = computeSummary(data);
  const items = [
    {label:"Passed all subjects",n:sum.pass,color:"bg-success",p:pct(sum.pass,sum.total)},
    {label:"Promoted with ATKT",n:sum.atkt,color:"bg-warning",p:pct(sum.atkt,sum.total)},
    {label:"Year down (4+ backs)",n:sum.yearDown,color:"bg-danger",p:pct(sum.yearDown,sum.total)},
    {label:"Incomplete marks",n:sum.incomplete,color:"bg-secondary",p:pct(sum.incomplete,sum.total)}
  ];
  document.getElementById("outcomeBars").innerHTML = items.map(x => `
    <div class="rate-row">
      <div class="rate-label">${x.label}</div>
      <div class="progress" role="progressbar" aria-label="${x.label}" aria-valuenow="${x.p}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar ${x.color}" style="width:${x.p}%"></div>
      </div>
      <div class="rate-number">${x.n}</div>
    </div>`).join("") + `<div class="small subtle mt-3">Student pass rate excludes records with incomplete marks; year-down rate is based on 4 or more backlogs.</div>`;
}
function renderCohorts(data) {
  const years = [...new Set(data.map(s=>String(s.admissionYear || "Unknown")))].sort((a,b)=>Number(a)-Number(b));
  document.getElementById("cohortRows").innerHTML = years.map(year => {
    const group = data.filter(s=>String(s.admissionYear || "Unknown")===year);
    const pass = group.filter(s=>s.statusKey==="clear").length;
    const atkt = group.filter(s=>s.statusKey==="atkt").length;
    const yd = group.filter(s=>s.statusKey==="year-down").length;
    return `<tr><td class="ps-3 fw-semibold">${esc(year)}</td><td>${group.length}</td><td class="text-success fw-semibold">${pass}</td><td class="text-warning-emphasis fw-semibold">${atkt}</td><td class="pe-3 text-danger fw-semibold">${yd}</td></tr>`;
  }).join("") || `<tr><td colspan="5" class="text-center subtle p-3">No records</td></tr>`;
}
function getFilteredData() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const year = document.getElementById("yearFilter").value;
  const branch = document.getElementById("branchFilter").value;
  const status = document.getElementById("statusFilter").value;
  const data = allAssessed().filter(s => {
    const matchesQuery = !query || `${s.name} ${s.rollNo} ${s.branch}`.toLowerCase().includes(query);
    const matchesYear = year === "all" || String(s.admissionYear || "Unknown") === year;
    const matchesBranch = branch === "all" || (s.branch || "Unknown") === branch;
    const matchesStatus = status === "all" || s.statusKey === status;
    return matchesQuery && matchesYear && matchesBranch && matchesStatus;
  });
  const sort = document.getElementById("sortFilter").value;
  data.sort((a,b) => {
    if(sort==="year-desc") return Number(b.admissionYear||0)-Number(a.admissionYear||0)||String(a.rollNo).localeCompare(String(b.rollNo));
    if(sort==="backs-desc") return b.backlogCount-a.backlogCount||Number(a.admissionYear||0)-Number(b.admissionYear||0);
    if(sort==="name-asc") return String(a.name).localeCompare(String(b.name));
    return Number(a.admissionYear||0)-Number(b.admissionYear||0)||String(a.rollNo).localeCompare(String(b.rollNo));
  });
  return data;
}
function studentTableRows(data) {
  if(!data.length) return `<tr><td colspan="8"><div class="empty-state">No students match these filters.</div></td></tr>`;
  return data.map((s,idx) => {
    const missingNote = s.missingCount ? `<div class="small text-danger">${s.missingCount} missing</div>` : "";
    const failedList = s.failedSubjects.length
      ? s.failedSubjects.map(x=>`${esc(x.subject)} (${esc(x.mark)})`).join(", ")
      : "No failed subjects found.";
    const detailsId = `student-detail-${idx}`;
    return `<tr>
      <td class="ps-3">${esc(s.admissionYear || "Unknown")}</td>
      <td><div class="student-name">${esc(s.name)}</div><div class="roll">${esc(s.rollNo)}</div>
        <button class="btn btn-link btn-sm p-0 mt-1 text-decoration-none" type="button" data-bs-toggle="collapse" data-bs-target="#${detailsId}" aria-expanded="false">Details</button>
      </td>
      <td>${esc(s.branch || "Unknown")}</td>
      <td><div class="fw-semibold">${s.validCount ? pctText(s.percentage) : "—"}</div><div class="small subtle">${niceNumber(s.totalMarks)} / ${niceNumber(s.validCount*100)}</div>${missingNote}</td>
      <td class="fw-bold">${s.backlogCount}</td>
      <td>${statusBadge(s)}</td>
      <td><span class="small">${esc(s.atktEligibility)}</span></td>
      <td class="pe-3">${resultBadge(s)}</td>
    </tr>
    <tr class="collapse bg-light" id="${detailsId}"><td colspan="8" class="px-4 py-3">
      <div class="fw-semibold small mb-1">Failed subjects and marks</div><div class="small">${failedList}</div>
      <div class="small subtle mt-2">Graduation year: ${esc(s.graduationYear || "—")} · Valid marks: ${s.validCount}/${subjects.length}</div>
    </td></tr>`;
  }).join("");
}
function renderStudentTable() {
  const data = getFilteredData();
  filteredForExport = data;
  document.getElementById("studentRows").innerHTML = studentTableRows(data);
  document.getElementById("tableCount").textContent = `Showing ${data.length} of ${students.length} students`;
}
function renderSubjectAnalytics(data) {
  const attempted = {}, failures = {};
  subjects.forEach(subject => { attempted[subject]=0; failures[subject]=0; });
  data.forEach(s => subjects.forEach(subject => {
    const m = s.marks[subject];
    if(typeof m === "number" && Number.isFinite(m)) {
      attempted[subject] += 1;
      if(m < PASS_MARK) failures[subject] += 1;
    }
  }));
  const totalAttempts = Object.values(attempted).reduce((a,b)=>a+b,0);
  const totalFails = Object.values(failures).reduce((a,b)=>a+b,0);
  const validPass = totalAttempts-totalFails;
  document.getElementById("subjectOverallBars").innerHTML = `
    <div class="rate-row"><div class="rate-label">Passed marks</div><div class="progress"><div class="progress-bar bg-success" style="width:${pct(validPass,totalAttempts)}%"></div></div><div class="rate-number">${pctText(pct(validPass,totalAttempts))}</div></div>
    <div class="rate-row"><div class="rate-label">Failed marks</div><div class="progress"><div class="progress-bar bg-danger" style="width:${pct(totalFails,totalAttempts)}%"></div></div><div class="rate-number">${pctText(pct(totalFails,totalAttempts))}</div></div>
    <div class="small subtle mt-3">${niceNumber(totalAttempts)} valid subject marks counted across ${data.length} student records.</div>`;
  document.getElementById("subjectRows").innerHTML = subjects.map(subject => ({
      subject, appeared:attempted[subject], failed:failures[subject],
      passed:attempted[subject]-failures[subject],
      rate:pct(attempted[subject]-failures[subject],attempted[subject])
    })).sort((a,b)=>b.failed-a.failed || a.subject.localeCompare(b.subject)).map(x=>`
      <tr><td class="fw-semibold">${esc(x.subject)}</td><td>${x.appeared}</td><td class="text-success">${x.passed}</td><td class="${x.failed?'text-danger fw-semibold':''}">${x.failed}</td><td>${pctText(x.rate)}</td></tr>
    `).join("");
}
function renderAll() {
  const data = allAssessed();
  renderKpis(data);
  renderOutcome(data);
  renderCohorts(data);
  renderStudentTable();
  renderSubjectAnalytics(data);
}
function parseCSV(text) {
  const rows=[]; let row=[], field="", inQuotes=false;
  text = text.replace(/^\uFEFF/,"");
  for(let i=0;i<text.length;i++) {
    const ch=text[i];
    if(inQuotes) {
      if(ch==='"' && text[i+1]==='"') { field+='"'; i++; }
      else if(ch==='"') inQuotes=false;
      else field+=ch;
    } else {
      if(ch==='"') inQuotes=true;
      else if(ch===",") { row.push(field); field=""; }
      else if(ch==="\n") { row.push(field.replace(/\r$/,"")); rows.push(row); row=[]; field=""; }
      else field+=ch;
    }
  }
  row.push(field.replace(/\r$/,""));
  if(row.some(v=>v.trim()!=="")) rows.push(row);
  return rows;
}
function normalizeHeader(value) {
  return String(value || "").replace(/^\uFEFF/,"").trim().toLowerCase().replace(/\s+/g," ");
}
function parseMark(value) {
  const v=String(value ?? "").trim().toUpperCase();
  if(!v || ["-","--","—","N/A","NA","NULL"].includes(v)) return null;
  if(["AB","ABSENT","A"].includes(v)) return 0;
  const number=Number(v);
  return Number.isFinite(number) && number>=0 ? number : null;
}
function importCSV(text) {
  const rows=parseCSV(text);
  const headerIndex=rows.findIndex(row=>{
    const h=row.map(normalizeHeader);
    return h.includes("roll no.") && h.includes("student name") && h.includes("admission year");
  });
  if(headerIndex<0) throw new Error('Could not find the header row. Export the "Consolidated Master (Sem 1-6)" sheet as CSV.');
  const headers=rows[headerIndex].map(v=>String(v||"").trim());
  const normalized=headers.map(normalizeHeader);
  const idx = label => normalized.indexOf(label);
  const rollIdx=idx("roll no."), nameIdx=idx("student name"), branchIdx=idx("branch");
  const admissionIdx=idx("admission year"), graduationIdx=idx("graduation year");
  const marksStart=graduationIdx+1;
  let marksEnd=normalized.findIndex((v,i)=>i>marksStart && (v.startsWith("total marks") || v==="percentage" || v==="total backlogs"));
  if(marksEnd<0) marksEnd=headers.length;
  const cols=[];
  for(let i=marksStart;i<marksEnd;i++) {
    const name=headers[i].trim();
    if(name) cols.push({index:i,name});
  }
  if(!cols.length) throw new Error("No subject columns found after Graduation Year.");
  const next=[];
  for(let i=headerIndex+1;i<rows.length;i++) {
    const row=rows[i];
    const roll=String(row[rollIdx]||"").trim();
    const name=String(row[nameIdx]||"").trim();
    const branch=String(row[branchIdx]||"").trim();
    if(!roll || !name) continue; // ignores batch-averages/summary rows
    const marks={}; let found=0;
    for(const col of cols) {
      const mark=parseMark(row[col.index]);
      marks[col.name]=mark;
      if(mark!==null) found++;
    }
    if(!found) continue;
    const admissionRaw=String(row[admissionIdx]||"").trim();
    const rollYear=(roll.match(/^(19|20)\d{2}/)||[])[0];
    const admissionYear=admissionRaw ? (Number.isFinite(Number(admissionRaw))?Number(admissionRaw):admissionRaw) : (rollYear||"Unknown");
    const graduationRaw=String(row[graduationIdx]||"").trim();
    next.push({
      rollNo:roll, name, branch:branch||"Unknown",
      admissionYear, graduationYear:graduationRaw,
      marks
    });
  }
  if(!next.length) throw new Error("No student rows were found. Check the CSV format and data rows.");
  subjects=cols.map(c=>c.name);
  students=next;
}
function toSafeCsv(value) {
  let s=String(value ?? "");
  if(/^[=+\-@]/.test(s)) s="'"+s;
  return `"${s.replace(/"/g,'""')}"`;
}
function exportFilteredCSV() {
  const header=["Admission Year","Roll No.","Student Name","Branch","Percentage","Backlogs","Backlog Status","ATKT Eligibility","Final Result","Failed Subjects"];
  const rows=[header];
  filteredForExport.forEach(s=>rows.push([
    s.admissionYear,s.rollNo,s.name,s.branch,s.validCount?pctText(s.percentage):"",
    s.backlogCount,s.backlogCount===0?"No backlogs":`Has ${s.backlogCount} backlogs`,
    s.atktEligibility,s.result,s.failedSubjects.map(x=>`${x.subject} (${x.mark})`).join("; ")
  ]));
  const csv="\uFEFF"+rows.map(row=>row.map(toSafeCsv).join(",")).join("\r\n");
  const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"}));
  const a=document.createElement("a"); a.href=url; a.download="student_backlog_analytics.csv"; a.click();
  URL.revokeObjectURL(url);
}
document.getElementById("searchInput").addEventListener("input",renderStudentTable);
["yearFilter","branchFilter","statusFilter","sortFilter"].forEach(id=>document.getElementById(id).addEventListener("change",renderStudentTable));
document.getElementById("exportBtn").addEventListener("click",exportFilteredCSV);
document.getElementById("resetBtn").addEventListener("click",()=>{
  students=clone(SAMPLE_DATA); subjects=[...SAMPLE_SUBJECTS]; isSampleData=true;
  document.getElementById("searchInput").value="";
  document.getElementById("statusFilter").value="all";
  document.getElementById("sortFilter").value="year-asc";
  document.getElementById("importMessage").textContent="Sample dataset restored.";
  refreshFilters(allAssessed()); renderAll();
});
document.getElementById("loadCsvBtn").addEventListener("click",async()=>{
  const file=document.getElementById("csvFile").files[0];
  const message=document.getElementById("importMessage");
  if(!file) { message.textContent="Choose a CSV file first."; return; }
  try {
    const text=await file.text();
    importCSV(text); isSampleData=false;
    document.getElementById("searchInput").value="";
    document.getElementById("statusFilter").value="all";
    refreshFilters(allAssessed()); renderAll();
    const missing=allAssessed().reduce((sum,s)=>sum+s.missingCount,0);
    message.textContent=`Loaded ${students.length} students and ${subjects.length} subject columns from "${file.name}". ${missing ? missing+" marks are missing/invalid and those records are labeled Incomplete." : "All subject marks are present."}`;
    message.className="small mt-3 text-success";
  } catch(err) {
    message.textContent=err.message || "Could not import this file.";
    message.className="small mt-3 text-danger";
  }
});
refreshFilters(allAssessed());
renderAll();
