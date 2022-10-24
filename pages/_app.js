import ConnectedIntlProvider from '../config/i18n/ConnectedIntlProvider'

import { MainWrapperStore } from '../contexts/MainWrapperContext'
import { MainLoaderProvider } from '../contexts/LoaderContext'
import { CommonDataProvider } from '../contexts/CommonDataContext'

import MainLayout from '../components/main-layout/MainLayout'

import '../public/stylesheets/style.scss'
import { NewsletterProvider } from '../contexts/NewsletterContext'

function App({ Component, pageProps }) {
  return (
    <ConnectedIntlProvider>
      <CommonDataProvider>
        <MainWrapperStore>
          <MainLoaderProvider>
            <NewsletterProvider>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </NewsletterProvider>
          </MainLoaderProvider>
        </MainWrapperStore>
      </CommonDataProvider>
    </ConnectedIntlProvider>
  )
}

export default App
