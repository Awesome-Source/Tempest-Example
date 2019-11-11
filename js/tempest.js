var AlignmentConverter = (function () {
    function AlignmentConverter() {
    }
    AlignmentConverter.GetClassForMainAxisAlignment = function (alignment) {
        switch (alignment) {
            case MainAxisAlignment.Start: return "t-justify-content-start";
            case MainAxisAlignment.End: return "t-justify-content-end";
            case MainAxisAlignment.Center: return "t-justify-content-center";
            case MainAxisAlignment.SpaceAround: return "t-justify-content-space-around";
            case MainAxisAlignment.SpaceBetween: return "t-justify-content-space-between";
            default: throw "Unknown main axis alignment: " + alignment;
        }
    };
    AlignmentConverter.GetClassForCrossAxisAlignment = function (alignment) {
        switch (alignment) {
            case CrossAxisAlignment.Start: return "t-align-items-start";
            case CrossAxisAlignment.End: return "t-align-items-end";
            case CrossAxisAlignment.Center: return "t-align-items-center";
            case CrossAxisAlignment.Stretch: return "t-align-items-stretch";
            case CrossAxisAlignment.Baseline: return "t-align-items-baseline";
            default: throw "Unknown cross axis alignment: " + alignment;
        }
    };
    AlignmentConverter.GetClassForContentAlignment = function (alignment) {
        switch (alignment) {
            case ContentAlignment.Start: return "t-align-content-start";
            case ContentAlignment.End: return "t-align-content-end";
            case ContentAlignment.Center: return "t-align-content-center";
            case ContentAlignment.Stretch: return "t-align-content-stretch";
            case ContentAlignment.SpaceAround: return "t-align-content-space-around";
            case ContentAlignment.SpaceBetween: return "t-align-content-space-between";
            default: throw "Unknown content alignment: " + alignment;
        }
    };
    return AlignmentConverter;
}());
var VNode = (function () {
    function VNode(TagName) {
        this.TagName = TagName;
        this.ChildElements = [];
        this.ElementValue = null;
        this.Classes = [];
    }
    VNode.prototype.WithClasses = function (classes) {
        for (var i = 0; i < classes.length; i++) {
            this.Classes.push(classes[i]);
        }
        return this;
    };
    VNode.prototype.WithClass = function (singleClass) {
        this.Classes.push(singleClass);
        return this;
    };
    VNode.prototype.WithChild = function (child) {
        this.ChildElements.push(child);
        return this;
    };
    VNode.prototype.WithChildren = function (children) {
        for (var i = 0; i < children.length; i++) {
            this.ChildElements.push(children[i]);
        }
        return this;
    };
    VNode.prototype.WithValue = function (value) {
        this.ElementValue = value;
        return this;
    };
    VNode.prototype.WithProp = function (key, value) {
        if (!this.Props) {
            this.Props = {};
        }
        this.Props[key] = value;
        return this;
    };
    VNode.prototype.WithEventListener = function (eventName, topic, subTopic, bubble) {
        if (!this.EventListeners) {
            this.EventListeners = [];
        }
        this.EventListeners.push(new EventListenerConfiguration(eventName, topic, subTopic, bubble));
        return this;
    };
    VNode.prototype.ToString = function () {
        return this.TagName + " (" + this.ChildElements.length + ") [" + this.Classes.join(';') + "] " + this.ElementValue;
    };
    return VNode;
}());
var EventBus = (function () {
    function EventBus() {
        this._subscriptionsByTopic = {};
    }
    EventBus.prototype.AddSubscription = function (subscription) {
        var subscriptionsOfTopic = this._subscriptionsByTopic[subscription.Topic];
        if (subscriptionsOfTopic) {
            subscriptionsOfTopic.push(subscription);
            return;
        }
        this._subscriptionsByTopic[subscription.Topic] = [subscription];
    };
    EventBus.prototype.Publish = function (topic, subTopic, data) {
        console.log("Publish on topic: " + topic + " with subtopic: " + subTopic);
        var subscriptionsOfTopic = this._subscriptionsByTopic[topic];
        if (!subscriptionsOfTopic) {
            return;
        }
        for (var i = 0; i < subscriptionsOfTopic.length; i++) {
            var currentSubscription = subscriptionsOfTopic[i];
            if (currentSubscription.SubTopic !== subTopic) {
                continue;
            }
            currentSubscription.CallBack.call(currentSubscription.Caller, data);
        }
    };
    EventBus.prototype.Clear = function () {
        this._subscriptionsByTopic = {};
    };
    return EventBus;
}());
var EventListenerConfiguration = (function () {
    function EventListenerConfiguration(EventName, Topic, SubTopic, Bubble) {
        this.EventName = EventName;
        this.Topic = Topic;
        this.SubTopic = SubTopic;
        this.Bubble = Bubble;
    }
    return EventListenerConfiguration;
}());
var EventSubscription = (function () {
    function EventSubscription(Topic, SubTopic, CallBack, Caller) {
        this.Topic = Topic;
        this.SubTopic = SubTopic;
        this.CallBack = CallBack;
        this.Caller = Caller;
    }
    return EventSubscription;
}());
var RenderContext = (function () {
    function RenderContext(targetElement, rootWidget) {
        this._targetElement = targetElement;
        this._rootWidget = rootWidget;
        this._eventBus = new EventBus();
        this._vdom = new VirtualDom(this._eventBus);
        this._previousConfiguration = new VNode(this._targetElement.tagName);
    }
    RenderContext.prototype.Render = function () {
        this._eventBus.Clear();
        var newConfiguration = this._rootWidget.Render(this);
        this._vdom.UpdateElement(this._targetElement, newConfiguration, this._previousConfiguration);
        this._previousConfiguration = newConfiguration;
    };
    RenderContext.prototype.Subscribe = function (topic, subtopic, callBack, caller) {
        this._eventBus.AddSubscription(new EventSubscription(topic, subtopic, callBack, caller));
    };
    return RenderContext;
}());
var Tempest = (function () {
    function Tempest(targetElementId, rootWidget) {
        var targetElement = document.getElementById(targetElementId);
        this._renderContext = new RenderContext(targetElement, rootWidget);
        if (!targetElement) {
            console.error("Could not find element for id: " + targetElementId);
        }
    }
    Tempest.prototype.Render = function () {
        this._renderContext.Render();
    };
    return Tempest;
}());
var VirtualDom = (function () {
    function VirtualDom(eventBus) {
        this._eventBus = eventBus;
    }
    VirtualDom.prototype.UpdateElement = function (currentNode, newConfig, previousConfig) {
        this.updateNode(newConfig, previousConfig, currentNode);
        this.updateClasses(newConfig, previousConfig, currentNode);
        this.updateProps(currentNode, newConfig, previousConfig);
        this.updateChildElements(newConfig, previousConfig, currentNode);
    };
    VirtualDom.prototype.updateNode = function (newConfig, previousConfig, currentNode) {
        if (newConfig.ElementValue !== previousConfig.ElementValue) {
            currentNode.innerText = newConfig.ElementValue;
        }
    };
    VirtualDom.prototype.updateClasses = function (newConfig, previousConfig, childNode) {
        var newConfigClasses = newConfig.Classes.join(" ");
        var previousConfigClasses = previousConfig.Classes.join(" ");
        if (newConfigClasses !== previousConfigClasses) {
            childNode.className = newConfigClasses;
        }
    };
    VirtualDom.prototype.updateProps = function (target, newConfig, previousConfig) {
        var newProps = newConfig.Props;
        var oldProps = previousConfig.Props;
        if (!newProps && !oldProps) {
            return;
        }
        if (!newProps) {
            this.removeOldProps(oldProps, target);
            return;
        }
        var newKeys = Object.keys(newProps);
        if (!oldProps) {
            this.setNewProps(newKeys, target, newProps);
            return;
        }
        this.removeOldPropsAndAddNewOnes(newKeys, target, newProps, oldProps);
    };
    VirtualDom.prototype.removeOldPropsAndAddNewOnes = function (newKeys, target, newProps, oldProps) {
        for (var i = 0; i < newKeys.length; i++) {
            var currentKey = newKeys[i];
            if (!oldProps.hasOwnProperty(currentKey)) {
                target.removeAttribute(name);
                continue;
            }
            if (newProps[currentKey] !== oldProps[currentKey]) {
                target.setAttribute(currentKey, newProps[currentKey]);
            }
        }
    };
    VirtualDom.prototype.setNewProps = function (newKeys, target, newProps) {
        for (var n = 0; n < newKeys.length; n++) {
            var currentKey = newKeys[n];
            target.setAttribute(currentKey, newProps[currentKey]);
        }
    };
    VirtualDom.prototype.removeOldProps = function (oldProps, target) {
        var oldKeys = Object.keys(oldProps);
        for (var o = 0; o < oldKeys.length; o++) {
            target.removeAttribute(oldKeys[o]);
        }
    };
    VirtualDom.prototype.listenersAreDifferent = function (newConfig, previousConfig) {
        if (!newConfig.EventListeners && !previousConfig.EventListeners) {
            return false;
        }
        if (!newConfig.EventListeners && previousConfig.EventListeners) {
            return true;
        }
        if (newConfig.EventListeners && !previousConfig.EventListeners) {
            return true;
        }
        if (newConfig.EventListeners.length !== previousConfig.EventListeners.length) {
            return true;
        }
        for (var i = 0; i < newConfig.EventListeners.length; i++) {
            var newListener = newConfig.EventListeners[i];
            var previousListener = previousConfig.EventListeners[i];
            var eventNamesDiffer = newListener.EventName !== previousListener.EventName;
            var topicsDiffer = newListener.Topic !== previousListener.Topic;
            var subTopicDiffer = newListener.SubTopic !== previousListener.SubTopic;
            var bubbleSettingsDiffer = newListener.Bubble !== previousListener.Bubble;
            if (eventNamesDiffer || topicsDiffer || subTopicDiffer || bubbleSettingsDiffer) {
                return true;
            }
        }
        return false;
    };
    VirtualDom.prototype.updateChildElements = function (newConfig, previousConfig, parentNode) {
        var newLength = newConfig.ChildElements.length;
        var oldLength = previousConfig.ChildElements.length;
        var minLength = Math.min(newLength, oldLength);
        for (var i = 0; i < minLength; i++) {
            var newChildConfig = newConfig.ChildElements[i];
            var prevChildConfig = previousConfig.ChildElements[i];
            if (newChildConfig.TagName !== prevChildConfig.TagName) {
                parentNode.replaceChild(this.createElement(newChildConfig), parentNode.children[i]);
                continue;
            }
            if (this.listenersAreDifferent(newChildConfig, prevChildConfig)) {
                parentNode.replaceChild(this.createElement(newChildConfig), parentNode.children[i]);
                continue;
            }
            this.UpdateElement(parentNode.children[i], newChildConfig, prevChildConfig);
        }
        for (var i = oldLength - 1; i >= minLength; i--) {
            var childNode = parentNode.childNodes[i];
            parentNode.removeChild(childNode);
        }
        for (var i = minLength; i < newLength; i++) {
            parentNode.appendChild(this.createElement(newConfig.ChildElements[i]));
        }
    };
    VirtualDom.prototype.createElement = function (currentConfig) {
        var createdElement = document.createElement(currentConfig.TagName);
        if (currentConfig.ElementValue) {
            createdElement.innerText = currentConfig.ElementValue;
        }
        if (currentConfig.Classes.length > 0) {
            createdElement.className = currentConfig.Classes.join(" ");
        }
        if (currentConfig.Props) {
            var keys = Object.keys(currentConfig.Props);
            this.setNewProps(keys, createdElement, currentConfig.Props);
        }
        if (currentConfig.EventListeners) {
            for (var el = 0; el < currentConfig.EventListeners.length; el++) {
                var listener = currentConfig.EventListeners[el];
                var callBack = this.createCallback(this._eventBus, listener.Topic, listener.SubTopic);
                createdElement.addEventListener(listener.EventName, callBack, listener.Bubble);
            }
        }
        for (var i = 0; i < currentConfig.ChildElements.length; i++) {
            var child = currentConfig.ChildElements[i];
            createdElement.appendChild(this.createElement(child));
        }
        return createdElement;
    };
    VirtualDom.prototype.createCallback = function (eventBus, topic, subTopic) {
        return function (eventData) {
            eventBus.Publish(topic, subTopic, eventData);
        };
    };
    return VirtualDom;
}());
var ContentAlignment;
(function (ContentAlignment) {
    ContentAlignment[ContentAlignment["Start"] = 0] = "Start";
    ContentAlignment[ContentAlignment["End"] = 1] = "End";
    ContentAlignment[ContentAlignment["Center"] = 2] = "Center";
    ContentAlignment[ContentAlignment["Stretch"] = 3] = "Stretch";
    ContentAlignment[ContentAlignment["SpaceAround"] = 4] = "SpaceAround";
    ContentAlignment[ContentAlignment["SpaceBetween"] = 5] = "SpaceBetween";
})(ContentAlignment || (ContentAlignment = {}));
var CrossAxisAlignment;
(function (CrossAxisAlignment) {
    CrossAxisAlignment[CrossAxisAlignment["Start"] = 0] = "Start";
    CrossAxisAlignment[CrossAxisAlignment["End"] = 1] = "End";
    CrossAxisAlignment[CrossAxisAlignment["Center"] = 2] = "Center";
    CrossAxisAlignment[CrossAxisAlignment["Stretch"] = 3] = "Stretch";
    CrossAxisAlignment[CrossAxisAlignment["Baseline"] = 4] = "Baseline";
})(CrossAxisAlignment || (CrossAxisAlignment = {}));
var MainAxisAlignment;
(function (MainAxisAlignment) {
    MainAxisAlignment[MainAxisAlignment["Start"] = 0] = "Start";
    MainAxisAlignment[MainAxisAlignment["End"] = 1] = "End";
    MainAxisAlignment[MainAxisAlignment["Center"] = 2] = "Center";
    MainAxisAlignment[MainAxisAlignment["SpaceAround"] = 3] = "SpaceAround";
    MainAxisAlignment[MainAxisAlignment["SpaceBetween"] = 4] = "SpaceBetween";
})(MainAxisAlignment || (MainAxisAlignment = {}));
var ListWidget = (function () {
    function ListWidget(Children) {
        this.Children = Children;
    }
    ListWidget.prototype.Render = function (ctx) {
        var config = new VNode("ul").WithClass("t-ul");
        for (var i = 0; i < this.Children.length; i++) {
            var currentChild = this.Children[i];
            var childConfig = new VNode("li")
                .WithChildren([currentChild.Render(ctx)]);
            config.ChildElements.push(childConfig);
        }
        return config;
    };
    return ListWidget;
}());
var TextWidget = (function () {
    function TextWidget(Value) {
        this.Value = Value;
    }
    TextWidget.prototype.Render = function (_ctx) {
        return new VNode("span").WithValue(this.Value);
    };
    return TextWidget;
}());
var ButtonWidget = (function () {
    function ButtonWidget(Id, Child) {
        this.Id = Id;
        this.Child = Child;
        this.ColorClass = "t-blue";
    }
    ButtonWidget.prototype.Render = function (ctx) {
        var btn = new VNode("button")
            .WithClasses(["t-button", this.ColorClass])
            .WithChildren([this.Child.Render(ctx)]);
        if (this.OnClick) {
            var callBack = this.createCallback(this.OnClick, this);
            ctx.Subscribe("buttonclick", this.Id, callBack, this);
            btn.WithEventListener("click", "buttonclick", this.Id, false);
        }
        return btn;
    };
    ButtonWidget.prototype.createCallback = function (clickCallBack, caller) {
        return function (_data) { return clickCallBack.call(caller); };
    };
    return ButtonWidget;
}());
var ColumnWidget = (function () {
    function ColumnWidget(Children) {
        this.Children = Children;
        this.MainAxisAlignment = MainAxisAlignment.SpaceBetween;
        this.CrossAxisAlignment = CrossAxisAlignment.Center;
        this.ContentAlignment = ContentAlignment.Center;
    }
    ColumnWidget.prototype.Render = function (ctx) {
        return new VNode("div")
            .WithClasses([
            "t-flex-column",
            AlignmentConverter.GetClassForMainAxisAlignment(this.MainAxisAlignment),
            AlignmentConverter.GetClassForCrossAxisAlignment(this.CrossAxisAlignment),
            AlignmentConverter.GetClassForContentAlignment(this.ContentAlignment)
        ])
            .WithChildren(this.Children.map(function (c) { return c.Render(ctx); }));
    };
    return ColumnWidget;
}());
var RowWidget = (function () {
    function RowWidget(Children) {
        this.Children = Children;
        this.MainAxisAlignment = MainAxisAlignment.SpaceBetween;
        this.CrossAxisAlignment = CrossAxisAlignment.Center;
        this.ContentAlignment = ContentAlignment.Center;
    }
    RowWidget.prototype.Render = function (ctx) {
        return new VNode("div")
            .WithClasses([
            "t-flex-row",
            AlignmentConverter.GetClassForMainAxisAlignment(this.MainAxisAlignment),
            AlignmentConverter.GetClassForCrossAxisAlignment(this.CrossAxisAlignment),
            AlignmentConverter.GetClassForContentAlignment(this.ContentAlignment)
        ])
            .WithChildren(this.Children.map(function (c) { return c.Render(ctx); }));
    };
    return RowWidget;
}());
var TabBarWidget = (function () {
    function TabBarWidget(Id, Tabs) {
        this.Id = Id;
        this.Tabs = Tabs;
        this.ColorClass = "t-blue";
        this.BorderColorClass = "t-border-white";
        this.SelectedIndex = 0;
    }
    TabBarWidget.prototype.Render = function (ctx) {
        var buttonChildren = [];
        this.renderButtons(ctx, buttonChildren);
        var tabBarDiv = new VNode("div")
            .WithClasses([this.ColorClass, "t-flex-row", "t-justify-content-start", "t-align-items-start"])
            .WithChildren(buttonChildren);
        var tabViewDiv = new VNode("div")
            .WithChildren([this.Tabs[this.SelectedIndex].Render(ctx)]);
        var completeDiv = new VNode("div")
            .WithChildren([tabBarDiv, tabViewDiv]);
        return completeDiv;
    };
    TabBarWidget.prototype.setSelectedIndex = function (index, ctx) {
        var _this = this;
        return function () {
            _this.SelectedIndex = index;
            ctx.Render();
        };
    };
    TabBarWidget.prototype.renderButtons = function (ctx, buttonChildren) {
        for (var t = 0; t < this.Tabs.length; t++) {
            var buttonWidget = new ButtonWidget(this.Id + "Tab" + t, this.Tabs[t].TabChild);
            buttonWidget.ColorClass = this.ColorClass;
            buttonWidget.OnClick = this.setSelectedIndex(t, ctx);
            var buttonConfig = buttonWidget.Render(ctx);
            if (this.SelectedIndex === t) {
                buttonConfig.WithClasses(["t-bottombar", this.BorderColorClass]);
            }
            buttonChildren.push(buttonConfig);
        }
    };
    return TabBarWidget;
}());
var TabWidget = (function () {
    function TabWidget(TabChild, ChildView) {
        this.TabChild = TabChild;
        this.ChildView = ChildView;
    }
    TabWidget.prototype.Render = function (ctx) {
        return this.ChildView.Render(ctx);
    };
    return TabWidget;
}());
//# sourceMappingURL=tempest.js.map