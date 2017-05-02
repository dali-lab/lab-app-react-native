package com.dali;

import android.app.Application;
import android.util.Log;


import com.crashlytics.android.Crashlytics;
import com.facebook.react.ReactApplication;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.mackentoch.beaconsandroid.BeaconsAndroidPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import io.fabric.sdk.android.Fabric;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BackgroundTimerPackage(),
            new LinearGradientPackage(),
            new ReactNativePushNotificationPackage(),
            new RNGoogleSigninPackage(),
            new BeaconsAndroidPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
      super.onCreate();
      if (!BuildConfig.DEBUG) {
          Fabric.with(this, new Crashlytics());
      }
      SoLoader.init(this, /* native exopackage */ false);
  }
}
