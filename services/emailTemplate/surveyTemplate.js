const keys = require("../../config/keys");
module.exports = survey => {
  return `
  <html>
    <div style="text-align:center">
      <h3>Feedback</h3>
      <p>Please answer survey question</p>
      <p>${survey.body}</p>
      <div>
        <a href="${keys.REDIRECT_DOMAIN}/api/surveys/${survey.id}/yes">Yes</a>
        <a href="${keys.REDIRECT_DOMAIN}/api/surveys/${survey.id}/no">No</a>
      </div>
    </div>
  </html>`;
};
