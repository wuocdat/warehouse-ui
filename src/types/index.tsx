export interface ChildrenRoutesType {
    name: string;
    layout: string;
    component: () => JSX.Element;
    icon?: JSX.Element | string;
    path: string;
    hide?: boolean;
}

export interface RoutesType {
    name: string;
    layout: string;
    component?: () => JSX.Element;
    icon: JSX.Element | string;
    path?: string;
    hide?: boolean;
    children?: ChildrenRoutesType[];
    mainPath?: string;
}
