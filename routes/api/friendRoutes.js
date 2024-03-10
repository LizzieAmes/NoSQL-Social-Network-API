const router = require('express').Router();
const {
  addFriend,
  removeFriend,
} = require('../../controllers/friendController');

router.route('/:userId/friends/:friendId').post(addFriend);

router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
