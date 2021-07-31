import { User } from "../entities/User";
import { Resolver, Arg, Query, Mutation } from "type-graphql";
import { FaceBookConnectInput } from "../inputs/FaceBookConnectInput";
import { FacebookConnectResponse } from "../responses/FacebookConnectResponse";

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
}