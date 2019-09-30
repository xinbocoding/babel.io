import { Injectable, HttpService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService
  ) { }

  async validateUser(id_token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService
        .get('https://oauth2.googleapis.com/tokeninfo', { params: { id_token } })
        .toPromise()
        .then(response => {
          resolve(response.data);
        })
        .catch(reject);
    });
  }

  async login(user: any) {
    const payload = { sub: user.userId, username: user.username }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
