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
    WithChildren(children: VNode[]): VNode;
    WithValue(value: string): VNode;
    WithProp(key: string, value: string): VNode;
    WithEventListener(eventName: string, topic: string, subTopic: string, bubble: boolean): VNode;
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
    private _renderer;
    private _targetElement;
    private _rootWidget;
    private _previousConfiguration;
    private _eventBus;
    constructor(targetElement: HTMLElement, rootWidget: IWidget);
    Render(): void;
    Subscribe(topic: string, subtopic: string, callBack: (eventData: any) => void, caller: any): void;
}
declare class Tempest {
    private _renderContext;
    constructor(targetElementId: string, rootWidget: IWidget);
    Render(): void;
}
declare class TempestRenderer {
    private _eventBus;
    constructor(eventBus: EventBus);
    UpdateElement(node: Node, newConfig: VNode, previousConfig: VNode, index: number): void;
    private updateChildElements;
    private updateClasses;
    private updateProps;
    private removeOldPropsAndAddNewOnes;
    private setNewProps;
    private removeOldProps;
    private createElement;
    private createCallback;
    private changed;
}
declare class ButtonWidget implements IWidget {
    Id: string;
    Child: IWidget;
    constructor(Id: string, Child: IWidget);
    OnClick: () => void;
    Render(ctx: RenderContext): VNode;
    private createCallback;
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
