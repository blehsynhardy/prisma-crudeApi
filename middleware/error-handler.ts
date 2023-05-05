const error = (err, req, res, next) => {
    if (err.type === "auth") {
      res.status(401);
      res.json({ message: "nope" });
    } else if(err.type === "input") {
        res.status(401)
        res.json({message : "incorrect input"});
    }
  }

  export default error
  