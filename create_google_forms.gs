function createBothForms() {
  var studentForm = createStudentForm();
  var investorForm = createInvestorForm();
  Logger.log("=== FORMS CREATED ===");
  Logger.log("Student Application: " + studentForm.getPublishedUrl());
  Logger.log("Student Edit URL: " + studentForm.getEditUrl());
  Logger.log("Investor Interest: " + investorForm.getPublishedUrl());
  Logger.log("Investor Edit URL: " + investorForm.getEditUrl());
}

function createStudentForm() {
  var form = FormApp.create("BASICS — Student Application");
  form.setDescription("Berkeley Accelerator & Startup Incubator in Cognitive Science\n\nApply to join the BASICS campaign — an 8-week founder-readiness course at UC Berkeley (COGSCI 198).\n\nYou must use your @berkeley.edu email to submit this form.");
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setRequireLogin(true);
  form.setConfirmationMessage("Thanks for applying to BASICS! We will review your application and get back to you within 5 business days.\n\nQuestions? Email mikejacobs@berkeley.edu");
  form.addTextItem().setTitle("Full Name").setRequired(true);
  form.addTextItem().setTitle("Berkeley Email (@berkeley.edu)").setRequired(true);
  form.addMultipleChoiceItem().setTitle("Year at Berkeley").setChoiceValues(["Freshman", "Sophomore", "Junior", "Senior", "Graduate Student", "Recent Alumni (within 2 years)"]).setRequired(true);
  form.addTextItem().setTitle("Major / Department").setRequired(true);
  form.addParagraphTextItem().setTitle("What problem do you want to solve? (2-3 sentences)").setRequired(true);
  form.addMultipleChoiceItem().setTitle("Where are you right now?").setChoiceValues(["Just an idea", "Talking to potential users", "Built a prototype / MVP", "Have paying customers or users", "Applied to or in an accelerator"]).setRequired(true);
  form.addParagraphTextItem().setTitle("Why BASICS? What do you hope to get out of the 8-week campaign?").setRequired(true);
  form.addMultipleChoiceItem().setTitle("Do you have a co-founder or team?").setChoiceValues(["Solo founder", "Have a co-founder", "Have a team (3+)", "Looking for a co-founder"]).setRequired(true);
  ScriptApp.newTrigger("onStudentSubmit").forForm(form).onFormSubmit().create();
  return form;
}

function createInvestorForm() {
  var form = FormApp.create("BASICS — Investor Interest");
  form.setDescription("Berkeley Accelerator & Startup Incubator in Cognitive Science\n\nInterested in connecting with BASICS founders? Tell us about yourself.\n\nBASICS founders who pass the Ready Gate earn curated introductions to our investor network.");
  form.setCollectEmail(true);
  form.setConfirmationMessage("Thanks for your interest! Mike Jacobs will follow up personally.\n\nQuestions? Email mikejacobs@berkeley.edu");
  form.addTextItem().setTitle("Full Name").setRequired(true);
  form.addTextItem().setTitle("Email").setRequired(true);
  form.addTextItem().setTitle("Firm / Organization").setRequired(true);
  form.addTextItem().setTitle("Your Role / Title").setRequired(true);
  form.addMultipleChoiceItem().setTitle("Typical check size for early-stage").setChoiceValues(["Under 25K (angel)", "25K - 100K", "100K - 500K", "500K - 2M", "2M+", "Not investing — just want to mentor or advise"]).setRequired(true);
  form.addCheckboxItem().setTitle("Sectors of interest").setChoiceValues(["AI / ML", "Defense / Gov Tech", "EdTech", "Enterprise SaaS", "Consumer", "Health / Biotech", "Climate / Energy", "Hardware / Robotics", "Fintech", "Open to anything"]).setRequired(true);
  form.addMultipleChoiceItem().setTitle("Connection to Berkeley").setChoiceValues(["Berkeley alum", "Current faculty or staff", "Berkeley parent", "No direct connection", "Referred by someone"]).setRequired(true);
  form.addParagraphTextItem().setTitle("Anything else?").setRequired(false);
  ScriptApp.newTrigger("onInvestorSubmit").forForm(form).onFormSubmit().create();
  return form;
}

function onStudentSubmit(e) {
  var r = e.response.getItemResponses();
  var body = "New BASICS Student Application\n\n";
  for (var i = 0; i < r.length; i++) { body += r[i].getItem().getTitle() + ": " + r[i].getResponse() + "\n\n"; }
  body += "Email: " + e.response.getRespondentEmail() + "\nTime: " + e.response.getTimestamp();
  MailApp.sendEmail("mikejacobs@berkeley.edu", "BASICS Application: " + r[0].getResponse(), body);
}

function onInvestorSubmit(e) {
  var r = e.response.getItemResponses();
  var body = "New BASICS Investor Interest\n\n";
  for (var i = 0; i < r.length; i++) { body += r[i].getItem().getTitle() + ": " + r[i].getResponse() + "\n\n"; }
  body += "Email: " + e.response.getRespondentEmail() + "\nTime: " + e.response.getTimestamp();
  MailApp.sendEmail("mikejacobs@berkeley.edu", "BASICS Investor: " + r[0].getResponse(), body);
}
