import {
  Authorized,
  CurrentUser,
  Get,
  JsonController,
  Post,
  UnauthorizedError,
  BadRequestError,
  BodyParam,
  Body
} from "routing-controllers";
import * as jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Repository, getRepository } from "typeorm";
import { env } from "../../env";

@JsonController("/auth")
export class AuthController {
  private users: Repository<User>;

  constructor() {
    this.users = getRepository(User);
  }

  @Post("/register-user")
  async register(@Body() user?: User) {
    const userExist = await this.userExist(user);
    if (await !userExist) return this.users.save(user);
    return new BadRequestError("Este usuário já está cadastrado. Faça o login");
  }

  @Post("/login")
  async login(
    @BodyParam("mail") mail: string,
    @BodyParam("password") password: string
  ) {
    const user = await this.users.findOne({
      where: { mail }
    });
    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedError("Wrong mail or password");
    }
    if (user.role === 'client') {
      const token = jwt.sign(
        { user_id: user.id, role: user.role },
        env.auth.secret
      );
      return { token };
    } else {
      throw new UnauthorizedError("Este usuário não tem permissão");
    }
  }

  @Post("/admin-login")
  async adminLogin(
    @BodyParam("mail") mail: string,
    @BodyParam("password") password: string
  ) {
    const user = await this.users.findOne({
      where: { mail }
    });
    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedError("Wrong mail or password");
    }
    if (user.role === 'admin') {
      const token = jwt.sign(
        { user_id: user.id, role: user.role },
        env.auth.secret
      );
      return { token };
    } else {
      throw new UnauthorizedError("Este usuário não tem permissão");
    }
  }

  @Authorized()
  @Get("/check")
  checkAuth() {
    return true;
  }

  @Authorized()
  @Get("/renew")
  renewToken(@CurrentUser() user?: User) {
    const token = jwt.sign({ user_id: user.id }, env.auth.secret);
    return { token };
  }

  @Authorized()
  @Post("/forgot-password")
  async forgotpassword(
    @BodyParam("token") token: string,
    @BodyParam("password") password: string
  ) {
    if (!token) {
      throw new BadRequestError("missing token");
    }
    const user = await this.users.findOne({
      where: { resetPasswordToken: token }
    });
    if (!user) {
      throw new BadRequestError("User not found!");
    }
    user.password = password;
    await user.hashPassword();
    await this.users.save(user);
    return { status: true, message: "Password changed!" };
  }

  private userExist(user: User) {
    const { mail } = user;
    return this.users.findOne({ where: { mail } });
  }
  // @Post("/send-sms")
  // async sendSms(@BodyParam("number") number: string) {
  //   const baseUrl = 'https://sms.comtele.com.br/api/v2/send';
  //   const options = {
  //     uri: baseUrl,
  //     headers: {
  //       'auth-key': '67392c47-39ae-4e59-b4f2-33237ddd8d58',
  //       'content-type': 'application/json'
  //     },
  //     body: '{"Receivers":"27998479940","Content":"Este é seu código sms: 45678"}'
  //   }

  //   const result = await request.post(options);
  //   console.log(result);
  // }
}
