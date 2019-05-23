import {
  Authorized,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Body,
  Put,
  BodyParam,
  BadRequestError
} from "routing-controllers";

import { User } from "../models/User";
import { Repository, getRepository } from "typeorm";
import { compare } from "bcryptjs";

@Authorized()
@JsonController("/user")
export class UserController {
  private user: Repository<User>;
  constructor() {
    this.user = getRepository(User);
  }
  // return user information
  @Get()
  async current(@CurrentUser() user?: User): Promise<User> {
    return this.user.findOne({ where: { id: user.id } });
  }

  @Get("/shallow/:id")
  async find(@Param("id") id: number): Promise<User> {
    return this.user.findOne({
      where: { id },
      relations: ["wallet"],
      select: ["name"]
    });
  }

  @Put()
  public async update(
    @CurrentUser() currentUser: User,
    @Body() user: User
  ): Promise<User | any> {
    if (currentUser.id === user.id) {
      return (await this.user.save(user))
        ? Promise.resolve({
            status: true,
            message: "Informações atualizadas com sucesso"
          })
        : Promise.resolve({
            status: false,
            message: "Ocorreu um erro, tente novamente"
          });
    }
    throw new BadRequestError("denied");
  }

  @Put("/change-password")
  async changePassword(
    @BodyParam("oldPassword") oldPassword: string,
    @BodyParam("newPassword") newPassword: string,
    @BodyParam("repeatPassword") repeatPassword: string,
    @CurrentUser() user?: User
  ) {
    let isRightPassword = await compare(oldPassword, user.password);
    if (isRightPassword && newPassword === repeatPassword) {
      user.password = newPassword;
      let updatedUser = await this.user.save(user);
      return Promise.resolve({
        status: true,
        message: "Registro atualizado com sucesso",
        data: updatedUser
      });
    }
    return Promise.resolve({
      status: false,
      message: "Alguma coisa deu errado. Tente novamente."
    });
  }
}
