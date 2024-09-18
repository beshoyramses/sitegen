import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentIcon from "@mui/icons-material/Payment";

export const SIDEBARLINKS = [
  {
    name: "Websites",
    route: "/dashboard/websites",
    icon: <DashboardIcon />,
  },
  {
    name: "Profile",
    route: "/dashboard/profile",
    icon: <AccountCircleIcon />,
  },
  {
    name: "Plans",
    route: "/dashboard/plans",
    icon: <PaymentIcon />,
  },
];

export type EditorBtns =
  | "text"
  | "container"
  | "section"
  | "contactForm"
  | "paymentForm"
  | "link"
  | "2Col"
  | "video"
  | "__body"
  | "image"
  | null
  | "3Col"
  | "product";

export const defaultStyles: React.CSSProperties = {
  backgroundPosition: "center",
  objectFit: "cover",
  backgroundRepeat: "no-repeat",
  textAlign: "left",
  opacity: "100%",
};

export const pageInitaileContent = [{"content":[{"content":[{"content":[{"content":{"innerText":"BESHOY"},"id":"281ccb9c-61cc-4df2-8f40-cc93a6b78fc3","name":"Text","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","marginTop":"0","marginLeft":"0","marginRight":"0","marginBottom":"0","font-weight":"bold","fontSize":"26px","DM Sans":"sans-serif"},"type":"text"}],"id":"33dab981-d47d-460c-ba44-4f60d5c38bf4","name":"Container","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","width":"100%","marginTop":"0"},"type":"container"},{"content":[{"content":{"innerText":"HOME"},"id":"fa7b50a0-2f4d-45c5-a267-bda4f0562b0d","name":"Link","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"center","opacity":"100%","fontSize":""},"type":"link"},{"content":{"innerText":"ABOUT"},"id":"20ce3070-cf30-495c-9116-0b237453f700","name":"Link","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"center","opacity":"100%"},"type":"link"},{"content":{"innerText":"CONTACT"},"id":"cbbc146c-7a16-4bce-b245-05087ea1cd8c","name":"Link","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"center","opacity":"100%"},"type":"link"},{"content":{"innerText":"OTHERS"},"id":"7138b84d-7176-4f27-9f43-4f8499667223","name":"Link","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"center","opacity":"100%"},"type":"link"}],"id":"64666152-bbf3-4695-93fc-6655734e6bee","name":"Container","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","width":"100%","display":"flex","alignItems":"center","justifyContent":"space-between"},"type":"container"}],"id":"ebdafb26-1b2d-4efb-98ab-6af41b30b227","name":"Two Columns","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","display":"flex","paddingTop":"0","paddingLeft":"0","paddingRight":"0","paddingBottom":"0","alignItems":"center","justifyContent":"space-evenly","backgroundSize":"auto"},"type":"2Col"},{"content":[{"content":[{"content":[{"content":{"innerText":"WHAT IS OUR SERVICES"},"id":"c8f025fe-9841-43f6-a820-10d95ded9f39","name":"Text","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","font-weight":"bold","fontSize":"40px"},"type":"text"},{"content":{"innerText":"The Brush Script MT font was designed to mimic handwriting. It is elegant and sophisticated, but can be hard to read. Use it carefully. The Brush Script MT font was designed to mimic handwriting. It is elegant and sophisticated, but can be hard to read. Use it carefully. The Brush Script MT font was designed to mimic handwriting. It is elegant and sophisticated, but can be hard to read. Use it carefully."},"id":"25fee4ef-1738-4dbd-858f-cfaefcd9f94c","name":"Text","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%"},"type":"text"}],"id":"59fd83af-b7e0-4617-a7f9-e65d7a837903","name":"Container","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","width":"100%","height":"200px"},"type":"container"},{"content":[],"id":"ec94103d-5bcb-4153-9117-8d2d43ae4cf3","name":"Container","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","width":"100%","backgroundImage":"url(https://images.pexels.com/photos/845451/pexels-photo-845451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)","backgroundSize":"cover","height":"300px"},"type":"container"}],"id":"3376d366-863a-4ee4-adc9-1756d72cd707","name":"Two Columns","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","display":"flex","paddingBottom":"0","marginBottom":"0","marginLeft":"0","marginRight":"0","alignItems":"normal"},"type":"2Col"}],"id":"7e0b2398-77d1-42a5-8d72-d3a6f8d9efe5","name":"Container","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","marginTop":"140px","paddingTop":"0","paddingLeft":"0","paddingRight":"0"},"type":"container"},{"content":[{"content":{"innerText":"WHO WE ARE"},"id":"3dd1ec92-4c1c-4041-a797-63f1967db2d6","name":"Text","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"center","opacity":"100%","font-weight":"bold","fontSize":"40px","height":""},"type":"text"},{"content":[],"id":"7b0fed0c-f60c-4d64-bd86-4a7630777315","name":"Container","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","height":"300px","backgroundImage":"url(https://images.pexels.com/photos/518244/pexels-photo-518244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)","backgroundSize":"auto","marginLeft":"5px"},"type":"container"},{"content":{"innerText":"WE ARE HERE TO HELP"},"id":"5824fc0e-63f9-4e57-8eb4-3bf020a058b7","name":"Text","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"center","opacity":"100%","fontSize":"30px","font-weight":"normal"},"type":"text"},{"content":{"innerText":"The Brush Script MT font was designed to mimic handwriting. It is elegant and sophisticated, but can be hard to read. Use it carefully. The Brush Script MT font was designed to mimic handwriting. It is elegant and sophisticated, but can be hard to read. Use it carefully. The Brush Script MT font was designed to mimic handwriting. It is elegant and sophisticated, but can be hard to read. Use it carefully."},"id":"5e678d9e-3b27-4f50-803a-1124208720cb","name":"Text","styles":{"color":"black","backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"center","opacity":"100%","fontSize":"17px"},"type":"text"}],"id":"f9e176ee-6260-4f74-8ea3-ead0361713db","name":"Container","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%","height":"","marginTop":"145px"},"type":"container"},{"content":[],"id":"8f101c68-a7ca-495a-bfcc-6b464ae58e90","name":"Container","styles":{"backgroundPosition":"center","objectFit":"cover","backgroundRepeat":"no-repeat","textAlign":"left","opacity":"100%"},"type":"container"},{"content":[],"id":"538d7b7e-674a-4387-b73a-ae8f3c91222a","name":"Contact Form","styles":{},"type":"contactForm"}],"id":"__body","name":"Body","styles":{"marginTop":"0","paddingTop":"0","paddingLeft":"0","paddingRight":"0","paddingBottom":"0","backgroundSize":"cover","height":""},"type":"__body"}];