declare module '*.scss' {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.svg' {
    import React = require('react');

    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
    // export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare const __IS_DEV__: boolean;
