var AligmentExample = (function () {
    function AligmentExample() {
        this._rowButton = new ButtonWidget("RowButton", new TextWidget("Row"));
        this._columnButton = new ButtonWidget("ColumnButton", new TextWidget("Column"));
        this._mxStartButton = new ButtonWidget("MxStart", new TextWidget("Start"));
        this._mxEndButton = new ButtonWidget("MxEnd", new TextWidget("End"));
        this._mxCenterButton = new ButtonWidget("MxCenter", new TextWidget("Center"));
        this._mxSpaceAroundButton = new ButtonWidget("MxSpaceAround", new TextWidget("Space Around"));
        this._mxSpaceBetweenButton = new ButtonWidget("MxSpaceBetween", new TextWidget("Space Between"));
        this._cxStartButton = new ButtonWidget("CxStart", new TextWidget("Start"));
        this._cxEndButton = new ButtonWidget("CxEnd", new TextWidget("End"));
        this._cxCenterButton = new ButtonWidget("CxCenter", new TextWidget("Center"));
        this._cxStretchButton = new ButtonWidget("CxStretch", new TextWidget("Stretch"));
        this._cxBaselineButton = new ButtonWidget("CxBaseline", new TextWidget("Baseline"));
        this._displayInRow = true;
        this._mainAxisAlignment = MainAxisAlignment.SpaceBetween;
        this._crossAxisAlignment = CrossAxisAlignment.Center;
    }
    AligmentExample.prototype.Render = function (ctx) {
        this.wireUpAlignmentEvents(ctx);
        this.wireUpMainAxisEvents(ctx);
        this.wireUpCrossAxisEvents(ctx);
        var layoutButtonDiv = new VNode("div")
            .WithChildren([this._rowButton, this._columnButton].map(function (b) { return b.Render(ctx); }));
        var mainAxisButtonDiv = new VNode("div")
            .WithChildren([this._mxStartButton, this._mxEndButton, this._mxCenterButton, this._mxSpaceAroundButton, this._mxSpaceBetweenButton].map(function (b) { return b.Render(ctx); }));
        var crossAxisButtonDiv = new VNode("div")
            .WithChildren([this._cxStartButton, this._cxEndButton, this._cxCenterButton, this._cxStretchButton, this._cxBaselineButton].map(function (b) { return b.Render(ctx); }));
        var numberedBoxes = [1, 2, 3, 4, 5].map(function (n) { return new NumberedBoxWidget(n); });
        var alignmentContainer = this._displayInRow
            ? new RowWidget(numberedBoxes)
            : new ColumnWidget(numberedBoxes);
        alignmentContainer.MainAxisAlignment = this._mainAxisAlignment;
        alignmentContainer.CrossAxisAlignment = this._crossAxisAlignment;
        var blueBox = new BlueBoxWidget(alignmentContainer);
        var boxDiv = blueBox.Render(ctx);
        var space = new VNode("br");
        return new VNode("div")
            .WithClass("t-padding-small")
            .WithChildren([layoutButtonDiv, space, mainAxisButtonDiv, space, crossAxisButtonDiv, space, boxDiv]);
    };
    AligmentExample.prototype.wireUpMainAxisEvents = function (ctx) {
        var _this = this;
        this._mxStartButton.OnClick = function () {
            _this._mainAxisAlignment = MainAxisAlignment.Start;
            ctx.Render();
        };
        this._mxEndButton.OnClick = function () {
            _this._mainAxisAlignment = MainAxisAlignment.End;
            ctx.Render();
        };
        this._mxCenterButton.OnClick = function () {
            _this._mainAxisAlignment = MainAxisAlignment.Center;
            ctx.Render();
        };
        this._mxSpaceAroundButton.OnClick = function () {
            _this._mainAxisAlignment = MainAxisAlignment.SpaceAround;
            ctx.Render();
        };
        this._mxSpaceBetweenButton.OnClick = function () {
            _this._mainAxisAlignment = MainAxisAlignment.SpaceBetween;
            ctx.Render();
        };
    };
    AligmentExample.prototype.wireUpCrossAxisEvents = function (ctx) {
        var _this = this;
        this._cxStartButton.OnClick = function () {
            _this._crossAxisAlignment = CrossAxisAlignment.Start;
            ctx.Render();
        };
        this._cxEndButton.OnClick = function () {
            _this._crossAxisAlignment = CrossAxisAlignment.End;
            ctx.Render();
        };
        this._cxCenterButton.OnClick = function () {
            _this._crossAxisAlignment = CrossAxisAlignment.Center;
            ctx.Render();
        };
        this._cxStretchButton.OnClick = function () {
            _this._crossAxisAlignment = CrossAxisAlignment.Stretch;
            ctx.Render();
        };
        this._cxBaselineButton.OnClick = function () {
            _this._crossAxisAlignment = CrossAxisAlignment.Baseline;
            ctx.Render();
        };
    };
    AligmentExample.prototype.wireUpAlignmentEvents = function (ctx) {
        var _this = this;
        this._rowButton.OnClick = function () {
            _this._displayInRow = true;
            ctx.Render();
        };
        this._columnButton.OnClick = function () {
            _this._displayInRow = false;
            ctx.Render();
        };
    };
    return AligmentExample;
}());
var BlueBoxWidget = (function () {
    function BlueBoxWidget(Child) {
        this.Child = Child;
    }
    BlueBoxWidget.prototype.Render = function (ctx) {
        return new VNode("div")
            .WithClass("t-blue")
            .WithChildren([this.Child.Render(ctx)]);
    };
    return BlueBoxWidget;
}());
var CardContainerWidget = (function () {
    function CardContainerWidget(Child) {
        this.Child = Child;
    }
    CardContainerWidget.prototype.Render = function (ctx) {
        return new VNode("div")
            .WithClasses(["t-container", "t-card", "t-section", "t-margin", "t-white"])
            .WithChildren([this.Child.Render(ctx)]);
    };
    return CardContainerWidget;
}());
var ColorButtonExample = (function () {
    function ColorButtonExample() {
        var greenButton = new ButtonWidget("GreenButton", new TextWidget("Green"));
        var redButton = new ButtonWidget("RedButton", new TextWidget("Red"));
        var blueButton = new ButtonWidget("BlueButton", new TextWidget("Blue"));
        var yellowButton = new ButtonWidget("YellowButton", new TextWidget("Yellow"));
        var orangeButton = new ButtonWidget("OrangeButton", new TextWidget("Orange"));
        greenButton.ColorClass = "t-green";
        redButton.ColorClass = "t-red";
        blueButton.ColorClass = "t-blue";
        yellowButton.ColorClass = "t-yellow";
        orangeButton.ColorClass = "t-orange";
        this._buttons = [greenButton, redButton, blueButton, yellowButton, orangeButton];
    }
    ColorButtonExample.prototype.SetColors = function (newColorClass, ctx) {
        this._buttons.forEach(function (b) { return b.ColorClass = newColorClass; });
        ctx.Render();
    };
    ColorButtonExample.prototype.Render = function (ctx) {
        var _this = this;
        this._buttons[0].OnClick = function () { return _this.SetColors("t-green", ctx); };
        this._buttons[1].OnClick = function () { return _this.SetColors("t-red", ctx); };
        this._buttons[2].OnClick = function () { return _this.SetColors("t-blue", ctx); };
        this._buttons[3].OnClick = function () { return _this.SetColors("t-yellow", ctx); };
        this._buttons[4].OnClick = function () { return _this.SetColors("t-orange", ctx); };
        return new VNode("div")
            .WithClass("t-padding-small")
            .WithChildren(this._buttons.map(function (b) { return b.Render(ctx); }));
    };
    return ColorButtonExample;
}());
var ConditionalContentExample = (function () {
    function ConditionalContentExample() {
        this._expanded = false;
    }
    ConditionalContentExample.prototype.HandleToggle = function (self, ctx) {
        return function () {
            self._expanded = !self._expanded;
            ctx.Render();
        };
    };
    ConditionalContentExample.prototype.Render = function (ctx) {
        var toggleButton = new ButtonWidget("toggle", new TextWidget(this._expanded ? "Collapse" : "Expand"));
        toggleButton.OnClick = this.HandleToggle(this, ctx);
        var box = new VNode("div")
            .WithClass("t-padding-small")
            .WithChildren([
            toggleButton.Render(ctx)
        ]);
        if (this._expanded) {
            var listContents = [];
            for (var i = 0; i < 5; i++) {
                listContents.push(i.toString());
            }
            var list = new ListWidget(listContents.map(function (l) { return (new FancyListItem(new FancyListItem(new TextWidget(l)))); }));
            box.ChildElements.push(list.Render(ctx));
        }
        return box;
    };
    return ConditionalContentExample;
}());
document.addEventListener("DOMContentLoaded", function (_event) {
    Example.Init();
});
var Example = (function () {
    function Example() {
    }
    Example.Init = function () {
        var exampleTempest = new Tempest("example", new ExamplePageWidget());
        exampleTempest.Render();
    };
    return Example;
}());
var ExamplePageWidget = (function () {
    function ExamplePageWidget() {
        var tabBarList = new TabWidget(new TextWidget("List Widget"), this.getListWidgetExample());
        var tabBarFancyList = new TabWidget(new TextWidget("Fancy ListWidget"), this.getFancyListWidgetExample());
        var tabBarState = new TabWidget(new TextWidget("Simple State"), this.getSimpleStateExample());
        var tabBarConditional = new TabWidget(new TextWidget("Conditional"), this.getConditionalExample());
        var tabBarColorButton = new TabWidget(new TextWidget("Color Button"), this.getColorButtonExample());
        var tabBarAlignment = new TabWidget(new TextWidget("Alignment"), this.getAlignmentExample());
        var tabBarTab = new TabWidget(new TextWidget("Tab"), this.getTabExample());
        this._tabBar = new TabBarWidget("menubar", [tabBarList, tabBarFancyList, tabBarState, tabBarConditional, tabBarColorButton, tabBarAlignment, tabBarTab]);
        this._tabBar.ColorClass = "t-deep-orange";
    }
    ExamplePageWidget.prototype.Render = function (ctx) {
        return new VNode("div")
            .WithChild(this._tabBar.Render(ctx));
    };
    ExamplePageWidget.prototype.getListWidgetExample = function () {
        var listContents = [];
        for (var i = 0; i < 5; i++) {
            listContents.push(i.toString());
        }
        var list = new ListWidget(listContents.map(function (l) { return (new TextWidget(l)); }));
        return new CardContainerWidget(list);
    };
    ExamplePageWidget.prototype.getFancyListWidgetExample = function () {
        var listContents = [];
        for (var i = 0; i < 5; i++) {
            listContents.push(i.toString());
        }
        var list = new ListWidget(listContents.map(function (l) { return (new FancyListItem(new FancyListItem(new TextWidget(l)))); }));
        return new CardContainerWidget(list);
    };
    ExamplePageWidget.prototype.getSimpleStateExample = function () {
        return new CardContainerWidget(new SimpleStateExample());
    };
    ExamplePageWidget.prototype.getConditionalExample = function () {
        return new CardContainerWidget(new ConditionalContentExample());
    };
    ExamplePageWidget.prototype.getColorButtonExample = function () {
        return new CardContainerWidget(new ColorButtonExample());
    };
    ExamplePageWidget.prototype.getAlignmentExample = function () {
        return new CardContainerWidget(new AligmentExample());
    };
    ExamplePageWidget.prototype.getTabExample = function () {
        return new CardContainerWidget(new TabExample());
    };
    return ExamplePageWidget;
}());
var FancyListItem = (function () {
    function FancyListItem(child) {
        this.child = child;
    }
    FancyListItem.prototype.Render = function (ctx) {
        return new VNode("p")
            .WithClasses([
            "t-container",
            "t-card",
            "t-red"
        ])
            .WithChildren([this.child.Render(ctx)]);
    };
    return FancyListItem;
}());
var NumberedBoxWidget = (function () {
    function NumberedBoxWidget(Value) {
        this.Value = Value;
    }
    NumberedBoxWidget.prototype.Render = function (_ctx) {
        return new VNode("div")
            .WithProp("style", "color: #000;background-color: #f1f1f1;margin: 10px;padding: 20px;font-size: 30px;")
            .WithValue("" + this.Value);
    };
    return NumberedBoxWidget;
}());
var SimpleStateExample = (function () {
    function SimpleStateExample() {
        this.textValue = "Nothing clicked yet.";
    }
    SimpleStateExample.prototype.SetText = function (text, ctx) {
        this.textValue = text;
        ctx.Render();
    };
    SimpleStateExample.prototype.Render = function (ctx) {
        var _this = this;
        var leftButton = new ButtonWidget("LeftButton", new TextWidget("Left"));
        var rightButton = new ButtonWidget("RightButton", new TextWidget("Right"));
        leftButton.OnClick = function () { return _this.SetText("Clicked left", ctx); };
        rightButton.OnClick = function () { return _this.SetText("Clicked right", ctx); };
        return new VNode("div")
            .WithClass("t-padding-small")
            .WithChildren([leftButton.Render(ctx),
            rightButton.Render(ctx),
            new TextWidget(this.textValue).Render(ctx)]);
    };
    return SimpleStateExample;
}());
var TabExample = (function () {
    function TabExample() {
        var tabBarLeft = new TabWidget(new TextWidget("Left"), new TextWidget("Left Content"));
        var tabBarRight = new TabWidget(new TextWidget("Right"), new TextWidget("Right Content"));
        this._tabBar = new TabBarWidget("examplebar", [tabBarLeft, tabBarRight]);
    }
    TabExample.prototype.Render = function (ctx) {
        return this._tabBar
            .Render(ctx)
            .WithClass("t-padding-small");
    };
    return TabExample;
}());
//# sourceMappingURL=tempest_example.js.map