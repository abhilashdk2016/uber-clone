import { User } from "../entities/User";
import { Resolver, Arg, Query, Mutation } from "type-graphql";
import { FaceBookConnectInput } from "../inputs/FaceBookConnectInput";
import { FacebookConnectResponse } from "../responses/FacebookConnectResponse";
import { EmailSignInResponse } from "../responses/EmailSignInResponse";
import { EmailSignInInput } from "../inputs/EmailSignInInput";

@Resolver()
export class UserResolver {

    @Query(_returns => String)
    async returnHello(@Arg("name") name: string){
      return `Hello ${name}`
    };

    @Mutation(_returns => FacebookConnectResponse)
    async FaceBookConnect(@Arg("data") data: FaceBookConnectInput) {
      const { fbId } = data;
      try {
        const existingUser = await User.findOne({ fbId: fbId });
        if(existingUser) {
          return {
            ok: true,
            error: null,
            token: "Already Exists"
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
        if(newUser) {
          return {
            ok: true,
            error: null,
            token: null
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
          return {
            ok: true,
            error: null,
            token: "User Existing - Token"
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