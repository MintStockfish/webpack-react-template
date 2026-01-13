declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";

declare module "*.svg" {
    const content: string; //React.FunctionComponent<React.SVGAttributes<SVGElement>>
    export default content;
}

declare const __IS_DEV__: boolean;
declare const __IS_PROD__: boolean;
