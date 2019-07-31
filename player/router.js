const { Router } = require("express");
const Player = require("./model");
const Team = require("../team/model");
const City = require("../city/model");

const router = new Router();
router.get("/player", (req, res, next) =>
  Player.findAll()
    .then(players => {
      return res.json({ players: players });
    })
    .catch(error => next(error))
);

// Create a new player
router.post("/player", (req, res, next) => {
  Player.create(req.body)
    .then(name => res.json(name))
    .catch(next);
});

//Get a players information
router.get("/player/:playerId", (req, res, next) => {
  Player.findByPk(req.params.playerId, { include: [Team, City] })
    .then(player => {
      if (!player) {
        res.status(404).end();
      } else {
        res.json(player);
      }
    })
    .catch(next);
});

//Update a players information
router.put("/player/:playerId", (req, res, next) => {
  Player.findByPk(req.params.playerId)
    .then(player => {
      if (player) {
        return player.update(req.body).then(player => res.json(player));
      }
      return res.status(404).end();
    })
    .catch(next);
});

router.delete("/player/:playerId", (req, res, next) => {
  Player.destroy({
    where: {
      id: req.params.playerId
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

// Post.findAll({
//   where: {
//     authorId: 2
//   }
// });

module.exports = router;
