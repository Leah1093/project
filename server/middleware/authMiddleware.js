import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']; // קבלת האסימון מהכותרת Authorization
console.log("🚲🚲"+token)
  if (!token) {
    return res.status(401).json({ error: 'לא סופק אסימון.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(402).json({ error: 'אסימון לא תקין.' });
    }

    // אופציונלי: צירוף נתוני משתמש לאובייקט בקשה (לדוגמה, מזהה משתמש)
    req.userId = decoded.userId;  

    next(); // המשך עיבוד הבקשה
  });
};
