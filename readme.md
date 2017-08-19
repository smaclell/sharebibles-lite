# Get started

1. In order to run this app make sure you can run the [react-native base app](https://facebook.github.io/react-native/docs/getting-started.html) building projects with native code.

2. Specify your Google Maps API Key:

For development, you need to get a API Key. Go to https://console.developers.google.com/apis/credentials to check your credentials.
Add your API key to your manifest file (android\app\src\main\AndroidManifest.xml):

<application>
    <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
    <meta-data
      android:name="com.google.android.geo.API_KEY"
      android:value="Your Google maps API Key Here"/>
</application>


3. Make a new copy of .env.example, in the root folder (where it is currently in), and call it .env instead. So, by the end, you should
   have the orignal file .env.example and another file called .env

4. Once that is working on your machine, download this folder and run:

    yarn install
    react-native run-android



Let me know if this doesn't work for you (IanEdington@gmail.com).
