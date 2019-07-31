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

//Get a teams information
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

//Update a teams information
router.put("/team/:teamId", (req, res, next) => {
  Team.findByPk(req.params.teamId)
    .then(team => {
      if (team) {
        return team.update(req.body).then(team => res.json(team));
      }
      return res.status(404).end();
    })
    .catch(next);
});

router.delete("/team/:teamId", (req, res, next) => {
  Team.destroy({
    where: {
      id: req.params.teamId
    }
  })
    .then(numDeleted => {
      if (numDeleted) {
        res.send({ numDeleted });
      }
      return res.status(404).end();
    })
    .catch(next);
});

module.exports = router;
