import { inject, Injectable, NgZone } from '@angular/core';
import {
  SupabaseClient,
  createClient
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase !: SupabaseClient
  private router = inject(Router)
  private _ngZone = inject(NgZone)
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supbaseKey,
    )
    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event)
      console.log('Auth session:', session)

      localStorage.setItem('session', JSON.stringify(session?.user))

      if (session?.user) {
        this._ngZone.run(() => { this.router.navigate(['/chat']) })
        console.log('User is logged in')
      } else {
        console.log('User is logged out')
      }
    })
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('session') as string
    return user === 'undefined' ? true : false
  }


  async signInWithGoogle() {
    await this.supabase.auth.signInWithOAuth(
      { provider: 'google' }
    )
  }

  async signOut() {
    await this.supabase.auth.signOut()
  }
}
