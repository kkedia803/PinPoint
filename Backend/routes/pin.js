const router = require("express").Router();
const Pin = require("../models/Pin");

router.post("/", async (req, res) => {
    const newPin = new Pin(req.body);
    try {
        const savedPin = await newPin.save();

        res.status(200).json(savedPin);

    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.get("/", async (req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.get("/user/:username", async (req, res) => {
    try {
        const userPins = await Pin.find({ username: req.params.username });
        res.status(200).json(userPins);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedPin = await Pin.findByIdAndDelete(req.params.id);
        if (!deletedPin) {
            res.status(400).json({ message: 'Pin not found.' });
        }
        res.status(200).json(deletedPin);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;