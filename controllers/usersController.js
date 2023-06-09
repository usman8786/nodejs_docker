// userController.js
usersController = {}
const User = require('../models/user');

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
usersController.getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
    res.status(200).send({
      message: "Successful",
      data: users,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

module.exports = usersController;