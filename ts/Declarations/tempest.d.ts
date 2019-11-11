declare class AlignmentConverter {
    static GetClassForMainAxisAlignment(alignment: MainAxisAlignment): "t-justify-content-start" | "t-justify-content-end" | "t-justify-content-center" | "t-justify-content-space-around" | "t-justify-content-space-between";
    static GetClassForCrossAxisAlignment(alignment: CrossAxisAlignment): "t-align-items-start" | "t-align-items-end" | "t-align-items-center" | "t-align-items-stretch" | "t-align-items-baseline";
    static GetClassForContentAlignment(alignment: ContentAlignment): "t-align-content-start" | "t-align-content-end" | "t-align-content-center" | "t-align-content-stretch" | "t-align-content-space-around" | "t-align-content-space-between";
}
declare class VNode {
    TagName: string;
    ChildElements: VNode[];
    ElementValue: string;
    Classes: string[];
    EventListeners: EventListenerConfiguration[];
    Props: {
        [key: string]: string;
    };
    constructor(TagName: string);
    WithClasses(classes: string[]): this;
    WithClass(singleClass: string): this;
    WithChild(child: VNode): VNode;
    WithChildren(children: VNode[]): VNode;
    WithValue(value: string): VNode;
    WithProp(key: string, value: string): VNode;
    WithEventListener(eventName: string, topic: string, subTopic: string, bubble: boolean): VNode;
    ToString(): string;
}
declare class EventBus {
    private _subscriptionsByTopic;
    constructor();
    AddSubscription(subscription: EventSubscription): void;
    Publish(topic: string, subTopic: string, data: any): void;
    Clear(): void;
}
declare class EventListenerConfiguration {
    EventName: string;
    Topic: string;
    SubTopic: string;
    Bubble: boolean;
    constructor(EventName: string, Topic: string, SubTopic: string, Bubble: boolean);
}
declare class EventSubscription {
    Topic: string;
    SubTopic: string;
    CallBack: (eventData: any) => void;
    Caller: any;
    constructor(Topic: string, SubTopic: string, CallBack: (eventData: any) => void, Caller: any);
}
interface IWidget {
    Render(renderContext: RenderContext): VNode;
}
declare class RenderContext {
    private _targetElement;
    private _rootWidget;
    private _previousConfiguration;
    private _eventBus;
    private _vdom;
    constructor(targetElement: HTMLElement, rootWidget: IWidget);
    Render(): void;
    Subscribe(topic: string, subtopic: string, callBack: (eventData: any) => void, caller: any): void;
}
declare class Tempest {
    private _renderContext;
    constructor(targetElementId: string, rootWidget: IWidget);
    Render(): void;
}
declare class VirtualDom {
    private _eventBus;
    constructor(eventBus: EventBus);
    UpdateElement(currentNode: HTMLElement, newConfig: VNode, previousConfig: VNode): void;
    private updateNode;
    private updateClasses;
    private updateProps;
    private removeOldPropsAndAddNewOnes;
    private setNewProps;
    private removeOldProps;
    private listenersAreDifferent;
    private updateChildElements;
    private createElement;
    private createCallback;
}
declare enum ContentAlignment {
    Start = 0,
    End = 1,
    Center = 2,
    Stretch = 3,
    SpaceAround = 4,
    SpaceBetween = 5
}
declare enum CrossAxisAlignment {
    Start = 0,
    End = 1,
    Center = 2,
    Stretch = 3,
    Baseline = 4
}
declare enum MainAxisAlignment {
    Start = 0,
    End = 1,
    Center = 2,
    SpaceAround = 3,
    SpaceBetween = 4
}
declare class ListWidget implements IWidget {
    Children: IWidget[];
    constructor(Children: IWidget[]);
    Render(ctx: RenderContext): VNode;
}
declare class TextWidget implements IWidget {
    Value: string;
    constructor(Value: string);
    Render(_ctx: RenderContext): VNode;
}
declare class ButtonWidget implements IWidget {
    Id: string;
    Child: IWidget;
    constructor(Id: string, Child: IWidget);
    OnClick: () => void;
    ColorClass: string;
    Render(ctx: RenderContext): VNode;
    private createCallback;
}
declare class ColumnWidget implements IWidget {
    Children: IWidget[];
    MainAxisAlignment: MainAxisAlignment;
    CrossAxisAlignment: CrossAxisAlignment;
    ContentAlignment: ContentAlignment;
    constructor(Children: IWidget[]);
    Render(ctx: RenderContext): VNode;
}
declare class RowWidget implements IWidget {
    Children: IWidget[];
    MainAxisAlignment: MainAxisAlignment;
    CrossAxisAlignment: CrossAxisAlignment;
    ContentAlignment: ContentAlignment;
    constructor(Children: IWidget[]);
    Render(ctx: RenderContext): VNode;
}
declare class TabBarWidget implements IWidget {
    Id: string;
    Tabs: TabWidget[];
    ColorClass: string;
    BorderColorClass: string;
    SelectedIndex: number;
    constructor(Id: string, Tabs: TabWidget[]);
    Render(ctx: RenderContext): VNode;
    private setSelectedIndex;
    private renderButtons;
}
declare class TabWidget implements IWidget {
    TabChild: IWidget;
    ChildView: IWidget;
    constructor(TabChild: IWidget, ChildView: IWidget);
    Render(ctx: RenderContext): VNode;
}
