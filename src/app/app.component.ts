import { Component, NgZone  } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import firebase from 'firebase'; // added

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  public zone:NgZone; // added

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    // Start Add
    this.zone = new NgZone({});
    const config = {
		apiKey: "AIzaSyCYqAD6lC0ESfprrLtP-zW4roW_i6sGrxA",
		authDomain: "fir-firebase-23733.firebaseapp.com",
		databaseURL: "https://fir-firebase-23733.firebaseio.com",
		projectId: "fir-firebase-23733",
		storageBucket: "fir-firebase-23733.appspot.com",
		messagingSenderId: "685705868834"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged( user => {
      this.zone.run( () => {
        if (!user) { 
          this.rootPage = 'LoginPage';
        } else {
          this.rootPage = HomePage;
        }
      });     
    });  
	// End Add
  
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

