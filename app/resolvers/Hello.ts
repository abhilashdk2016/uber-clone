import { Resolver, Arg, Query } from "type-graphql";

@Resolver()
export class HelloResolver {

    @Query(_returns => String)
    async returnHello(@Arg("name") name: string){
      return `Hello ${name}`
    };
}