const createHTML = (userHTML) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <title>My Tiny App</title>
      <link rel="stylesheet" href="style.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
      <script src="userBundle.js"></script>
    </head>
    <body>
      ${userHTML}
    </body>
  </html>`;
};

module.exports = createHTML;
