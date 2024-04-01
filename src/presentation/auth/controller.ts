import { Request, Response } from "express";
import { RegisterUseDto } from "../../domain/dtos/register-user.dtos";
import { AuthService } from "../services/auth.service";
import { CustomError } from "../../domain/errors/custom.error";
import { LoginUserDto } from "../../domain/dtos/login-user.dto";

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  private handleError(error: any, res: Response) {
    if (error instanceof CustomError) {
      return res
        .status(Number(error.statusCode))
        .json({ error: error.message });
    }
    return res.status(500).json({ error: `internal server error ${error}` });
  }

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authService
      .loginUser(loginUserDto!)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => this.handleError(error, res));
  };
  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUseDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authService
      .registerUser(registerDto!)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => this.handleError(error, res));
  };
  validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;
    this.authService
      .validateEmail(token)
      .then(() => res.json("Email was validated properly"))
      .catch((error) => this.handleError(error, res));
  };
}
