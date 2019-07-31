const { Router } = require("express");
const Team = require("./model");

const router = new Router();
router.get("/team", (req, res, next) =>
  Team.findAll()
    .then(teams => {
      return res.json({ teams: teams });
    })
    .catch(error => next(error))
);

// Create a new team
router.post("/team", (req, res, next) => {
  Team.create(req.body)
    .then(name => res.json(name))
    .catch(next);
});

//Get a team information
router.get("/team/:teamId", (req, res, next) => {
  Team.findByPk(req.params.teamId)
    .then(team => {
      if (!team) {
        res.status(404).end();
      } else {
        res.json(team);
      }
    })
    .catch(next);
});

module.exports = router;
