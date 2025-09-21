import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "./firebase.js";

// ================= GOOGLE STRATEGY ================= //
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,       // dari .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // dari .env
      callbackURL: "/api/auth/google/callback",    // endpoint callback di backend
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;
        const uid = profile.id;

        const userRef = db.collection("users").doc(uid);
        const doc = await userRef.get();

        if (!doc.exists) {
          // User baru → simpan default ke Firestore
          const newUser = {
            uid,
            name,
            email,
            role: "nasabah",
            status: "pending",
            emailVerified: true,
            createdAt: new Date().toISOString(),
          };
          await userRef.set(newUser);
          return done(null, newUser);
        }

        // User lama → ambil datanya
        const userData = doc.data();
        return done(null, userData);
      } catch (err) {
        console.error("Passport Google error:", err);
        return done(err, null);
      }
    }
  )
);

// ================= SERIALIZE / DESERIALIZE ================= //
passport.serializeUser((user, done) => {
  done(null, user.uid);
});

passport.deserializeUser(async (uid, done) => {
  try {
    const doc = await db.collection("users").doc(uid).get();
    if (doc.exists) {
      done(null, doc.data());
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, null);
  }
});

export default passport;
