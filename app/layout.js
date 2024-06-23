import { AppProvider } from './config/AppContext';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/globals.css";

export default function RootLayout({ children }) {
  return (
    <AppProvider>
      <html lang="en">
        <head>
          <title>Painel-marmitaria</title>          
        </head>
        <body>{children}<audio muted={true}></audio></body>
      </html>
    </AppProvider>
  )
}