class AligmentExample implements IWidget{

    private _rowButton: ButtonWidget;
    private _columnButton: ButtonWidget;

    private _mxStartButton: ButtonWidget;
    private _mxEndButton: ButtonWidget;
    private _mxCenterButton: ButtonWidget;
    private _mxSpaceAroundButton: ButtonWidget;
    private _mxSpaceBetweenButton: ButtonWidget;

    private _cxStartButton: ButtonWidget;
    private _cxEndButton: ButtonWidget;
    private _cxCenterButton: ButtonWidget;
    private _cxStretchButton: ButtonWidget;
    private _cxBaselineButton: ButtonWidget;

    private _displayInRow: boolean;
    private _mainAxisAlignment: MainAxisAlignment;
    private _crossAxisAlignment: CrossAxisAlignment;

    constructor()
    {
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
        this._cxStretchButton= new ButtonWidget("CxStretch", new TextWidget("Stretch"));
        this._cxBaselineButton= new ButtonWidget("CxBaseline", new TextWidget("Baseline"));

        this._displayInRow = true;
        this._mainAxisAlignment = MainAxisAlignment.SpaceBetween;
        this._crossAxisAlignment = CrossAxisAlignment.Center;
    }

    Render(ctx: RenderContext): VNode {

        this.wireUpAlignmentEvents(ctx);
        this.wireUpMainAxisEvents(ctx);
        this.wireUpCrossAxisEvents(ctx);

        var layoutButtonDiv = new VNode("div")
            .WithChildren([this._rowButton, this._columnButton].map(b => b.Render(ctx)));

        var mainAxisButtonDiv = new VNode("div")
            .WithChildren([this._mxStartButton, this._mxEndButton, this._mxCenterButton, this._mxSpaceAroundButton, this._mxSpaceBetweenButton].map(b => b.Render(ctx)));

        var crossAxisButtonDiv = new VNode("div")
            .WithChildren([this._cxStartButton, this._cxEndButton, this._cxCenterButton, this._cxStretchButton, this._cxBaselineButton].map(b => b.Render(ctx)));

        var numberedBoxes = [1,2,3,4,5].map(n => new NumberedBoxWidget(n));
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
    }


    private wireUpMainAxisEvents(ctx: RenderContext) {
        this._mxStartButton.OnClick = () => {
            this._mainAxisAlignment = MainAxisAlignment.Start;
            ctx.Render();
        };
        this._mxEndButton.OnClick = () => {
            this._mainAxisAlignment = MainAxisAlignment.End;
            ctx.Render();
        };
        this._mxCenterButton.OnClick = () => {
            this._mainAxisAlignment = MainAxisAlignment.Center;
            ctx.Render();
        };
        this._mxSpaceAroundButton.OnClick = () => {
            this._mainAxisAlignment = MainAxisAlignment.SpaceAround;
            ctx.Render();
        };
        this._mxSpaceBetweenButton.OnClick = () => {
            this._mainAxisAlignment = MainAxisAlignment.SpaceBetween;
            ctx.Render();
        };
    }

    private wireUpCrossAxisEvents(ctx: RenderContext) {
        this._cxStartButton.OnClick = () => {
            this._crossAxisAlignment = CrossAxisAlignment.Start;
            ctx.Render();
        };
        this._cxEndButton.OnClick = () => {
            this._crossAxisAlignment = CrossAxisAlignment.End;
            ctx.Render();
        };
        this._cxCenterButton.OnClick = () => {
            this._crossAxisAlignment = CrossAxisAlignment.Center;
            ctx.Render();
        };
        this._cxStretchButton.OnClick = () => {
            this._crossAxisAlignment = CrossAxisAlignment.Stretch;
            ctx.Render();
        };
        this._cxBaselineButton.OnClick = () => {
            this._crossAxisAlignment = CrossAxisAlignment.Baseline;
            ctx.Render();
        };
    }

    private wireUpAlignmentEvents(ctx: RenderContext) {
        this._rowButton.OnClick = () => {
            this._displayInRow = true;
            ctx.Render();
        };
        this._columnButton.OnClick = () => {
            this._displayInRow = false;
            ctx.Render();
        };
    }
}