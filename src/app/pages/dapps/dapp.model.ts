export interface Dapp {
  name: string;
  tagline: string;
  summary: string;
  description: string;
  logoURI: string;
  homePageURI: string;
  bannerImageURI: string;
  backgroundImageURI: string;
  primaryColor: string; // html color code used for branding dapp page
  secondaryColor: string; // html color code can used for branding dapp page.
  socials: [{
    name: string;
    profileURI: string;
    iconURI?: string; // this is optional as iconURI is normally uses standard social network logos.
  }];
  screenshots: [{
    text: string;
    imageURI: string;
  }];
}
