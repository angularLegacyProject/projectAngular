import User from "../models/user.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const TOKEN_SECRET =
  "b91028378997c0b3581821456edefd0ec7958f953f8c1a6dd856e2de27f0d7e0fb1a01cda20d1a6890267e629f0ff5dc7ee46bce382aba62d13989614417606a";
export const login = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.token) {
      const verify = jsonwebtoken.verify(req.body.token, TOKEN_SECRET);
      console.log(verify);
      if (verify) {
        res.status(201).json(verify);
      }
    } else {
      if (req.body.password.length < 8 || req.body.password.length > 50) {
        res.status(400).send("check password");
      } else {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          res.status(400).send("That user don't exisits!");
        } else {
          const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
          );
          if (!validPassword) {
            res.status(400).send("wrong password!");
          } else {
            console.log(user);
            const token = jsonwebtoken.sign(
              { id: user._id, username: user.userName, type: user.role },
              TOKEN_SECRET,
              { expiresIn: "24h" }
            );
            res.status(201).json({ token, status: "connected" });
          }
        }
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.userName.length < 5 || req.body.userName.length > 50) {
      res.status(400).send("check user name");
    } else if (req.body.password.length < 8 || req.body.password.length > 50) {
      res.status(400).send("check password");
    } else if (String(req.body.phoneNumber).length !== 8) {
      res.status(400).send("check phone number");
    } else {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(400).send("That user already exisits!");
      } else {
        const newUser = new User({
          email: req.body.email,
          userName: req.body.userName,
          password: req.body.password,
          phoneNumber: req.body.phoneNumber,
          role: req.body.role,
          adress: req.body.adress,
        });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        newUser.save().then((result) => {
          res.status(201).send(result);
        });
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const edit = async (req, res) => {
  try {
    let data = await User.findByIdAndUpdate(req.params._id, req.body);
    console.log(data);
    res.json({ message: "updated successfully", data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getOneUserById = function (req, res) {
  User.findById(req.params._id)
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(404).json({ message: "user not found", error: err.message })
    );
};
