import { User } from "../entities/User";
import { Resolver, Arg, Query, Mutation, Ctx } from "type-graphql";
import { FaceBookConnectInput } from "../inputs/FaceBookConnectInput";
import { FacebookConnectResponse } from "../responses/FacebookConnectResponse";
import { EmailSignInResponse } from "../responses/EmailSignInResponse";
import { EmailSignInInput } from "../inputs/EmailSignInInput";
import { createJWT } from "../utils/createJWT";

@Resolver()
export class UserResolver {

    

    @Query(_returns => String)
    async returnHello(@Arg("name") name: string, @Ctx() _ctx: any){
      return `Hello ${name}`;
    };

    @Mutation(_returns => FacebookConnectResponse)
    async FaceBookConnect(@Arg("data") data: FaceBookConnectInput) {
      const { fbId } = data;
      try {
        const existingUser = await User.findOne({ fbId: fbId });
        if(existingUser) {
          const token = createJWT(existingUser.id);
          return {
            ok: true,
            error: null,
            token
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
      try {
        const newUser = await User.create({ ...data, profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square` }).save();
        const token = createJWT(newUser.id);
        if(newUser) {
          return {
            ok: true,
            error: null,
            token
          };
        } else {
          return {
            ok: false,
            error: "User Creation Falied",
            token: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }

    @Mutation(_returns => EmailSignInResponse)
    async EmailConnect(@Arg("data") data: EmailSignInInput) {
      const { email, password } = data;
      try {
        const user = await User.findOne({ email });
        if(!user) {
          return {
            ok: false,
            error: "User Does not exist",
            token: null
          }
        }

        const checkPassword = await user.comparePasswords(password);
        if(checkPassword) {
          const token = createJWT(user.id);
          return {
            ok: true,
            error: null,
            token
          }
        } else {
          return {
            ok: false,
            error: "Passwords do not match",
            token: null
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        }
      }
    }
}