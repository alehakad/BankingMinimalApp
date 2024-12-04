import User from '../models/userSchema.js';

const getUsersEmails = async (req, res) => {
    const users = await User.find({}, 'email');
    const emails = users.map(user => user.email);

    return res.status(200).json({ emails });
};

const deleteUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    console.log(`Deleting user with id, ${userId}`);
    await User.deleteOne({ _id: userId });

    return res.status(200).json({ message: "User deleted" });
};

export { getUsersEmails, deleteUser };