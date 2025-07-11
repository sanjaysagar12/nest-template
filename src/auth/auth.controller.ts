import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from 'src/application/common/guards/google-auth-guard';
import { AuthService } from './auth.service';

@Controller("api/auth")
export class AuthController {
     constructor(private authService: AuthService) { }
    @UseGuards(GoogleAuthGuard)
    @Get('google/signin')
    async googleSignIn() {
        // This route initiates Google OAuth flow
        // The guard redirects to Google - we don't need to return anything
    }

    @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    async callback(@Req() req, @Res() res) {
        // After successful Google authentication, generate JWT
        const token = await this.authService.googleSignin(req.user.id, req.user.role);
        
        // Redirect to frontend with token (you can customize this URL)
        return res.redirect(`http://localhost:5173/google/signin?token=${token.access_token}`);
    }
}
