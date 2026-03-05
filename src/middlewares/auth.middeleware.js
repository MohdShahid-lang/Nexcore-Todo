import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        // eg authHeader = Bearer eyrasjoiancsdmn......

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({ message: "Invalid or missing  Header" });
        }


        console.log(
            authHeader
        );
        

        const token = authHeader.split(" ")[1];
        //token = eydsnibvbnnib......


        console.log(token);
        

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //decoded = {
        //id : 3456278,
        //name : "zaid"
        //}
        console.log("decoded", decoded)
        req.user = decoded;
        next();

    } catch (error) {
        
        return res.status(401).json({ message: "Invalid  or expired token" });
    }
}