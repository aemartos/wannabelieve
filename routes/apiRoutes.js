import express from 'express';
import Phenomenon from "../models/Phenomenon.js";

const router = express.Router();

/* API all phenomena */
router.get('/getAllPhenomena', (req, res, next) => {
  Phenomenon.find()
    .then((phenomena) => { res.json(phenomena); })
    .catch((error) => { console.log(error); res.json({ error }) });
});

/* API 🦄 fantasticAnimals */
router.get('/getFantasticAnimals', (req, res, next) => {
  Phenomenon.find({ type: 'fantasticAnimals' })
    .then((phenomena) => { res.json(phenomena); })
    .catch((error) => { console.log(error); res.json({ error }) });
});

/* API 🦑 seaCreatures */
router.get('/getSeaCreatures', (req, res, next) => {
  Phenomenon.find({ type: 'seaCreatures' })
    .then((phenomena) => { res.json(phenomena); })
    .catch((error) => { console.log(error); res.json({ error }) });
});

/* API 👾 extraterrestrials */
router.get('/getExtraterrestrials', (req, res, next) => {
  Phenomenon.find({ type: 'extraterrestrials' })
    .then((phenomena) => { res.json(phenomena); })
    .catch((error) => { console.log(error); res.json({ error }) });
});

/* API 👽 ufos */
router.get('/getUfos', (req, res, next) => {
  Phenomenon.find({ type: 'ufos' })
    .then((phenomena) => { res.json(phenomena); })
    .catch((error) => { console.log(error); res.json({ error }) });
});

/* API 👻 ghosts */
router.get('/getGhosts', (req, res, next) => {
  Phenomenon.find({ type: 'ghosts' })
    .then((phenomena) => { res.json(phenomena); })
    .catch((error) => { console.log(error); res.json({ error }) });
});

/* API 💩 weirdStuff */
router.get('/getWeirdStuff', (req, res, next) => {
  Phenomenon.find({ type: 'weirdStuff' })
    .then((phenomena) => { res.json(phenomena); })
    .catch((error) => { console.log(error); res.json({ error }) });
});

/* API 👂🏻 psychophonies */
router.get('/getPsychophonies', (req, res, next) => {
  Phenomenon.find({ type: 'psychophonies' })
    .then((phenomena) => { res.json(phenomena); })
    .catch((error) => { console.log(error); res.json({ error }) });
});

/* API 🧠 paranormal */
router.get('/getParanormal', (req, res, next) => {
  Phenomenon.find({ type: 'paranormal' })
    .then((phenomena) => { res.json(phenomena); })
    .catch((error) => { console.log(error); res.json({ error }) });
});

/* API 🌾 signals */
router.get('/getSignals', (req, res, next) => {
  Phenomenon.find({ type: 'signals' })
    .then((phenomena) => { res.json(phenomena); })
    .catch((error) => { console.log(error); res.json({ error }) });
});

/* API 🧟‍♂️ halfHuman */
router.get('/getHalfHuman', (req, res, next) => {
  Phenomenon.find({ type: 'halfHuman' })
    .then((phenomena) => { res.json(phenomena); })
    .catch((error) => { console.log(error); res.json({ error }) });
});

/* API ⛪️ religiousApparitions */
router.get('/getReligiousApparitions', (req, res, next) => {
  Phenomenon.find({ type: 'religiousApparitions' })
    .then((phenomena) => { res.json(phenomena); })
    .catch((error) => { console.log(error); res.json({ error }) });
});

/* API 🌈 naturalPhenomena */
router.get('/getNaturalPhenomena', (req, res, next) => {
  Phenomenon.find({ type: 'naturalPhenomena' })
    .then((phenomena) => { res.json(phenomena); })
    .catch((error) => { console.log(error); res.json({ error }) });
});

/* API 🏚 abandonedPlaces */
router.get('/getAbandonedPlaces', (req, res, next) => {
  Phenomenon.find({ type: 'abandonedPlaces' })
    .then((phenomena) => { res.json(phenomena); })
    .catch((error) => { console.log(error); res.json({ error }) });
});

/* API 🙈 unclassified */
router.get('/getUnclassified', (req, res, next) => {
  Phenomenon.find({ type: 'unclassified' })
    .then((phenomena) => { res.json(phenomena); })
    .catch((error) => { console.log(error); res.json({ error }) });
});


export default router;
