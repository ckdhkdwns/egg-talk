// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    subTextColor: string;
    redTextColor: string;
    mainColor: string;
    subColor: string;
    navbarColor: string;
    inputColor: string;
    tableHeaderColor: string;
    tableBodyColor: string;
    hoverColor: string;
    incomingMessage: string;
    outgoingMessage: string;
  }
}
