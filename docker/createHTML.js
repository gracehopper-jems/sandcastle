const createHTML = (userHTML) => {
  const html = `<!DOCTYPE html>
  <html>
    <head>
      <title>My Tiny App</title>
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
      ${userHTML}
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="userJS.js"></script>
    </body>
  </html>`;

  return html;
};

module.exports = createHTML;
