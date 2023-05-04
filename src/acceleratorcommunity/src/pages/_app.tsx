import type { AppProps } from 'next/app';
import Router from 'next/router';
import { I18nProvider } from 'next-localization';
import NProgress from 'nprogress';
import { SitecorePageProps } from 'lib/page-props';
import WebProvider from '../Context/WebProvider';
import '../assets/dashboard.css';
import '../assets/profile.css';
import '../assets/addPost.css';
import '../assets/globalNavigation.css';
import '../assets/darkTheme.css';

// Using bootstrap and nprogress are completely optional.
//  bootstrap is used here to provide a clean layout for samples, without needing extra CSS in the sample app
//  nprogress provides a loading indicator on page/route changes
// Remove these in package.json as well if removed here.
import 'bootstrap/dist/css/bootstrap.css';
import 'nprogress/nprogress.css';
import 'assets/app.css';
import 'assets/logo.css';
import 'assets/grid.css';
import 'assets/rte.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import '../assets/richTextEditor.css';
import 'react-loading-skeleton/dist/skeleton.css';
import SocketProvider from 'src/Context/SocketProvider';
import FirebaseProvider from 'src/Context/FirebaseProvider';

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  return (
    // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
    // Note Next.js does not (currently) provide anything for translation, only i18n routing.
    // If your app is not multilingual, next-localization and references to it can be removed.
    <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
      <SocketProvider>
        <FirebaseProvider>
          <WebProvider>
            <Component {...rest} />
          </WebProvider>
        </FirebaseProvider>
      </SocketProvider>
    </I18nProvider>
  );
}

export default App;
