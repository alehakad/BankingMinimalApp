// middleware to check roles of user to perform some action

const checkRole = (requiredRoles) => {
    return (req, res, next) => {
        const userRoles = req.auth?.roles || [];
        // check roles
        const hasRole = requiredRoles.some(role => userRoles.includes(userRoles));
        if (!hasRole) {
            return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
        }
        // continue to handler
        next();
    }
};


export default checkRole;