import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        if (!token) {
            throw new Error("Not Logged-In");
        }

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.TOKEN_KEY);

            req.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    }
    catch(error) {
        return res.status(400).json({ error: error.message });
    }
}

export default auth;