import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import history from "@utils/history";
import { IntlProvider } from 'react-intl'
import Layout from "./layouts";
import { ConfigProvider } from 'antd'
import { zh, en } from './locales'
import { PubSub } from 'pubsub-js'
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css";



function App() {
  const [locale, setLocale] = useState('zh')
  useEffect(() => {
    const token = PubSub.subscribe('LANGUAGE', (messge, data) => {
      console.log(data)

      setLocale(data)
      return () => {
        async function xxx(){
          await PubSub.unsubscribe(token)
        }
        xxx()
        
      }
    })
  }, [])
  // const locale = 'en'
  const message = locale === 'en' ? en : zh
  return (
    <Router history={history}>
      <ConfigProvider>
        <IntlProvider locale={locale} messages={message}>
          <Layout />
        </IntlProvider>
      </ConfigProvider>
    </Router>
  );
}

export default App;
