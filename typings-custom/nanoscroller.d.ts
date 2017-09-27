/* tslint:disable */
interface JQuery {
    nanoScroller(options?: INanoScrollerOptions): any;
}

/* tslint:enable */

interface INanoScrollerOptions {
    scroll?: string;
    scrollTop?: number;
    scrollBottom?: number;
    scrollTo?: any;
    stop?: boolean;
    destroy?: boolean;
    flash?: boolean;
    iOSNativeScrolling?: boolean;
    sliderMinHeight?: number;
    sliderMaxHeight?: number;
    preventPageScrolling?: boolean;
    disableResize?: boolean;
    alwaysVisible?: boolean;
    flashDelay?: number;
    paneClass?: string;
    sliderClass?: string;
    contentClass?: string;
    enabledClass?: string;
    flashedClass?: string;
    activeClass?: string;
    tabIndex?: number;
}
