import express from 'express';
import { isLoggedIn } from "../middlewares/isLogged.js";
import { distanceCheck } from "../middlewares/distanceCheck.js";

import Phenomenon from "../models/Phenomenon.js";
import Review from "../models/Review.js";
import { uploadPhenomPicture } from "../config/cloudinary.js";

const router = express.Router();

router.get("/phenomena/new", isLoggedIn("/auth/login"), (req, res) => {
  res.render("phenomena/new", { actual_page: "addPhenom_page" });
});

router.post("/addPhenomenon", uploadPhenomPicture.array("file", 4), (req, res) => {
  //load of images
  var imgPhenomUrls = [];

  //load of body POST
  const { name, description, type } = req.body;
  const creatorId = req.user;
  const location = {
    type: "Point",
    coordinates: [req.body.longitude, req.body.latitude]
  };

  if (req.body.latitude == undefined || req.body.longitude == undefined) {
    req.flash("error", "No Geolocation detected, please refresh");
    res.redirect("/phenomena/new");
  } else if (req.files.length > 4 || req.files.length == 0) {
    req.flash("error", "Please upload one image (max.4)");
    res.redirect("/phenomena/new");
  } else {
    if (req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        imgPhenomUrls.push(req.files[i].path);
      }
    }

    Phenomenon.create({
      imgPhenomUrls,
      name,
      description,
      type,
      creatorId,
      location
    })
      .then(phenomenon => {
        console.log(`Se ha publicado el fenomeno`);
        res.redirect("/phenomena");
      })
      .catch(e => {
        req.flash("error", "Something went wrong");
        res.redirect("/phenomena/new");
        console.log(`There is an error: ${e}`);
      });
  }
});

router.get("/phenomena", isLoggedIn("/auth/login"), (req, res, next) => {
  // Sorting by last created
  let query = { createdAt: -1 };

  Phenomenon.find()
    .sort(query)
    .then(phenomena => {
      const phenomList = phenomena.map(p => {
        return {
          ...JSON.parse(JSON.stringify(p)),
          numFavs: p.whoseFavId.length,
          numRevs: p.reviewsId.length
        };
      });
      res.render("phenomena/main", {
        phenomList,
        actual_page: "phenomena_page",
        phenomenon: true
      });
    });
});

router.get("/phenomena/:id/edit/", (req, res) => {
  Phenomenon.findById(req.params.id).then(phenomenon => {
    res.render("phenomena/edit", {
      phenomenon,
      actual_page: "phenomena_editPage"
    });
  });
});

router.post("/phenomena/:id/edit/", (req, res) => {

  const { name, type, description } = req.body;
  const id = req.params.id;
  Phenomenon.findByIdAndUpdate(id, { name, type, description }).then(() =>
    res.redirect("/phenomena")
  );
});

router.get("/phenomena/:id/delete", (req, res) => {
  Phenomenon.findByIdAndDelete(req.params.id).then(() => {
    res.redirect("/phenomena");
  });
});

router.get("/phenomena/:id", isLoggedIn("/auth/login"), (req, res) => {
  Phenomenon.findById(req.params.id)
    .populate("creatorId")
    .populate({ path: "reviewsId", populate: { path: "authorId" } })
    .populate("routesImIn")
    .then(phenomenon => {
      console.log(phenomenon.location.coordinates[0]);
      const reviews = phenomenon.reviewsId.map(revs => {
        let min =
          revs.createdAt.getMinutes().toString().length === 1
            ? `0${revs.createdAt.getMinutes()}`
            : revs.createdAt.getMinutes();
        return {
          ...JSON.parse(JSON.stringify(revs)),
          formatDate: `${revs.createdAt.getDate()}/${revs.createdAt.getMonth() +
            1}/${revs.createdAt.getFullYear()}`,
          formatTime: `${revs.createdAt.getHours()}:${min}`
        };
      });

      let phenomCreationDate = `${phenomenon.createdAt.getDate()}/${phenomenon.createdAt.getMonth() +
        1}/${phenomenon.createdAt.getFullYear()}`;

      //editUser - false (no es el mismo)
      //editUser - true (es el mismo)
      const editUser =
        phenomenon.creatorId._id.toString() == req.user._id.toString();
      //console.log(phenomenon.creatorId._id);
      //console.log(req.user._id);
      //console.log(editUser);

      // visited - false (no ecuentra el userID)
      // visited - true (encuentra el userID)
      const visited = phenomenon.visitorsId.indexOf(req.user._id) !== -1;

      // favourite - false (no ecuentra el userID)
      // favourite - true (encuentra el userID)
      const favourite = phenomenon.whoseFavId.indexOf(req.user._id) !== -1;

      res.render("phenomena/detail", {
        phenomenon,
        lat: phenomenon.location.coordinates[1],
        lng: phenomenon.location.coordinates[0],
        reviews,
        phenomCreationDate,
        editUser,
        visited,
        favourite,
        actual_page: "phenomena_detailPage"
      });
    });
});

router.post(
  "/phenomena/:id/register",
  isLoggedIn("/auth/login"),
  (req, res) => {
    let geoLat = req.body.latitude;
    let geoLong = req.body.longitude;

    let userId = req.user._id;

    //geolocate check
    if (geoLat == undefined || geoLong == undefined) {
      req.flash("error", "geolocation not found");
      res.redirect(`/phenomena/${req.params.id}`);
    } else {
      Phenomenon.findById(req.params.id).then(phenomenon => {
        //distance check

        let phenLat = phenomenon.location.coordinates[1];
        let phenLong = phenomenon.location.coordinates[0];

        if (distanceCheck(geoLat, geoLong, phenLat, phenLong, "K") > 0.1) {
          req.flash("error", "you need to be near (min 150m)");
          res.redirect(`/phenomena/${req.params.id}`);
          //already register check
        } else if (phenomenon.visitorsId.indexOf(userId) !== -1) {
          req.flash("error", "already registered");
          res.redirect(`/phenomena/${req.params.id}`);
        } else {
          phenomenon.visitorsId.push(userId);
          phenomenon.save();
          res.redirect(`/phenomena/${req.params.id}`);
        }
      });
    }
  }
);

router.post(
  "/phenomena/:id/favourite",
  isLoggedIn("/auth/login"),
  (req, res) => {
    let userId = req.user._id;
    Phenomenon.findById(req.params.id).then(phenomenon => {
      if (phenomenon.whoseFavId.indexOf(userId) !== -1) {
        phenomenon.whoseFavId.pull(userId);
        phenomenon.save();
        res.redirect(`/phenomena/${req.params.id}`);
      } else {
        phenomenon.whoseFavId.push(userId);
        phenomenon.save();
        res.redirect(`/phenomena/${req.params.id}`);
      }
    });
  }
);

router.post("/phenomena/:id/postReview", (req, res) => {
  let content = req.body.content;
  let authorId = req.user._id;

  Review.create({ content, authorId }).then(review => {
    Phenomenon.findByIdAndUpdate(req.params.id, {
      $push: { reviewsId: `${review._id}` }
    }).then(() => res.redirect(`/phenomena/${req.params.id}`));
  });
});

export default router;
