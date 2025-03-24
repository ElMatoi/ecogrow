import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWTPayload } from "../types/jwt";
import { getEnvValue } from "src/config/config.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: getEnvValue('JWT_SECRET'),
        });
    }       

    async validate(payload: JWTPayload) {
        return { id: payload.id, email: payload.email}
    }
}