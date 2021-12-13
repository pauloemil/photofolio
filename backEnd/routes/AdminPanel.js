const Router = require("express").Router();
const verify = require("../middlewheres/JsonWebTokenVerification");
const Agency = require("../models/PhotographyAgency");
const Photographer = require("../models/Photographer");
const Services = require("../models/Services");
const Images = require("../models/Images");

// TODO: -Add validators -Edit the responses

// services routes
Router.post("/service", verify, (req, res) => {
  let service = req.body;
  Services.create(
    {
      name: service.name,
      background: service.background,
      words: service.words,
      agencyId: req.Agency._id,
    },
    (err, newService) => {
      if (err) {
        res.json(err);
        console.log(err);
      } else res.json(newService);
    }
  );
});
Router.put("/service", verify, (req, res) => {
  let service = req.body;
  Services.findOneAndUpdate(
    { agencyId: req.Agency._id, _id: service.id },
    {
      name: service.name,
      background: service.background,
      words: service.words,
    },
    (err, newService) => {
      if (err) {
        res.json(err);
        console.log(err);
      } else if (!newService) res.sendStatus(404);
      else res.json(newService);
    }
  );
});
Router.delete("/service", verify, (req, res) => {
  let service = req.body;
  Services.findOneAndDelete(
    { _id: service.id, agencyId: req.Agency._id },
    (err, service) => {
      if (err) {
        res.json(err);
        console.log(err);
      } else if (!service) res.sendStatus(404);
      else res.json(service);
    }
  );
});
Router.get("/service", verify, (req, res) => {
  let find = { agencyId: req.Agency._id };
  if (req.query.id) find._id = req.query.id;
  console.log(find);
  Services.find(find, (err, services) => {
    if (err) {
      res.json(err);
      console.log(err);
    } else if (!services) res.sendStatus(404);
    else res.json(services);
  });
});

// photographer routes
Router.post("/photographer", verify, (req, res) => {
  let body = req.body;
  body.agencyId = req.Agency._id;
  Photographer.create(body, (err, photographer) => {
    if (err) {
      res.json(err);
      console.log(err);
    } else {
      // Agency.findByIdAndUpdate(
      //   req.Agency._id,
      //   { $push: { photographer: photographer } },
      //   (err, agency) => {
      //     if (err) {
      //       res.json(err);
      //       console.log(err);
      //     } else if (!agency) res.sendStatus(401);
      //     else res.json(agency);
      //   }
      // );
      res.json(photographer);
    }
  });
});
Router.delete("/photographer", verify, (req, res) => {
  Photographer.findOneAndDelete(
    { _id: req.body.id, agencyId: req.Agency._id },
    (err, photographer) => {
      if (err) {
        res.json(err);
        console.log(err);
      } else if (!photographer) res.sendStatus(404);
      else {
        // Agency.findByIdAndUpdate(
        //   req.Agency._id,
        //   { $pull: { photographer: req.body.id } },
        //   (err) => {
        //     if (err) {
        //       res.json(err);
        //       console.log(err);
        //     } else res.json(photographer);
        //   }
        // );
        res.sendStatus(200);
      }
    }
  );
});
Router.get("/photographer", verify, (req, res) => {
  let find = { agencyId: req.Agency._id };
  if (req.query.id) find._id = req.query.id;
  if (!req.query.all) find.active = true;
  console.log(find, req.query);
  Photographer.find(find, (err, staffs) => {
    if (err) {
      res.json(err);
      console.log(err);
    } else res.json(staffs);
  });
});
Router.put("/photographer", verify, (req, res) => {
  Photographer.findOneAndUpdate(
    { _id: req.body.id, agencyId: req.Agency._id },
    req.body.photographer,
    (err, photographer) => {
      if (err) {
        res.json(err);
        console.log(err);
      } else if (!photographer) res.sendStatus(404);
      else res.json(photographer);
    }
  );
});

// image routes
Router.post("/image", verify, (req, res) => {
  // to be edited later
  let body = req.body;
  body.agencyId = req.Agency._id;
  Images.create(body, (err, image) => {
    if (err) {
      res.json(err);
      console.log(err);
    } else {
      // Agency.findByIdAndUpdate(
      //   req.Agency._id,
      //   { $push: { photographer: photographer } },
      //   (err, agency) => {
      //     if (err) {
      //       res.json(err);
      //       console.log(err);
      //     } else if (!agency) res.sendStatus(401);
      //     else res.json(agency);
      //   }
      // );
      res.json(image);
    }
  });
});
Router.delete("/image", verify, (req, res) => {
  Images.findOneAndDelete(
    { _id: req.body.id, agencyId: req.Agency._id },
    (err, image) => {
      if (err) {
        res.json(err);
        console.log(err);
      } else if (!image) res.sendStatus(404);
      else {
        // Agency.findByIdAndUpdate(
        //   req.Agency._id,
        //   { $pull: { photographer: req.body.id } },
        //   (err) => {
        //     if (err) {
        //       res.json(err);
        //       console.log(err);
        //     } else res.json(photographer);
        //   }
        // );
        res.sendStatus(200);
      }
    }
  );
});
Router.get("/image", verify, (req, res) => {
  let find = { agencyId: req.Agency._id };
  if (req.query.id) find._id = req.query.id;
  if (req.query.photographerId) find.photographerId = req.query.photographerId;
  // if (req.query.agencyId) find.agencyId = req.query.agencyId; // here is the admin panel, haha
  Images.find(find, (err, images) => {
    if (err) {
      res.json(err);
      console.log(err);
    } else res.json(images);
  });
});
Router.put("/image", verify, (req, res) => {
  Images.findOneAndUpdate(
    { _id: req.body.id, agencyId: req.Agency._id },
    req.body.image,
    (err, image) => {
      if (err) {
        res.json(err);
        console.log(err);
      } else if (!image) res.sendStatus(404);
      else res.json(image);
    }
  );
});

// information routes
Router.put("/information", verify, (req, res) => {
  Agency.findByIdAndUpdate(
    req.Agency._id,
    {
      // to be edited for efficient way!
      "information.publicEmail": req.body.publicEmail,
      "information.whatsapp": req.body.whatsapp,
      "information.telegram": req.body.telegram,
      "information.phoneNumber": req.body.phoneNumber,
      "information.workingCities": req.body.workingCities,
    },
    (err, agency) => {
      if (err) {
        res.json(err);
        console.log(err);
      } else res.json({ agency, usd: "asd" });
    }
  );
});

module.exports = Router;
