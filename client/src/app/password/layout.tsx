

import '../globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Suspense } from "react";

export default function RootLayout({ children, }: { children: React.ReactNode}) {
  return (

     
<html>
    <body>
         <div className=''>
          <Suspense fallback={<div>Loading...</div>}>
           {children}
           </Suspense>
         
    </div>
    </body>
</html>
  )
}