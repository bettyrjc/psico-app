import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserEntity } from "../../domain/entities/user.entity";
import { userModel } from '../../data/mongo/models/user.model';

export class AuthMiddleware {
  static async validateJwt(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");
    if (!authorization) {
      return res.status(401).json({ error: "missing token" });
    }

    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid bearer token" });

    const token = authorization.split(" ").at(1) || "";
    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) {
        return res.status(401).json({ error: "Invalid token" });
      }
      const user = await userModel.findById(payload.id);
      if (!user) return res.status(401).json({ error: "Invalid token - user" });
      // if(!user.emailValidated) return res.status(401).json({ error: "user is not verified" })
      req.body.user = UserEntity.fromObject(user);
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "internal servel error" });
    }
  }
}
