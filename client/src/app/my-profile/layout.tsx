

import '../globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RootLayout({ children, }: { children: React.ReactNode}) {
  return (

    

    <html>
    <body>
         <div className=''>
          {children}
    </div>
    </body>
</html>
    


    
    
  )

}