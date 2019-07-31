const { Router } = require("express");
const City = require("./model");

const router = new Router();
router.get("/city", (req, res, next) =>
  City.findAll()
    .then(cities => {
      return res.json({ cities: cities });
    })
    .catch(error => next(error))
);

// Create a new city
router.post("/city", (req, res, next) => {
  City.create(req.body)
    .then(name => res.json(name))
    .catch(next);
});

//Get a citys information
router.get("/city/:cityId", (req, res, next) => {
  City.findByPk(req.params.cityId)
    .then(city => {
      if (!city) {
        res.status(404).end();
      } else {
        res.json(city);
      }
    })
    .catch(next);
});

//Update a citys information
router.put("/city/:cityId", (req, res, next) => {
  City.findByPk(req.params.cityId)
    .then(city => {
      if (city) {
        return city.update(req.body).then(city => res.json(city));
      }
      return res.status(404).end();
    })
    .catch(next);
});

router.delete("/city/:cityId", (req, res, next) => {
  City.destroy({
    where: {
      id: req.params.cityId
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
