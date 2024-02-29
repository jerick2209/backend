const jwt = require("jsonwebtoken");
function getRolefromToken(AuthToken) {
  if (!AuthToken) return null
  const token = AuthToken.split(" ")[1];
  const decoded = jwt.decode(token);
  console.log(decoded)
  return decoded.user.role;
}

module.exports = {
  getRolefromToken,
};
