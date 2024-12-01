import User from '../models/userSchema.js';

const getUsersEmails = async (req, res) => {
    const users = await User.find({}, 'email');
    const emails = users.map(user => user.email);

    return res.status(200).json({ emails });
};

export { getUsersEmails };