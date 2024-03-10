 const Thought = require('../models/Thought');
 const User = require('../models/User');

 exports.getAllThoughts = async (req, res) => {
   try {
     const thoughts = await Thought.find({});
     res.json(thoughts);
   } catch (err) {
     res.status(500).json({ message: 'Failed to get thoughts', error: err });
   }
 };

 exports.getThoughtById = async (req, res) => {
   try {
     const thought = await Thought.findById(req.params.id);
     if (!thought) {
       return res.status(404).json({ message: 'Thought not found' });
     }
     res.json(thought);
   } catch (err) {
     res.status(500).json({ message: 'Failed to get thought', error: err });
   }
 };

 exports.createThought = async (req, res) => {
   try {
     const thought = await Thought.create(req.body);
     await User.findByIdAndUpdate(
       req.body.userId,
       { $push: { thoughts: thought._id } },
       { new: true }
     );
     res.json(thought);
   } catch (err) {
     res.status(500).json({ message: 'Failed to create thought', error: err });
   }
 };

 exports.updateThought = async (req, res) => {
   try {
     const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
       new: true,
       runValidators: true,
     });
     if (!thought) {
       return res.status(404).json({ message: 'Thought not found' });
     }
     res.json(thought);
   } catch (err) {
     res.status(500).json({ message: 'Failed to update thought', error: err });
   }
 };

 exports.deleteThought = async (req, res) => {
   try {
     const thought = await Thought.findByIdAndDelete(req.params.id);
     if (!thought) {
       return res.status(404).json({ message: 'Thought not found' });
     }
     await User.findByIdAndUpdate(
       thought.userId,
       { $pull: { thoughts: req.params.id } },
       { new: true }
     );
     res.json({ message: 'Thought deleted successfully' });
   } catch (err) {
     res.status(500).json({ message: 'Failed to delete thought', error: err });
   }
 };
