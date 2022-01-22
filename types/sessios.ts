import * as session from "express-session"

//Add userID, token to session
declare module "express-session" {
    interface Session {
      userID: string;
      token: string;
    }
  }