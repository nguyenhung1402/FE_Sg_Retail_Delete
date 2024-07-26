import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { switchMap, map, take, tap } from 'rxjs/operators';
import jwt_decode from "jwt-decode";
import { UrlConstants } from '../commons/UrlConstants';
import { DecodeToken } from '../_model/decode-token.model';
import { User } from '../_model/User.model';

// create an instance of the JWT decoder utility and use it directly:
// const helper = new JwtHelperService();


@Injectable({
	providedIn: 'root',
})
export class AuthService {
	TOKEN_KEY = 'auth-token';
	public user!: Observable<User | null>;
	// Init with null to filter out the first value in a guard!
	isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<any>(null);
	currentAccessToken!: string;

	API: string = '/signin';
	checkUserObs!: Observable<any>;
	private userData = new BehaviorSubject(null);
	constructor(
		private storage: Storage,
		private http: HttpClient,
		private plt: Platform,
		private router: Router
	) {
		this.loadToken();
	}

	// Load accessToken on startup
	loadToken() {
		this.storage['create']().then((data: { get: (arg0: string) => Promise<any>; }) => {
			data.get(this.TOKEN_KEY).then((token) => {
				
				if (token) {
					// const decoded = helper.decodeToken(token);
					let decoded: DecodeToken = jwt_decode(token);
					if (Date.now() >= decoded.exp * 10000) {
						this.logout();
					} else {
						this.currentAccessToken = token;
						this.isAuthenticated.next(true);
					}
				} else {
					this.logout();
				}
			});
		});


	}

	login(credentials: { username: string; password: string }): Observable<any> {
		return this.http.post<any>(UrlConstants.BASE_SERVER + this.API, credentials).pipe(
			switchMap((tokens) => {
				this.currentAccessToken = tokens.data.access_token;
				const storeAccess = this.storage['set'](this.TOKEN_KEY, tokens.data.access_token);
				return from(storeAccess);
			}),
			tap(_ => {
				this.isAuthenticated.next(true);
			})
		);
	}

	getUser() {
		return this.userData.getValue();
	}

	getParseTokenUser(): DecodeToken {
		let decoded: DecodeToken = jwt_decode(this.currentAccessToken);
		var const_data: any = {};
		const_data.exp = (decoded.exp.toString());
		const_data.role = atob(decoded.role.toString());
		const_data.username = atob(decoded.username.toString());
		const_data.ip = atob(decoded.ip.toString());
		const_data.nameDB = atob(decoded.nameDB.toString())
		return const_data;
	}

	logout() {
		this.storage['remove'](this.TOKEN_KEY).then(() => {
			this.currentAccessToken;
			this.isAuthenticated.next(false);
			this.router.navigateByUrl('/login');
		});

	}
}