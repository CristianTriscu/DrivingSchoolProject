export default function permit(...permittedRoles) {
  return (req, res, next) => {
    const  userRole  = req.body.userRole;

    if (userRole && permittedRoles.includes(userRole)) {
      next();
    } else {
    
      res.status(403).json({ message: "Forbidden" });
    }
  };
}
