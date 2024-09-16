import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaymentIcon from '@mui/icons-material/Payment';

export const SIDEBARLINKS = [
  {
    name: "Websites",
    route: "/dashboard/websites",
    icon: <DashboardIcon />
  },
  {
    name: "Profile",
    route: "/dashboard/profile",
    icon: <AccountCircleIcon />
  },
  {
    name: "Plans",
    route: "/dashboard/plans",
    icon: <PaymentIcon />
  }
];

export type EditorBtns =
  | 'text'
  | 'container'
  | 'section'
  | 'contactForm'
  | 'paymentForm'
  | 'link'
  | '2Col'
  | 'video'
  | '__body'
  | 'image'
  | null
  | '3Col'
  | "product"

export const defaultStyles: React.CSSProperties = {
  backgroundPosition: 'center',
  objectFit: 'cover',
  backgroundRepeat: 'no-repeat',
  textAlign: 'left',
  opacity: '100%',
}

export const pageInitaileContent = [{"content":[{"content":[{"content":[{"content":{"innerText":"Your Website Name"},"id":"f9b28462-64ed-423b-ac6a-1d81cac0169e","name":"Text","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","font-weight":"bold","fontSize":"30px"},"type":"text"}],"id":"b5c15901-ffca-49f5-b5fa-21a6081f8db0","name":"Container","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","width":"100%"},"type":"container"},{"content":[{"content":{"innerText":"HOME","href":"home"},"id":"2d488abe-46fc-4706-a3df-4e79c93ce62d","name":"Link","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%"},"type":"link"},{"content":{"innerText":"ABOUT US","href":"about"},"id":"7b68536a-7a0c-4604-a3fa-78441d86ae54","name":"Link","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%"},"type":"link"},{"content":{"innerText":"CONTACT US"},"id":"00ab363a-d71e-4e8e-bb48-51ad3588fc7b","name":"Link","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%"},"type":"link"},{"content":{"innerText":"OTHER"},"id":"de14e315-0d65-4201-a9fb-20b86058a1d6","name":"Link","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%"},"type":"link"}],"id":"ef2c92d8-7519-4b29-909a-722a84b66799","name":"Container","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","width":"100%","justifyContent":"space-between","alignItems":"normal","display":"flex"},"type":"container"}],"id":"3bb3ac0b-ecc0-4e07-95bb-bc47b0411226","name":"Two Columns","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","display":"flex","justifyContent":"space-between","alignItems":"center","backgroundImage":""},"type":"2Col"},{"content":[{"content":[{"content":{"innerText":"HOME"},"id":"0ebf800d-be60-4324-bafe-4be78057cfc0","name":"Text","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","font-weight":"bold","fontSize":"40px"},"type":"text"},{"content":{"innerText":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, aut dolor sunt laborum fugit animi\n architecto. Enim incidunt in reprehenderit eos repellendus nisi atque, ipsam minima modi alias, quis \n unde mollitia? Ex a quasi totam provident! Quisquam tempore architecto,\n perferendis minus, nemo porro explicabo maiores quidem incidunt voluptatum in voluptate!"},"id":"d8485985-b2dd-4388-859f-919fcc200fdf","name":"Text","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%"},"type":"text"},{"content":[],"id":"74a252bd-94c1-4a66-8480-6bfe8dea4fff","name":"Container","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%"},"type":"container"}],"id":"67d878b2-dae1-4692-8ca3-37c0b3d45f22","name":"Container","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","width":"100%"},"type":"container"},{"content":[],"id":"e9f02937-0aeb-4077-861c-ab12a17aa40a","name":"Container","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","width":"100%"},"type":"container"}],"id":"fd476ba9-ea55-44c1-af99-896b93c079cb","name":"Two Columns","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","display":"flex","backgroundImage":""},"type":"2Col"},{"content":[{"content":{"innerText":"WHAT IS OUR SERVICES"},"id":"f22cf1b1-8626-4edd-aa12-beaef26dac43","name":"Text","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%"},"type":"text"},{"content":[],"id":"f2a34b04-3db5-4dc6-9f29-36ddf8fbc5ef","name":"Container","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%"},"type":"container"},{"content":{"innerText":"CONTACT US"},"id":"9aa5737b-b220-4351-8b82-2f55905b8b87","name":"Text","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"center","opacity":"100%","font-weight":"bold","fontSize":"40px","backgroundSize":"cover","backgroundImage":""},"type":"text"},{"content":[{"content":[{"content":[{"content":{"innerText":"Reach US\n WE Will Help "},"id":"8ad2970c-068f-4baf-862c-6a5e42863ba1","name":"Text","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","fontSize":"40px","font-weight":"bold"},"type":"text"}],"id":"d98834f4-a7fd-4aca-ac2b-b7b19113ba24","name":"Container","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","width":"100%"},"type":"container"},{"content":[{"content":[],"id":"22e06fc5-6200-4095-b23b-e2d8e62013a6","name":"Contact Form","styles":{},"type":"contactForm"}],"id":"af4eb466-d0a7-4a50-9bcc-12a2aed28f51","name":"Container","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","width":"100%"},"type":"container"}],"id":"b11abf23-1bb4-4c38-a3a5-82f640c19ec3","name":"Two Columns","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","display":"flex"},"type":"2Col"}],"id":"d70135d6-726b-49f8-a515-566a42e653aa","name":"Container","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%"},"type":"container"},{"content":[],"id":"36fab80f-df8a-4aac-9f7e-381925474ec5","name":"Two Columns","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","display":"flex"},"type":"2Col"}],"id":"40901078-d63c-4d1c-af59-92b11ccb551e","name":"Container","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","backgroundImage":""},"type":"container"}],"id":"__body","name":"Body","styles":{"backgroundImage":"url(https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3JhZGllbnQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww)","backgroundSize":"cover"},"type":"__body"}]